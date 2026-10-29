import { notFound } from 'next/navigation';
import dishes from '@/data/dishes.json';
import type { Dish } from '@/types/dish';
import DishDetailClient from './DishDetailClient';

// Next.js 16: permite acceder a params sin Suspense
export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return (dishes as Dish[]).map(d => ({ id: d.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const dish = (dishes as Dish[]).find(d => d.id === id);
  if (!dish) return {};
  return {
    title: `${dish.name} | AR Menú`,
    description: dish.description,
  };
}

export default async function DishPage({ params }: PageProps) {
  const { id } = await params;
  const dish = (dishes as Dish[]).find(d => d.id === id);
  if (!dish) notFound();
  return <DishDetailClient dish={dish} allDishes={dishes as Dish[]} />;
}
