"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Tag, Star, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product, SkillLevel } from "@/lib/data/mock-products";
import { calculateSavings, formatPrice } from "@/lib/data/mock-products";

// Skill level badge colors
const skillLevelStyles: Record<SkillLevel, { bg: string; text: string; label: string }> = {
  beginner: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Beginner",
  },
  intermediate: {
    bg: "bg-brand-blue/20",
    text: "text-brand-blue",
    label: "Intermediate",
  },
  advanced: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    label: "Advanced",
  },
  all: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    label: "All Levels",
  },
};

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function ProductCard({
  product,
  variant = "default",
  className
}: ProductCardProps) {
  const savings = calculateSavings(product);
  const skillStyle = product.skillLevel
    ? skillLevelStyles[product.skillLevel]
    : null;

  // Compact variant for sidebar placement
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card
            hover
            className={cn(
              "overflow-hidden transition-all duration-200",
              className
            )}
          >
            <CardContent className="p-3">
              <div className="flex gap-3">
                {/* Product Image Placeholder */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <div className="text-gray-400 text-2xl font-bold">
                    {product.name.charAt(0)}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-brand-black text-sm line-clamp-1 group-hover:text-brand-teal transition-colors">
                      {product.name}
                    </h4>
                    {product.isSignature && (
                      <Star className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-brand-black text-sm">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {skillStyle && (
                    <span className={cn(
                      "inline-block text-[10px] px-1.5 py-0.5 rounded mt-1.5",
                      skillStyle.bg,
                      skillStyle.text
                    )}>
                      {skillStyle.label}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      </motion.div>
    );
  }

  // Featured variant with larger display
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        <Card
          hover
          className="overflow-hidden border-2 border-brand-teal/30 bg-gradient-to-br from-white to-brand-teal/5"
        >
          <CardContent className="p-0">
            {/* Featured Banner */}
            <div className="bg-brand-teal px-4 py-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                {product.isSignature ? "Gentry's Pick" : "Featured"}
              </span>
              {savings && (
                <Badge className="ml-auto bg-white text-brand-teal text-xs">
                  {savings}% OFF
                </Badge>
              )}
            </div>

            <div className="p-5">
              {/* Product Image Placeholder */}
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4 overflow-hidden">
                <div className="text-gray-300 text-6xl font-bold">
                  {product.name.charAt(0)}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-brand-black text-lg line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-brand-black">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {skillStyle && (
                    <Badge
                      variant="secondary"
                      className={cn(skillStyle.bg, skillStyle.text)}
                    >
                      {skillStyle.label}
                    </Badge>
                  )}
                  {product.isSignature && (
                    <Badge variant="teal" className="gap-1">
                      <Star className="w-3 h-3" />
                      Signature
                    </Badge>
                  )}
                </div>

                {/* CTA */}
                <Button
                  variant="brand"
                  className="w-full gap-2"
                  asChild
                >
                  <a
                    href={product.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shop Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card hover className="overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Sale/Featured Badge */}
          {(product.isSale || product.isFeatured) && (
            <div className="absolute top-3 left-3 z-10 flex gap-1.5">
              {product.isSale && savings && (
                <Badge variant="sale" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {savings}% OFF
                </Badge>
              )}
              {product.isFeatured && !product.isSale && (
                <Badge variant="brand" className="text-xs gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </Badge>
              )}
            </div>
          )}

          {/* Product Image Placeholder */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
            <div className="text-gray-300 text-5xl font-bold">
              {product.name.charAt(0)}
            </div>
            {product.isSignature && (
              <div className="absolute top-3 right-3">
                <div className="bg-brand-blue text-white p-1.5 rounded-full">
                  <Star className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col flex-1">
            <div className="flex-1">
              <h3 className="font-semibold text-brand-black line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>

            {/* Price and Skill Level */}
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-brand-black">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {skillStyle && (
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    skillStyle.bg,
                    skillStyle.text
                  )}>
                    {skillStyle.label}
                  </span>
                )}
              </div>

              {/* Shop Button */}
              <Button
                variant="teal"
                size="sm"
                className="w-full gap-1.5"
                asChild
              >
                <a
                  href={product.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shop Now
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
