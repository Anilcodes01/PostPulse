import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number

}

export const BlogCard = ({id, authorName, title, content, publishedDate }: BlogCardProps) => {
  return <Link to={`/blog/${id}`}>
  <div className="border-b border-slate-200 p-4 pt-8 w-screen max-w-screen-md cursor-pointer">
      <div className="flex gap-2">
        <Avatar  name={authorName} />
        <div className="text-sm    ">
        {authorName} . {publishedDate}
        </div>
      </div>
      <div className="text-2xl pt-2 font-bold ">{title}</div>
      <div className="text-lg  pt-1" dangerouslySetInnerHTML={{ __html: content.slice(0, 100) + "..." }} />
      <div className="text-slice-500  h-8 w-20  flex-col  flex justify-center text-sm pt-4">{`${Math.ceil(
        content.length / 1000
      )} min read`}</div>
    </div>
  </Link>
};

export const Avatar = ({ name, size= "small" }: { name: string, size?: string })  =>{
  return (<div>
 <button  className={`relative inline-flex  items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"}  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className="font-lg  text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </button>
  </div>
   
  );
}
