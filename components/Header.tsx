import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="text-xl font-bold gradient-text">My Gallery</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Home
            </Link>
            <Link href="/posts" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Posts
            </Link>
            <Link href="/authors" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Authors
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}