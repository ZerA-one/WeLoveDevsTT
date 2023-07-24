import React from "react";
import { JobModel } from "@/firebase/firestore/jobs/model";
import * as Job from "@/firebase/firestore/jobs";

interface FormJob {
  title: string;
  description: string;
}

interface AddJobProps {
  onAddJobSuccess: (job: JobModel) => void;
}

const AddJob = ({ onAddJobSuccess }: AddJobProps) => {
  const [formData, setFormData] = React.useState<FormJob>({
    title: "",
    description: "",
  });

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, title: e.currentTarget.value });
  };

  const handleDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, description: e.currentTarget.value });
  };

  const onAddJob = (event: React.FormEvent<HTMLFormElement>) => {
    if (!formData?.title || !formData?.description) return;

    Job.create({
      ...formData,
      start: "00/00/00",
      skills: [],
    }).then((res) => {
      const job = res.result as unknown as JobModel;
      onAddJobSuccess(job);
    });
    event.preventDefault();
  };

  return (
    <form
      className="Form"
      onSubmit={async (e) => {
        onAddJob(e);
      }}
    >
      <div>
        <div className="Form--field">
          <label className="text-white" htmlFor="name">
            Title
          </label>
          <input onChange={handleTitleChange} type="text" id="title" />
        </div>
        <div className="Form--field">
          <label className="text-white" htmlFor="body">
            Description
          </label>
          <input
            onChange={handleDescriptionChange}
            type="text"
            id="description"
          />
        </div>
      </div>
      <button
        className="Form__button text-white bg-blue-500 hover:bg-blue-700 text"
        disabled={formData === undefined ? true : false}
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
