import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@shared/schema";
import SEO from "@/components/seo";
import { BASE_URL } from "@/lib/config";

const categories = [
  { value: "all", label: "Todas las categor\u00edas" },
  { value: "unisex", label: "Unisex" },
  { value: "hombre", label: "Hombre" },
  { value: "sport", label: "Sport" },
  { value: "teens", label: "Teens" },
  { value: "travel", label: "Travel" },
  { value: "cuidado", label: "Cuidado Personal" },
  { value: "manos", label: "Limpieza de Manos" },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Productos", item: `${BASE_URL}/productos` },
  ],
};

export default function Products() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const categoriaParam = urlParams.get("categoria");

  const [selectedCategory, setSelectedCategory] = useState(categoriaParam || "all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoriaParam && categories.some(c => c.value === categoriaParam)) {
      setSelectedCategory(categoriaParam);
    } else if (!categoriaParam) {
      setSelectedCategory("all");
    }
  }, [categoriaParam]);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory || (product.additionalCategories && product.additionalCategories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Tienda de Productos Naturales"
        description="Cat\u00e1logo completo de desodorantes naturales de piedra de alumbre Zahal: sprays, roll-ons, sticks y kits de viaje. Env\u00edo a todo M\u00e9xico."
        path="/productos"
        jsonLd={breadcrumbJsonLd}
      />
      <Navigation />
      
      <main id="main-content" className="pt-20">
        <section className="py-14 lg:py-16 bg-card linen-texture">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Cat\u00e1logo</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 font-serif">
                Nuestros Productos
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
                Descubre nuestra l\u00ednea completa de cuidado natural con piedra de alumbre
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white h-11"
                  data-testid="input-search"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[220px] bg-white h-11" data-testid="select-category">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por categor\u00eda" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-border/40 overflow-hidden">
                    <Skeleton className="w-full h-64" />
                    <div className="p-5">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-destructive text-lg">Error al cargar los productos</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-4"
                  data-testid="button-reload"
                >
                  Intentar de nuevo
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No se encontraron productos</p>
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    variant="outline"
                    className="mt-4"
                    data-testid="button-clear-filters"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
