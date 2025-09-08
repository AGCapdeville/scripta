
export const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-foreground/60">© {new Date().getFullYear()} Scripta — a tiny word game.</p>
      </div>
    </footer>
  )
}
