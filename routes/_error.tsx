import { HttpError } from "fresh";
import type { PageProps } from "fresh";
import { ArrowLeft } from "lucide-preact";

export default function ErrorPage({ error }: PageProps) {
  const is404 = error instanceof HttpError && error.status === 404;

  if (is404) {
    return (
      <section class="text-center py-16">
        <h1 class="font-semibold text-6xl mb-4 tracking-tighter font-serif">
          404
        </h1>
        <h2 class="font-semibold text-2xl mb-8 tracking-tighter font-serif">
          Lost in space
        </h2>
        <p class="mb-8 max-w-md mx-auto">
          This page drifted away into the void. Let's get you back to solid
          ground.
        </p>
        <a
          href="/en"
          class="inline-flex items-center gap-2"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to earth
        </a>
      </section>
    );
  }

  return (
    <section class="text-center py-16">
      <h1 class="font-semibold text-6xl mb-4 tracking-tighter font-serif">
        {error instanceof HttpError ? error.status : "500"}
      </h1>
      <p class="mb-8">Something went wrong. Please try again.</p>
      <a href="/en" class="inline-flex items-center gap-2">
        <ArrowLeft class="w-4 h-4" />
        Go home
      </a>
    </section>
  );
}
