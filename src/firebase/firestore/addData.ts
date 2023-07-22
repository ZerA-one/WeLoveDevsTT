import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config";

const db = getFirestore(firebase_app);

async function addData(colllection: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export { addData };
