import { Link } from "react-router-dom";
import { Avatar } from "./Blogcard";

export const Appbar = () => {

 
  return (
    <div className="h-16 w-full border-b items-center flex px-10 justify-between ">
      <div>
        <Link className="flex flex-col justify-center " to={"/blogs"}>
          <div className=" text-3xl font-bold flex cursor-pointer ">PostPulse</div>
        </Link>
      </div>

      <div className="flex justify-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white mr-4 bg-black font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Publish
          </button>
        </Link>
        

        <Avatar size={"big"} name={"A"} />
      </div>
    </div>
  );
};
