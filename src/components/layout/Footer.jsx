export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-ink-faint">
            &copy; {new Date().getFullYear()} I Want To Shop. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Built for practice. Not a real store.
          </p>
        </div>
      </div>
    </footer>
  );
}
