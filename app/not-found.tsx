import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="text-center py-16">
      <h1 className="font-semibold text-6xl mb-4 tracking-tighter font-serif">404</h1>
      
      <h2 className="font-semibold text-2xl mb-8 tracking-tighter font-serif">
        Lost in space
      </h2>
      
      <p className="mb-8 max-w-md mx-auto">
        This page drifted away into the void. Let's get you back to solid ground.
      </p>
      
      <Link 
        href="/en"
        className="inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to earth
      </Link>
    </section>
  );
}