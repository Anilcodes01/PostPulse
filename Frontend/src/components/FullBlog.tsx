import { Appbar } from "./Appbar";
import { Blog } from "../Hooks/hooks";
import { Avatar } from "./Blogcard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />

      <div className=" flex justify-center">
        <div className="grid grid-cols-12 px-10  w-full max-w-screen-xl pt-12">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">Posted on 23 July, 2024</div>
            <div
              className="max-w-screen-xl pr-8 mb-6 pt-4"
              dangerouslySetInnerHTML={{ __html: blog.content }} // Safely render HTML content
            />
          </div>
          <div className=" col-span-4 grid-cols-4  ">
           <div className="text-slate-500 text-lg">Author</div>
           <div className="flex w-full">
            <div className="pr-4 flex flex-col justify-center">
            <Avatar size="big" name={blog.author.name}/>
            </div>
            <div>
            <div className="text-2xl font-bold">
           {blog.author.name}
           </div>
            <div className="pt-2 text-slate-500">Random catch phrase to grab the users attention toward's author.</div>
            </div>
           </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
