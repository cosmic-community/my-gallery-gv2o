// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) notFound()

  const posts = await getPostsByCategory(category.id)
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4">
          Category
        </p>
        <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts in this category yet.</p>
      )}

      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/categories"
          className="text-brand-600 hover:text-brand-700 font-medium"
        >
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}