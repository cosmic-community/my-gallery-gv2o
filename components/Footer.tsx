export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🎨</span>
            <span className="text-xl font-bold gradient-text">My Gallery</span>
          </div>
          <p className="text-sm text-gray-600">
            A creative portfolio blog celebrating art, stories, and creators.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} My Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}