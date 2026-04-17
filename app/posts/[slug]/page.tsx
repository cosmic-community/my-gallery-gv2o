// app/posts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const content = getMetafieldValue(post.metadata?.content)
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-xs font-medium px-3 py-1 bg-brand-50 text-brand-700 rounded-full hover:bg-brand-100"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        {post.title}
      </h1>

      {excerpt && (
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">{excerpt}</p>
      )}

      {author && (
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-100">
          {author.metadata?.avatar ? (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={author.title}
              width="48"
              height="48"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {author.title.charAt(0)}
            </div>
          )}
          <div>
            <Link
              href={`/authors/${author.slug}`}
              className="font-semibold text-gray-900 hover:text-brand-600"
            >
              {author.title}
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      )}

      {featuredImage && (
        <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-12 bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width="800"
            height="450"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/posts"
          className="text-brand-600 hover:text-brand-700 font-medium"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}