import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

function renderContent(content: string) {
  const html = content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-foreground mt-8 mb-3 font-serif">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-foreground mt-10 mb-4 font-serif">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-foreground mt-10 mb-4 font-serif">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-xl my-6" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-muted-foreground">• $1</li>')
    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
    .replace(/\n/g, '<br />');

  return `<p class="text-muted-foreground leading-relaxed mb-4">${html}</p>`;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main id="main-content" className="pt-28 pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted/40 rounded w-3/4" />
              <div className="h-4 bg-muted/40 rounded w-1/3" />
              <div className="h-64 bg-muted/40 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-4 bg-muted/40 rounded w-full" />
                <div className="h-4 bg-muted/40 rounded w-5/6" />
                <div className="h-4 bg-muted/40 rounded w-4/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main id="main-content" className="pt-28 pb-16">
          <div className="container mx-auto px-4 lg:px-8 text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
            <p className="text-muted-foreground mb-6">El artículo que buscas no existe o fue eliminado.</p>
            <Link href="/blog">
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <ArrowLeft className="h-4 w-4" /> Volver al blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} — Blog Zahal`}
        description={post.excerpt || post.title}
        path={`/blog/${post.slug}`}
        image={post.coverImage || undefined}
      />
      <Navigation />

      <main id="main-content">
        <article className="pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <Link href="/blog">
              <span className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 mb-6 cursor-pointer" data-testid="link-back-to-blog">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al blog
              </span>
            </Link>

            <header className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-blog-post-title">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              </div>
            </header>

            {post.coverImage && (
              <div className="mb-10 rounded-2xl overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
