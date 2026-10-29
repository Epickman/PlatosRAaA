'use client';

import { motion } from 'framer-motion';
import { Smartphone, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      {/* Overlay oscuro sobre el video */}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 1, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6"
        >
          <Smartphone size={14} />
          Menú con Realidad Aumentada
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4"
        >
          AR
          <span className="text-orange-500"> Menú</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl mb-8 max-w-xl mx-auto"
        >
          Explorá cada plato en 3D y visualizalo en tu mesa antes de pedirlo, con tecnología de Realidad Aumentada.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/menu"
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Ver el menú
          </Link>
          <a
            href="#como-funciona"
            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:border-orange-500/50 hover:text-white transition-all"
          >
            ¿Cómo funciona?
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-slate-600"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
