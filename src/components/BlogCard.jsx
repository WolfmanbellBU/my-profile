import { blogPosts } from "@/data/blogPosts";

function BlogCard({ image, category, title, description, author, date }) {
  return (
    <div className="flex flex-col gap-4">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={image}
          alt={title}
        />
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {category}
          </span>
        </div>
        <a href="#" className="text-black no-underline">
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline !text-black">
            {title}
          </h2>
        </a>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&size=64`}
            alt={author}
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

function BlogCardList({ posts = blogPosts }) {
  return posts.map((post) => (
    <BlogCard
      key={post.id}
      image={post.image}
      category={post.category}
      title={post.title}
      description={post.description}
      author={post.author}
      date={post.date}
    />
  ));
}

export default BlogCard;
export { BlogCardList };
