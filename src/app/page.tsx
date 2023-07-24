"use client";

import { useAuthContext } from "@/context/AuthContext";
import * as Job from "@/firebase/firestore/getData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobModel } from "../firebase/firestore/jobs/model";
import AddJob from "@/components/AddJob";

export default function Home() {
  const { user, signout } = useAuthContext();
  const router = useRouter();
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const getAllJobs = async () => {
    const res = await Job.getAllData("jobs");
    const data = res?.map((doc) => {
      return { ...doc, id: doc.id } as JobModel;
    });

    if (data) setJobs(data);
  };

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    } else {
      getAllJobs();
    }
  }, [router, user]);

  return (
    <main>
      <div className="flex-row items-center bg-sky-500">
        <label className="text-xl font-bold text-center text-white">
          Welcome {user?.email}
        </label>
        <button
          className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            await signout();
            router.push("/signin");
          }}
        >
          Signout
        </button>
      </div>

      <AddJob
        onAddJobSuccess={(job) => {
          setJobs([...jobs, job]);
        }}
      />
      <div className="py-10 flex-col space-between">
        {jobs.map((job) => (
          <div key={job.id}>
            <label className="text-white">{job.title}</label>
            <article className="prose text-white">
              <label>{job.description}</label>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
