import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/Blogcard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks/hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div className="flex flex-col justify-center">
      <div>
        <Appbar />
        </div>
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      
    </div>;
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center max-w-xl">
          {blogs.map((blog) => (
            <BlogCard 
            id={blog.id}
              authorName={blog.author.name}
              title={
                blog.title
              }
              content={blog.content}
              publishedDate={"27 July, 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
