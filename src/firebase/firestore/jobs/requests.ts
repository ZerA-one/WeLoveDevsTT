import { getAllData } from "@/firebase/firestore/getData";
import { addData } from "../addData";
import { JobModelCreate } from "./dto";
import { deleteData } from "../deleteData";

const getAll = async () => {
  return getAllData("jobs");
};

const create = async (data: JobModelCreate) => {
  return addData("jobs", data);
};

const deleteByID = async (id: string) => {
  return deleteData("jobs", id);
};

export { getAll, create, deleteByID };
