export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: PageProps<"/sa-console-9x4k2/login">) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-emerald-600 text-white">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c0-6 0-9 5-13" />
              <path d="M17 4c-7 0-10 3-10 8a5 5 0 0 0 5 5c5 0 8-4 8-10 0-1.5-.3-3-3-3z" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-slate-900">Satyam Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your catalog</p>
        </div>

        <form action="/api/admin-login" method="post" className="space-y-4">
          {error && (
            <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
              Invalid username or password.
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Username</label>
            <input
              name="username"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
