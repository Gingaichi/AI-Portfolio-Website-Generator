import PortfolioForm from '@/components/PortfolioForm'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-wide drop-shadow-lg">
        AI Portfolio Generator
      </h1>

      <div className="w-full max-w-3xl bg-gray-900 bg-opacity-70 rounded-3xl shadow-2xl p-10 border border-gray-700">
        <PortfolioForm />
      </div>

      <footer className="mt-16 text-gray-400 text-center text-sm select-none">
        © {new Date().getFullYear()} AIportfolio.
      </footer>
    </main>
  )
}
