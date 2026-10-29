'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Flame, ShoppingCart, AlertTriangle } from 'lucide-react';
import ARViewer from '@/components/ui/ARViewer';
import DishCard from '@/components/ui/DishCard';
import type { Dish } from '@/types/dish';

interface Props {
  dish: Dish;
  allDishes: Dish[];
}

export default function DishDetailClient({ dish, allDishes }: Props) {
  const related = allDishes.filter(d => d.category === dish.category && d.id !== dish.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver al menú
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* AR Viewer */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ARViewer modelUrl={dish.modelUrl} iosModelUrl={dish.iosModelUrl} dishName={dish.name} />
            <p className="text-slate-500 text-xs text-center mt-3">
              Rotá el modelo · En móvil: tocá "Ver en AR" para proyectarlo en tu mesa
            </p>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div>
              <span className="text-orange-400 text-sm font-medium">{dish.category}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1 mb-3">{dish.name}</h1>
              <p className="text-slate-300 leading-relaxed">{dish.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Clock size={12} /> Tiempo
                </div>
                <p className="text-white font-semibold">{dish.prepTime}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Flame size={12} /> Calorías
                </div>
                <p className="text-white font-semibold">{dish.calories} kcal</p>
              </div>
            </div>

            {/* Ingredientes */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wider">Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map(ing => (
                  <span
                    key={ing}
                    className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs capitalize"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Alérgenos */}
            {dish.allergens.length > 0 && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-400 text-xs font-medium mb-1">Contiene alérgenos</p>
                  <p className="text-amber-300/70 text-xs">{dish.allergens.join(', ')}</p>
                </div>
              </div>
            )}

            {/* Precio + CTA */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-slate-500 text-xs mb-1">Precio</p>
                <p className="text-4xl font-extrabold text-white">
                  ${dish.price.toLocaleString('es-AR')}
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
                <ShoppingCart size={16} />
                Agregar
              </button>
            </div>
          </motion.div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">Más de {dish.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((d, i) => (
                <DishCard key={d.id} dish={d} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
