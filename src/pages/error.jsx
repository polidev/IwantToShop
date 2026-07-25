import { Link } from "react-router";

export default function Error() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-12 text-center md:px-8">
      <p className="font-display text-8xl font-bold tracking-tighter text-surface-3 md:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-ink-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover"
      >
        Back to Home
      </Link>
    </main>
  );
}
