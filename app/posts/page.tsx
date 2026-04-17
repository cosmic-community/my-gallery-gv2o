import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">All Posts</h1>
        <p className="text-lg text-gray-600">
          Discover all our stories, insights, and creative works.
        </p>
      </div>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts available yet.</p>
      )}
    </div>
  )
}