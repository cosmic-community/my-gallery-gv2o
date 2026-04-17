import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function PostCard({ post }: { post: Post }) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <Link href={`/posts/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width="400"
              height="250"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full gradient-bg flex items-center justify-center">
              <span className="text-6xl opacity-40">🎨</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="text-xs font-medium px-3 py-1 bg-brand-50 text-brand-700 rounded-full hover:bg-brand-100 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {excerpt && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        )}
        {author && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            {author.metadata?.avatar ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.title}
                width="32"
                height="32"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                {author.title.charAt(0)}
              </div>
            )}
            <Link
              href={`/authors/${author.slug}`}
              className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
            >
              {author.title}
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}