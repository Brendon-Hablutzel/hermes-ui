import { Suspense } from "react";
import GithubIcon from "../svg/GithubIcon";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import Projects from "./Projects";

export default function Home() {
  return (
    <div>
      <div className="p-2 font-medium text-lg flex justify-between bg-white">
        <div className="select-none">hermes</div>
        <div>
          <a target="_blank" href="https://github.com/Brendon-Hablutzel/hermes">
            <GithubIcon size={30} />
          </a>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col gap-5 items-center min-h-screen">
            {[1, 2].map((n) => (
              <ProjectCardSkeleton key={n} />
            ))}
          </div>
        }
      >
        <Projects />
      </Suspense>
    </div>
  );
}
