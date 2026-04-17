import Link from 'next/link'
import { getAllAuthors } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Our Authors</h1>
        <p className="text-lg text-gray-600">
          Meet the talented creators behind our stories.
        </p>
      </div>

      {authors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => {
            const bio = getMetafieldValue(author.metadata?.bio)
            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  {author.metadata?.avatar ? (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={author.title}
                      width="64"
                      height="64"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                      {author.title.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-brand-600 transition-colors">
                      {author.title}
                    </h3>
                  </div>
                </div>
                {bio && (
                  <p className="text-gray-600 line-clamp-3">{bio}</p>
                )}
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-600">No authors available yet.</p>
      )}
    </div>
  )
}