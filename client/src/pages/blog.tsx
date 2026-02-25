import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog — Zahal | Cuidado Natural y Bienestar"
        description="Consejos de cuidado personal natural, novedades de Zahal, y todo sobre desodorantes naturales de alumbre."
        path="/blog"
      />
      <Navigation />

      <main id="main-content">
        <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-14 max-w-xl mx-auto">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestro Blog</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4" data-testid="text-blog-title">
                Bienestar Natural
              </h1>
              <p className="text-muted-foreground">
                Consejos, novedades y todo lo que necesitas saber sobre el cuidado personal natural.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-muted/40" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-muted/40 rounded w-1/3" />
                      <div className="h-6 bg-muted/40 rounded w-3/4" />
                      <div className="h-4 bg-muted/40 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary/40" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Próximamente</h2>
                <p className="text-sm text-muted-foreground">
                  Estamos preparando contenido increíble para ti. ¡Vuelve pronto!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {posts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="bg-card rounded-2xl overflow-hidden border border-border/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group" data-testid={`blog-card-${post.id}`}>
                      {post.coverImage ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-primary/5 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/20 font-serif">Z</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                        )}
                        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Leer más <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
