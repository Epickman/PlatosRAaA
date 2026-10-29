'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Flame, Box } from 'lucide-react';
import type { Dish } from '@/types/dish';

interface DishCardProps {
  dish: Dish;
  index: number;
}

export default function DishCard({ dish, index }: DishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link href={`/dish/${dish.id}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
          {/* Imagen placeholder con gradiente */}
          <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
            <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
              {getCategoryEmoji(dish.category)}
            </span>

            {dish.featured && (
              <span className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-md bg-orange-500 text-white text-xs font-semibold">
                Destacado
              </span>
            )}

            <span className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-md bg-slate-800/80 backdrop-blur border border-slate-700 text-orange-400 text-xs font-semibold flex items-center gap-1">
              <Box size={10} /> 3D · AR
            </span>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-white text-lg leading-tight mb-1 group-hover:text-orange-400 transition-colors">
              {dish.name}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">
              {dish.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {dish.prepTime}
              </span>
              <span className="flex items-center gap-1">
                <Flame size={12} /> {dish.calories} kcal
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                ${dish.price.toLocaleString('es-AR')}
              </span>
              <span className="text-xs text-orange-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver en 3D →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Hamburguesas: '🍔',
    Pizzas: '🍕',
    Ensaladas: '🥗',
    Acompañamientos: '🍟',
    Postres: '🍰',
    Bebidas: '🥤',
  };
  return map[category] ?? '🍽️';
}
