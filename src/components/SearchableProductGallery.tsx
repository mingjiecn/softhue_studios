"use client";

import { useState, useMemo } from "react";
import { paintings, digitalPrints } from "@/lib/products";
import { PaintingCard } from "@/components/PaintingCard";
import { SearchBar, type CategoryFilter, type SortOption } from "@/components/SearchBar";
import type { Product } from "@/lib/products";

function filterProducts(
  products: Product[],
  query: string,
  category: CategoryFilter
): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    const matchesCategory =
      category === "all" ||
      (category === "painting" && p.category === "painting") ||
      (category === "digital" && p.category === "digital");
    const matchesName = !q || p.title.toLowerCase().includes(q);
    return matchesCategory && matchesName;
  });
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return copy;
  }
}

export function SearchableProductGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const allProducts = useMemo(
    () => [...paintings, ...digitalPrints],
    []
  );

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, searchQuery, category);
    return sortProducts(filtered, sort);
  }, [allProducts, searchQuery, category, sort]);

  const isFiltering = searchQuery.trim() !== "" || category !== "all";
  const sortedPaintings = useMemo(
    () => sortProducts(paintings, sort),
    [sort]
  );
  const sortedDigitalPrints = useMemo(
    () => sortProducts(digitalPrints, sort),
    [sort]
  );

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {isFiltering ? (
        <section className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-8 text-center">
            {filteredProducts.length === 0
              ? "No products match your search"
              : `Search Results (${filteredProducts.length})`}
          </h2>
          {filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <PaintingCard key={product.id} painting={product} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <section className="mb-20">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-8 text-center">
              Paintings Available for Purchase
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedPaintings.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
              ))}
            </div>
          </section>
          <section className="mb-20">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-8 text-center">
              Digital Art Prints
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedDigitalPrints.map((item) => (
                <PaintingCard key={item.id} painting={item} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
