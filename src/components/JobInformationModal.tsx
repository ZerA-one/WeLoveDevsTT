import { JobModel } from "@/firebase/firestore/jobs/model";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface JobInformationModalProps {
  job: JobModel | null;
  onDelete: (id: string) => void;
  onClose: () => void;
  toggle: () => void;
  isOpen: boolean;
}

const JobInformationModal = ({
  onDelete,
  onClose,
  toggle,
  isOpen,
  job,
}: JobInformationModalProps) => {
  return (
    <Modal size="xl" isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="items-center justify-center w-full">
        <div className="items-center justify-center">
          <label className="text-black text-center font-bold text-xl">
            {job?.title}
          </label>
          <label className="text-gray-500 text-md ml-5">{job?.company}</label>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-center justify-center">
          <label className="text-gray-400 text-md">{job?.start}</label>
          <div className="flex flex-wrap items-center justify-center mt-3">
            {job?.skills?.map((skill) => (
              <label
                key={`${skill}.${job?.id}`}
                className="text-gray-400 text-sm mr-4 bg-gray-200 rounded-lg border-2 border-gray-300 px-1"
              >
                {skill}
              </label>
            ))}
          </div>
          <label className="text-gray-600 text-sm mt-4">
            {job?.description}
          </label>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-[#bdc3c7]"
          onClick={(e) => {
            e.preventDefault();
            onDelete(job?.id || "");
          }}
        >
          Delete
        </button>
        <button
          className="bg-[#2c3e50] text-white px-5 py-2 rounded-xl hover:bg-[#bdc3c7]"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default JobInformationModal;
