const ProjectCardSkeleton = () => {
  const skeletonTheme = "bg-gray-300 rounded animate-pulse";

  return (
    <div className="w-[95%] max-w-[950px]">
      <div className="shadow p-2 sm:p-4 border-[1px] border-gray-200 rounded-xl flex flex-col gap-3">
        <div className={`${skeletonTheme} h-8 sm:h-10 w-[90%] max-w-60`}>
          {/* project name */}
        </div>
        <div className="border-[0px] border-gray-200 rounded-xl flex flex-col gap-4">
          <div className="flex max-sm:flex-col sm:flex-row gap-1 sm:justify-between sm:items-center">
            <div className={`${skeletonTheme} h-7 sm:h-9 w-[65%] max-w-30`}>
              {/* deployment name */}
            </div>
            <div className={`${skeletonTheme} h-6 sm:h-8 w-[75%] max-w-52`}>
              {/* healthy deployment resources text */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="shadow border-[1px] border-gray-200 rounded-xl p-3 pt-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <div
                          className={`${skeletonTheme} h-6 w-40 max-w-[60%]`}
                        >
                          {/* resource name */}
                        </div>
                        <div
                          className={`${skeletonTheme} rounded-full h-6 w-6`}
                        >
                          {/* healthy icon */}
                        </div>
                      </div>
                      <div className={`${skeletonTheme} h-5 w-[80%] max-w-18`}>
                        {/* resource type */}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[1, 2].map((_, idx) => (
                        <div
                          key={idx}
                          className={`${skeletonTheme} rounded h-6 w-full flex justify-between gap-3`}
                        >
                          {/* resource attribute */}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${skeletonTheme} h-4 w-[80%] max-w-48`}>
                    {/* resource identifier */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
