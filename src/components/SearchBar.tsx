"use client";

type CategoryFilter = "all" | "painting" | "digital";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

export type { CategoryFilter };

export function SearchBar({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: SearchBarProps) {
  return (
    <div className="bg-white border-b border-stone-200/60 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-3">
          <div className="flex-1 relative min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden>
              🔍
            </span>
            <input
              type="search"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta"
              aria-label="Search products"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-wrap">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
              className="w-full sm:min-w-[140px] px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta bg-white text-charcoal touch-manipulation"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="painting">Paintings</option>
              <option value="digital">Digital Art</option>
            </select>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full sm:min-w-[140px] px-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta bg-white text-charcoal touch-manipulation"
              aria-label="Sort by"
              title="Sort results"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
