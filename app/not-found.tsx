import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <section className="text-center py-10 md:py-16">
        <h1 className="font-semibold text-6xl mb-4 tracking-tighter font-serif">
          404
        </h1>
        <h2 className="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
          Lost in space
        </h2>
        <p className="mb-6 md:mb-8 max-w-md mx-auto">
          This page drifted away into the void. Let&apos;s get you back to solid
          ground.
        </p>
        <Link
          href="/en"
          className="underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Back home
        </Link>
      </section>
    </div>
  );
}
