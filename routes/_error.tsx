import { HttpError } from "fresh";
import type { PageProps } from "fresh";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-4 h-4"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

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
          <ArrowIcon />
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
        <ArrowIcon />
        Go home
      </a>
    </section>
  );
}
