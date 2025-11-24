"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, Sparkles, Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/data/mock-products";
import {
  getRecommendedProducts,
  getRecommendedYoyoForTrick,
  getBeginnerProducts,
  getEssentialAccessories,
} from "@/lib/data/mock-products";

type UserSkillLevel = 'never' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface ProductRecommendationProps {
  // Context for recommendations
  context: 'dashboard' | 'trick' | 'path-completion' | 'onboarding';
  // User's skill level for personalization
  userSkillLevel?: UserSkillLevel;
  // Trick difficulty (for trick context)
  trickDifficulty?: 1 | 2 | 3 | 4 | 5;
  // Trick name (for trick context)
  trickName?: string;
  // Custom title override
  title?: string;
  // Maximum products to show
  maxProducts?: number;
  // Layout variant
  variant?: 'horizontal' | 'vertical' | 'sidebar';
  // Custom className
  className?: string;
}

export function ProductRecommendation({
  context,
  userSkillLevel = 'beginner',
  trickDifficulty,
  trickName,
  title,
  maxProducts = 3,
  variant = 'horizontal',
  className,
}: ProductRecommendationProps) {
  // Get appropriate products based on context
  const products = React.useMemo((): Product[] => {
    switch (context) {
      case 'dashboard':
        return getRecommendedProducts(userSkillLevel).slice(0, maxProducts);

      case 'trick':
        // Get recommended yo-yo for this trick difficulty
        if (trickDifficulty) {
          const recommendedYoyo = getRecommendedYoyoForTrick(trickDifficulty);
          const accessories = getEssentialAccessories().slice(0, 2);
          return recommendedYoyo
            ? [recommendedYoyo, ...accessories].slice(0, maxProducts)
            : accessories.slice(0, maxProducts);
        }
        return getRecommendedProducts(userSkillLevel).slice(0, maxProducts);

      case 'path-completion':
        // Show upgrade gear for path completion celebration
        return getRecommendedProducts(
          userSkillLevel === 'beginner' ? 'intermediate' : 'advanced'
        ).slice(0, maxProducts);

      case 'onboarding':
        // Show starter products for onboarding
        return getBeginnerProducts().slice(0, maxProducts);

      default:
        return getRecommendedProducts(userSkillLevel).slice(0, maxProducts);
    }
  }, [context, userSkillLevel, trickDifficulty, maxProducts]);

  // Get appropriate title based on context
  const sectionTitle = React.useMemo(() => {
    if (title) return title;

    switch (context) {
      case 'dashboard':
        return 'Recommended Gear';
      case 'trick':
        return trickName
          ? `Best Gear for ${trickName}`
          : 'Recommended Yo-Yo';
      case 'path-completion':
        return 'Level Up Your Gear';
      case 'onboarding':
        return 'Get Started with Quality Gear';
      default:
        return 'Recommended Products';
    }
  }, [context, title, trickName]);

  // Get appropriate icon based on context
  const SectionIcon = React.useMemo(() => {
    switch (context) {
      case 'dashboard':
        return ShoppingBag;
      case 'trick':
        return Target;
      case 'path-completion':
        return Trophy;
      case 'onboarding':
        return Sparkles;
      default:
        return ShoppingBag;
    }
  }, [context]);

  if (products.length === 0) {
    return null;
  }

  // Sidebar variant (compact, vertical list)
  if (variant === 'sidebar') {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SectionIcon className="w-5 h-5 text-fun-blue" />
            {sectionTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="compact"
            />
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-fun-blue"
            asChild
          >
            <a
              href="https://gentrystein.com/collections/shop-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Gear
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Vertical variant (stacked cards)
  if (variant === 'vertical') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-brand-black flex items-center gap-2">
            <SectionIcon className="w-5 h-5 text-fun-blue" />
            {sectionTitle}
          </h2>
          <a
            href="https://gentrystein.com/collections/shop-all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fun-blue hover:underline flex items-center gap-1"
          >
            Shop All <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
  }

  // Default horizontal variant (grid)
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brand-black flex items-center gap-2">
          <SectionIcon className="w-5 h-5 text-fun-blue" />
          {sectionTitle}
        </h2>
        <a
          href="https://gentrystein.com/collections/shop-all"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-fun-blue hover:underline flex items-center gap-1"
        >
          Shop All <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default ProductRecommendation;
