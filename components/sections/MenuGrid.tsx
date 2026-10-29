'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DishCard from '@/components/ui/DishCard';
import type { Dish } from '@/types/dish';

const CATEGORIES = ['Todos', 'Hamburguesas', 'Pizzas', 'Ensaladas', 'Acompañamientos', 'Postres', 'Bebidas'];

interface MenuGridProps {
  dishes: Dish[];
}

export default function MenuGrid({ dishes }: MenuGridProps) {
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos' ? dishes : dishes.filter(d => d.category === active);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all border
              ${active === cat
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-orange-500/50 hover:text-white'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {filtered.map((dish, i) => (
          <DishCard key={dish.id} dish={dish} index={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-16">No hay platos en esta categoría.</p>
      )}
    </section>
  );
}
