import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebase_app from "@/firebase/config";

const db = getFirestore(firebase_app);

async function deleteData(collectionName: string, id: string) {
  const dbRef = collection(db, collectionName);
  let result = null;
  let error = null;

  try {
    await deleteDoc(doc(dbRef, id));
    result = true;
  } catch (e) {
    error = e;
  }
  return { result, error };
}

export { deleteData };
