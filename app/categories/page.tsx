import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Categories</h1>
        <p className="text-lg text-gray-600">
          Browse content organized by topics that matter to you.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const description = getMetafieldValue(cat.metadata?.description)
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-300 hover:shadow-lg transition-all group"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-600 transition-colors">
                  {cat.title}
                </h3>
                {description && (
                  <p className="text-gray-600">{description}</p>
                )}
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-600">No categories available yet.</p>
      )}
    </div>
  )
}