import { Appbar } from "./Appbar";

export const Skeleton = () => {
  return (
    <div>
      <Appbar />

      <div className=" flex justify-center">
        <div role="status" className=" animate-pulse">
          <div className="grid grid-cols-12 px-10  w-full max-w-screen-xl pt-12">
            <div className="col-span-8 ">
              <div className="text-5xl font-extrabold">
                {/* title */}
                <div className="h-16 w-80 bg-gray-200 rounded  mb-4"></div>
              </div>
              <div className="text-slate-500 pt-2">
                {/* data of posting */}
                <div className="h-4 bg-gray-200 rounded  w-48 mb-4"></div>
              </div>
              <div className=" max-w-screen-xl flex flex-col gap-2 pr-8 pt-4">
                {/* content */}
                <div className="h-4 bg-gray-200 rounded  mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded  mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded  mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded  mb-2.5"></div>

                <div className="h-4 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
              </div>
            </div>
            <div className=" col-span-4 grid-cols-4  ">
              <div className="text-slate-500 text-lg">
                {/* hardcoded author */}
                <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
              </div>
              <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                  {/* blog author avatar */}
                  <div className="h-8 w-8 bg-gray-200 rounded-full   mb-4"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {/* blog author real name */}
                    <div className="h-4 bg-gray-200 rounded  w-48 mb-4"></div>
                  </div>
                  <div className="pt-2 text-slate-500">
                    {/* about author */}
                    <div className="h-4 bg-gray-200 rounded  w-80 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded  w-48 mb-2.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};


