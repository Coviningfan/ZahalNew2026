import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import type { Product } from "@shared/schema";

const categories = [
  { value: "all", label: "Todas las categorías" },
  { value: "unisex", label: "Unisex" },
  { value: "hombre", label: "Hombre" },
  { value: "sport", label: "Sport" },
  { value: "teens", label: "Teens" },
  { value: "travel", label: "Travel" },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Catálogo de Productos
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Descubre nuestra completa línea de productos naturales para el cuidado personal
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[250px]" data-testid="select-category">
                  <Filter className="h-4 w-4 mr-2" />
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

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl p-6">
                    <Skeleton className="w-full h-48 mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-8 w-1/2" />
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
