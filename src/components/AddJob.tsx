import React from "react";
import { JobModel } from "@/firebase/firestore/jobs/model";
import * as Job from "@/firebase/firestore/jobs";
import { Input } from "reactstrap";
import Select from "react-select";

interface FormJob {
  title: string;
  description: string;
  start: string;
  skillsSelected: [{ value: string; label: string }] | undefined;
  skills: [];
  companySelected: { value: string; label: string } | undefined;
  company: string;
}

interface AddJobProps {
  onAddJobSuccess: (job: JobModel) => void;
}

const AddJob = ({ onAddJobSuccess }: AddJobProps) => {
  const todayDate = new Date();
  const day = todayDate.getDate();
  const month = todayDate.getMonth() + 1;
  const year = todayDate.getFullYear();

  const [formData, setFormData] = React.useState<FormJob>({
    title: "",
    description: "",
    start: `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`,
    skillsSelected: undefined,
    skills: [],
    companySelected: undefined,
    company: "",
  });

  const companyOptions = [
    { value: "1", label: "Google" },
    { value: "2", label: "Facebook" },
    { value: "3", label: "Amazon" },
    { value: "4", label: "Apple" },
    { value: "5", label: "Microsoft" },
    { value: "6", label: "Netflix" },
    { value: "7", label: "Tesla" },
    { value: "8", label: "SpaceX" },
    { value: "9", label: "Twitter" },
    { value: "10", label: "Uber" },
    { value: "11", label: "Airbnb" },
    { value: "12", label: "Lyft" },
  ];

  const skillOptions = [
    { value: "1", label: "React" },
    { value: "2", label: "Vue" },
    { value: "3", label: "Angular" },
    { value: "4", label: "Node" },
    { value: "5", label: "Express" },
    { value: "6", label: "MongoDB" },
    { value: "7", label: "PostgreSQL" },
    { value: "8", label: "Firebase" },
    { value: "9", label: "AWS" },
    { value: "10", label: "NextJS" },
    { value: "11", label: "Azure" },
    { value: "12", label: "Docker" },
    { value: "13", label: "Kubernetes" },
    { value: "14", label: "Python" },
  ];

  const isFormValid = (): boolean => {
    return (
      formData?.title?.length > 0 &&
      formData?.description?.length > 0 &&
      formData?.skills.length >= 0 &&
      formData?.company?.length > 0
    );
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, title: e.currentTarget.value });
  };

  const handleDescriptionChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, description: e.currentTarget.value });
  };

  const handleStartChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, start: e.currentTarget.value });
  };

  const handleSkillsChange = (e: any): void => {
    const skills = e.map((skill: any) => skill.label);
    setFormData({ ...formData, skillsSelected: e, skills: skills });
  };

  const handleCompanyChange = (e: any): void => {
    console.log(e);
    setFormData({ ...formData, company: e.label, companySelected: e });
  };

  const onAddJob = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid() === false) return;

    Job.create({
      title: formData.title,
      description: formData.description,
      start: formData.start,
      skills: formData.skills,
      company: formData.company,
    }).then((res) => {
      const job = res.result as unknown as JobModel;
      setFormData({
        title: "",
        description: "",
        start: `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }`,
        skillsSelected: undefined,
        skills: [],
        companySelected: undefined,
        company: "",
      });
      onAddJobSuccess(job);
    });
  };

  return (
    <form
      className="bg-white w-[97%] mx-auto rounded-lg shadow-xl max-w-7xl"
      onSubmit={async (e) => {
        onAddJob(e);
      }}
    >
      <div className="flex flex-wrap justify-center items-center w-full pt-2">
        <label className="text-gray-700 text-center font-bold text-xl">
          Are you an employer, recruiter or HR, and want to post a job?
        </label>
      </div>
      <div className="flex flex-wrap mb-6 pt-3">
        <div className="w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-job-title"
          >
            Job Title
          </label>
          <Input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-job-title"
            type="text"
            placeholder="Software Engineer"
            onChange={handleTitleChange}
            maxLength={38}
          />
        </div>
        <div className="w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Start
          </label>
          <Input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="date"
            onChange={handleStartChange}
            value={formData?.start}
          />
        </div>
      </div>

      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Skills
          </label>
          <Select
            onChange={handleSkillsChange}
            closeMenuOnSelect={false}
            isMulti={true}
            isOptionDisabled={() => formData.skills.length >= 4}
            className="w-full block"
            options={skillOptions}
            value={formData.skillsSelected}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Company
          </label>
          <Select
            value={formData.companySelected}
            onChange={handleCompanyChange}
            className="w-full"
            options={companyOptions}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full mx-auto px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-description"
          >
            Description
          </label>
          <Input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-description"
            type="textarea"
            placeholder="You will love this job!"
            onChange={handleDescriptionChange}
            maxLength={500}
          />
        </div>
      </div>
      <div className="flex w-full px-3 justify-center items-center pb-2">
        <button
          className="bg-[#2c3e50] text-white px-5 py-2 rounded-lg hover:bg-[#bdc3c7]"
          type="submit"
        >
          Add Job
        </button>
      </div>
    </form>
  );
};

export default AddJob;
