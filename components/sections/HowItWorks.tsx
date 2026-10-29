'use client';

import { motion } from 'framer-motion';
import { Search, Box, Smartphone } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Elegí tu plato',
    description: 'Explorá el menú y encontrá lo que más te gusta. Filtrá por categorías.',
  },
  {
    icon: Box,
    step: '02',
    title: 'Mirá en 3D',
    description: 'Rotá el modelo 3D del plato desde cualquier ángulo para ver cada detalle.',
  },
  {
    icon: Smartphone,
    step: '03',
    title: 'Proyectá en AR',
    description: 'En tu celular, tocá "Ver en AR" y el plato aparece sobre tu mesa real.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 1, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">¿Cómo funciona?</h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Tres pasos para ver tu próximo plato antes de pedirlo.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, step, title, description }, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 1, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50 text-center"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
              {step}
            </div>
            <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 mt-2">
              <Icon size={24} className="text-orange-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
