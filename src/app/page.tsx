"use client";

import { useAuthContext } from "@/context/AuthContext";
import * as Job from "@/firebase/firestore/jobs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobModel } from "../firebase/firestore/jobs/model";
import AddJob from "@/components/AddJob";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import JobInformationModal from "@/components/JobInformationModal";

export default function Home() {
  const { user, signout } = useAuthContext();
  const router = useRouter();
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);

  const getAllJobs = async () => {
    const res = await Job.getAll();
    const data = res?.map((doc) => {
      return { ...doc, id: doc.id } as JobModel;
    });

    if (data) setJobs(data);
  };

  const onDelJob = async (id: string) => {
    const res = await Job.deleteByID(id);
    if (res) {
      const newJobs = jobs.filter((job) => job.id !== id);
      setJobs(newJobs);
      setShowModal(false);
    }
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
      <JobInformationModal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        onClose={() => setShowModal(false)}
        onDelete={onDelJob}
        job={selectedJob}
      />
      <Header onLogout={signout} user={user} />
      <div className="pt-4">
        <AddJob
          onAddJobSuccess={(job) => {
            setJobs([...jobs, job]);
          }}
        />
        <div className="text-center text-white text-2xl py-6">
          We found <b className="text-[#bdc3c7]">{jobs.length}</b> jobs for you
          !
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-[94%] mx-auto pb-8">
          {jobs.map((job) => (
            <JobCard
              job={job}
              key={job.id}
              onClick={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </div>
      <footer className="flex flex-col items-center justify-center w-full h-24 bg-gray-700">
        <label className="text-white text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/luan-sautron/"
            className="text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luan
          </a>
        </label>

      </footer>
    </main>
  );
}
