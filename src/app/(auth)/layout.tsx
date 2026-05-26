export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        {children}
      </div>
    </main>
  );
}
