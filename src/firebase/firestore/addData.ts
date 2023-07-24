import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { v4 } from "uuid";

const db = getFirestore(firebase_app);

async function addData(colllectionName: string, data: any) {
  const dbRef = collection(db, colllectionName);
  let result = null;
  let error = null;

  try {
    const id = v4();
    await setDoc(doc(dbRef, id), data, { merge: true });
    result = { id, ...data };
  } catch (e) {
    error = e;
  }
  return { result, error };
}

export { addData };
