// app/authors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) notFound()

  const posts = await getPostsByAuthor(author.id)
  const bio = getMetafieldValue(author.metadata?.bio)
  const email = getMetafieldValue(author.metadata?.email)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-6 mb-6">
          {author.metadata?.avatar ? (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={author.title}
              width="120"
              height="120"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
              {author.title.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {author.title}
            </h1>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-brand-600 hover:text-brand-700"
              >
                {email}
              </a>
            )}
          </div>
        </div>
        {bio && (
          <p className="text-lg text-gray-600 leading-relaxed">{bio}</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">Posts by {author.title}</h2>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No posts by this author yet.</p>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/authors"
          className="text-brand-600 hover:text-brand-700 font-medium"
        >
          ← Back to all authors
        </Link>
      </div>
    </div>
  )
}