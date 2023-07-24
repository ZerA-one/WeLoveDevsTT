"use client";

import { useAuthContext } from "@/context/AuthContext";
import * as Job from "@/firebase/firestore/jobs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobModel } from "../firebase/firestore/jobs/model";
import AddJob from "@/components/AddJob";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Home() {
  const { user, signout } = useAuthContext();
  const router = useRouter();
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);

  const getAllJobs = async () => {
    const res = await Job.getAll();
    console.log("res", res);
    const data = res?.map((doc) => {
      return { ...doc, id: doc.id } as JobModel;
    });

    if (data) setJobs(data);
  };

  const onDelJob = async (id: string) => {
    const res = await Job.deleteByID(id);
    console.log("res", res);
    if (res) {

      const newJobs = jobs.filter((job) => job.id !== id);
      setJobs(newJobs);
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
      <Modal
        size="xl"
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
      >
        <ModalHeader className="items-center justify-center w-full">
          <div className="items-center justify-center">
            <label className="text-black text-center font-bold text-xl">
              {selectedJob?.title}
            </label>
            <label className="text-gray-500 text-sm ml-5">
              {selectedJob?.company}
            </label>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center justify-center">
            <label className="text-gray-400 text-md">
              {selectedJob?.start}
            </label>
            <div className="flex flex-wrap items-center justify-center mt-3">
              {selectedJob?.skills?.map((skill) => (
                <label
                  key={`${skill}.${selectedJob.id}`}
                  className="text-gray-400 text-sm mr-4 bg-gray-200 rounded-lg border-2 border-gray-300 px-1"
                >
                  {skill}
                </label>
              ))}
            </div>
            <label className="text-gray-600 text-sm mt-4">
              {selectedJob?.description}
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-[#bdc3c7]"
            onClick={(e) => {
              e.preventDefault();
              onDelJob(selectedJob?.id as string);
              setShowModal(false);
            }}
          >
            Delete
          </button>
          <button
            className="bg-[#2c3e50] text-white px-5 py-2 rounded-xl hover:bg-[#bdc3c7]"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-[94%] mx-auto">
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
    </main>
  );
}
