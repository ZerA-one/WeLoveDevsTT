import { JobModel } from "@/firebase/firestore/jobs/model";
import Image from "next/image";

interface JobProps {
  job: JobModel;
  onClick: () => void;
}

const companyLogo: Record<string, string> = {
  Google: "/company/google.webp",
  Facebook: "/company/facebook.png.webp",
  Amazon: "/company/amazon.png",
  Apple: "/company/apple.png",
  Microsoft: "/company/microsoft.webp",
  Netflix: "/company/netflix.png",
  Tesla: "/company/tesla.webp",
  SpaceX: "/company/spacex.jpg",
  Twitter: "/company/twitter.png",
  Uber: "/company/uber.svg",
  Airbnb: "/company/airbnb.png",
  Lyft: "/company/lyft.png",
};

const JobCard = ({ job, onClick }: JobProps) => {
  const logo = companyLogo[job.company] || "/logo.png";

  return (
    <button onClick={() => { onClick(); }} className="h-[120px] flex items-center bg-white border border-gray-200 rounded-md shadow flex-row max-w-xl hover:bg-gray-10000 shadow-xl">
      <div className="flex flex-col items-center justify-center w-2/6">
        <Image src={logo} alt="company logo" width={100} height={100} />
      </div>
      <div className="flex flex-col items-start justify-start w-full w-4/6">
        <label className="text-black text-left font-bold text-md">
          {job.title}
        </label>
        <label className="text-gray-500 text-sm mt-1">{job.company}</label>
        <label className="text-gray-400 text-sm mt-1">{job.start}</label>
        <div className="flex flex-wrap items-center justify-center mt-2">
          {job?.skills?.map((skill) => (
            <label key={`${skill}-${job.id}`} className="text-gray-400 text-sm mr-4 bg-gray-200 rounded-lg border-2 border-gray-300 px-1">
              {skill}
            </label>
          ))}
        </div>
      </div>
    </button>
  );
};

export default JobCard;
