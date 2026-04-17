import Link from 'next/link'
import { getAllPosts, getAllCategories, getAllAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function HomePage() {
  const [posts, categories, authors] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllAuthors(),
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4">
              Welcome to My Gallery
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stories worth <span className="gradient-text">sharing</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              A curated collection of creative writing, art, and ideas from
              passionate creators around the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/posts"
                className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Explore Posts
              </Link>
              <Link
                href="/authors"
                className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Meet Authors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Story</h2>
            <Link
              href="/posts"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all →
            </Link>
          </div>
          <Link href={`/posts/${featuredPost.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                {featuredPost.metadata?.featured_image ? (
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    width="600"
                    height="450"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full gradient-bg flex items-center justify-center">
                    <span className="text-8xl opacity-40">✨</span>
                  </div>
                )}
              </div>
              <div>
                {featuredPost.metadata?.categories && featuredPost.metadata.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.metadata.categories.slice(0, 3).map((cat) => (
                      <span
                        key={cat.id}
                        className="text-xs font-medium px-3 py-1 bg-brand-50 text-brand-700 rounded-full"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-4xl font-bold mb-4 group-hover:text-brand-600 transition-colors">
                  {featuredPost.title}
                </h3>
                {featuredPost.metadata?.excerpt && (
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.metadata.excerpt}
                  </p>
                )}
                {featuredPost.metadata?.author && (
                  <div className="flex items-center gap-3">
                    {featuredPost.metadata.author.metadata?.avatar ? (
                      <img
                        src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                        alt={featuredPost.metadata.author.title}
                        width="40"
                        height="40"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {featuredPost.metadata.author.title.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {featuredPost.metadata.author.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="bg-white p-6 rounded-xl border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all text-center group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {cat.title}
                  </h3>
                  {cat.metadata?.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {cat.metadata.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Authors */}
      {authors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8">Meet Our Authors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group text-center"
              >
                {author.metadata?.avatar ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={author.title}
                    width="150"
                    height="150"
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold mb-4 group-hover:scale-105 transition-transform">
                    {author.title.charAt(0)}
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {author.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}