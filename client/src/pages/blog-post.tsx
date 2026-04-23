import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import MarkdownContent from "@/components/markdown-content";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

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
        title={post.seoTitle || `${post.title} — Blog Zahal`}
        description={post.seoDescription || post.excerpt || post.title}
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
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="h-3.5 w-3.5" />
                    {post.tags.map((t) => (
                      <span key={t} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium" data-testid={`tag-${t}`}>{t}</span>
                    ))}
                  </span>
                )}
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

            <MarkdownContent content={post.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
