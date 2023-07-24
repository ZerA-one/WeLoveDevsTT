import { getAllData } from "@/firebase/firestore/getData";
import { addData } from "../addData";
import { JobModelCreate } from "./dto";

const getAll = async (ids: string[]) => {
  return getAllData("jobs");
};

const create = async (data: JobModelCreate) => {
  return addData("jobs", data);
};

export { getAll, create };
