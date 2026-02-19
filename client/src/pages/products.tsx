import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch, useLocation } from "wouter";
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
  { value: "all", label: "Todas las categorías" },
  { value: "unisex", label: "Unisex" },
  { value: "hombre", label: "Hombre" },
  { value: "sport", label: "Sport" },
  { value: "teens", label: "Teens" },
  { value: "travel", label: "Travel" },
  { value: "soap", label: "Jabón" },
  { value: "cuidado", label: "Cuidado Personal" },
  { value: "manos", label: "Limpieza de Manos" },
];

export default function Products() {
  const searchString = useSearch();
  const [, navigate] = useLocation();
  const urlParams = new URLSearchParams(searchString);
  const categoriaParam = urlParams.get("categoria");
  const buscarParam = urlParams.get("buscar");

  const selectedCategory =
    categoriaParam && categories.some(c => c.value === categoriaParam)
      ? categoriaParam
      : "all";

  const [searchQuery, setSearchQuery] = useState(buscarParam || "");

  useEffect(() => {
    setSearchQuery(buscarParam || "");
  }, [buscarParam]);

  const updateUrl = (newCategory: string, newSearch: string) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== "all") params.set("categoria", newCategory);
    if (newSearch) params.set("buscar", newSearch);
    const qs = params.toString();
    navigate(qs ? `/productos?${qs}` : "/productos", { replace: true });
  };

  const handleCategoryChange = (value: string) => {
    updateUrl(value, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateUrl(selectedCategory, value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    navigate("/productos", { replace: true });
  };

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory ||
      (product.additionalCategories && product.additionalCategories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  }) || [];

  // Build page schemas: BreadcrumbList always + ItemList once products load
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${BASE_URL}/productos` },
    ],
  };

  const pageSchemas = [
    breadcrumbSchema,
    ...(products && products.length > 0
      ? [{
          "@type": "ItemList",
          name: "Productos Zahal - Desodorantes Naturales de Alumbre",
          description: "Catálogo completo de desodorantes naturales de piedra de alumbre para toda la familia.",
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: `${BASE_URL}/productos/${product.id}`,
          })),
        }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Tienda de Productos Naturales"
        description="Catálogo completo de desodorantes naturales de piedra de alumbre Zahal: sprays, roll-ons, sticks y kits de viaje. Envío a todo México."
        path="/productos"
        jsonLd={pageSchemas}
      />
      <Navigation />

      <main id="main-content" className="pt-20">
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-center gap-3 text-center">
            <span className="text-amber-600 text-lg flex-shrink-0">⚠️</span>
            <p className="text-amber-800 text-sm font-medium">
              Estamos en modo de prueba. Las compras estarán disponibles el 20 de febrero a las 10:00 AM (hora CDMX). ¡Falta poco!
            </p>
          </div>
        </div>
        <section className="py-14 lg:py-16 bg-card linen-texture">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Catálogo</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 font-serif">
                Nuestros Productos
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
                Descubre nuestra línea completa de cuidado natural con piedra de alumbre
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-white h-11"
                  data-testid="input-search"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[220px] bg-white h-11" data-testid="select-category">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por categoría" />
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
                    onClick={handleClearFilters}
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
