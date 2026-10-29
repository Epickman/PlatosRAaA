import dishes from '@/data/dishes.json';
import type { Dish } from '@/types/dish';
import MenuGrid from '@/components/sections/MenuGrid';

export const metadata = {
  title: 'Menú | AR Menú',
};

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <div className="py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">Nuestro Menú</h1>
        <p className="text-slate-400">Tocá cualquier plato para verlo en 3D o proyectarlo en AR.</p>
      </div>
      <MenuGrid dishes={dishes as Dish[]} />
    </div>
  );
}
