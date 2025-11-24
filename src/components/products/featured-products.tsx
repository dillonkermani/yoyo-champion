"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/data/mock-products";
import {
  getFeaturedProducts,
  getSignatureProducts,
  getSaleProducts,
} from "@/lib/data/mock-products";
import { cn } from "@/lib/utils";

type FeaturedType = 'featured' | 'signature' | 'sale' | 'custom';

interface FeaturedProductsProps {
  // Type of featured products to show
  type?: FeaturedType;
  // Custom products array (when type is 'custom')
  products?: Product[];
  // Custom title
  title?: string;
  // Show carousel navigation
  showNavigation?: boolean;
  // Max items to show at once
  visibleItems?: number;
  // Custom className
  className?: string;
}

export function FeaturedProducts({
  type = 'featured',
  products: customProducts,
  title,
  showNavigation = true,
  visibleItems = 3,
  className,
}: FeaturedProductsProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Get products based on type
  const products = React.useMemo((): Product[] => {
    if (customProducts && customProducts.length > 0) {
      return customProducts;
    }

    switch (type) {
      case 'signature':
        return getSignatureProducts();
      case 'sale':
        return getSaleProducts();
      case 'featured':
      default:
        return getFeaturedProducts();
    }
  }, [type, customProducts]);

  // Get title based on type
  const sectionTitle = React.useMemo(() => {
    if (title) return title;

    switch (type) {
      case 'signature':
        return "Gentry's Signature Collection";
      case 'sale':
        return 'Holiday Sale';
      case 'featured':
      default:
        return 'Featured Gear';
    }
  }, [type, title]);

  // Get icon based on type
  const SectionIcon = React.useMemo(() => {
    switch (type) {
      case 'signature':
        return Star;
      case 'sale':
        return Sparkles;
      default:
        return Sparkles;
    }
  }, [type]);

  // Navigation handlers
  const canGoNext = currentIndex + visibleItems < products.length;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (products.length === 0) {
    return null;
  }

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + visibleItems
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            type === 'signature'
              ? "bg-brand-blue/20"
              : type === 'sale'
                ? "bg-red-100"
                : "bg-fun-blue/20"
          )}>
            <SectionIcon className={cn(
              "w-5 h-5",
              type === 'signature'
                ? "text-brand-blue"
                : type === 'sale'
                  ? "text-red-500"
                  : "text-fun-blue"
            )} />
          </div>
          <h2 className="text-xl font-bold text-brand-black">
            {sectionTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Arrows */}
          {showNavigation && products.length > visibleItems && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={!canGoNext}
                className="h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Shop All Link */}
          <a
            href="https://gentrystein.com/collections/shop-all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fun-blue hover:underline flex items-center gap-1 ml-2"
          >
            Shop All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative overflow-hidden">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={false}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                variant={index === 0 ? "featured" : "default"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots (for mobile) */}
      {products.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {Array.from({ length: Math.ceil(products.length / visibleItems) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleItems)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  Math.floor(currentIndex / visibleItems) === index
                    ? "bg-xp"
                    : "bg-gray-300"
                )}
              />
            )
          )}
        </div>
      )}

      {/* Promotional Banner */}
      {type === 'sale' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-fun-blue to-brand-blue text-white text-center"
        >
          <p className="font-medium">
            Free US Domestic Shipping on Orders Over $70!
          </p>
          <a
            href="https://gentrystein.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm underline mt-1 opacity-90 hover:opacity-100"
          >
            Shop the Holiday Sale <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </motion.section>
  );
}

export default FeaturedProducts;
