export default function ThreeDVisual() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm sm:px-8 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            3D Visual
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Clean and modern 3D visuals for your brand
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            This section presents a simple 3D-inspired visual layout with a balanced and professional feel.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-16 rounded-xl bg-slate-900" />
            <p className="mt-3 text-sm font-medium text-slate-700">Shape</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-16 rounded-xl bg-sky-500" />
            <p className="mt-3 text-sm font-medium text-slate-700">Depth</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-16 rounded-xl bg-violet-500" />
            <p className="mt-3 text-sm font-medium text-slate-700">Motion</p>
          </div>
        </div>
      </div>
    </section>
  )
}
