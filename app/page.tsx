import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import dishes from '@/data/dishes.json';
import DishCard from '@/components/ui/DishCard';
import type { Dish } from '@/types/dish';
import Link from 'next/link';

export default function HomePage() {
  const featured = (dishes as Dish[]).filter(d => d.featured);

  return (
    <>
      <HeroSection />
      <HowItWorks />

      {/* Destacados */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Destacados</h2>
          <Link href="/menu" className="text-orange-400 text-sm hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((dish, i) => (
            <DishCard key={dish.id} dish={dish as Dish} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>AR Menú · Tecnología de Realidad Aumentada para restaurantes</p>
      </footer>
    </>
  );
}
