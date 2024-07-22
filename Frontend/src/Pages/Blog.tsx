import { useParams } from "react-router-dom";
import { useBlog } from "../Hooks/hooks";
import { FullBlog } from "../components/FullBlog";
import { Skeleton } from "../components/skeleton";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
if(loading) {
    return <div>
        <Skeleton />
    </div>
}

if(!blog) {
  return <div>
    Error: Blog not found
  </div>
}
  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  );
};
