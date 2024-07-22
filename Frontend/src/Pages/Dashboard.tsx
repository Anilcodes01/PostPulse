import { Link } from "react-router-dom";


export const DashBoard = () => {
  return (
    <div>
      <DashBoardAppbar />
      <div className="h-screen bg-sky-400">
        <div className="text-8xl font-bold pt-10 pl-16 ">
          Read, Write and Learn, 
          <p>Human stories and Ideas</p>
        </div>
        <div className="pl-16 text-3xl pt-4 font-semibold ">
          A place to read, write and deepen your understanding
        </div>
        
        <div className="text-8xl font-bold text-white pl-16 pt-32">
          PostPulse.com
        </div>
        <div  className="pt-8 pl-16">
        <Link to={`/signup`}>
          <button className="border rounded-full w-44 h-14 bg-black text-xl text-white border-none">Start Reading</button>
        </Link>
        </div>
      </div>
      
    </div>
  );
};


function DashBoardAppbar() {
    return <div>
        <div className="h-16 w-full border-b items-center flex px-10 justify-between ">
      <div>
        <Link className="flex flex-col justify-center " to={"/"}>
          <div className=" text-3xl font-bold flex cursor-pointer ">PostPulse</div>
        </Link>
      </div>

      <div className="flex justify-center">
        <Link to={"/signin"}>
          <button
            type="button"
            className="text-white mr-4 bg-black  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            sign in
          </button>
        </Link>
        <Link to={"/signup"}>
          <button
            type="button"
            className="text-white mr-4 bg-black  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Get Started
          </button>
        </Link>

        
      </div>
    </div>
    </div>
}