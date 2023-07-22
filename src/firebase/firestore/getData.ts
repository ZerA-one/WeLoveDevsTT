import { getFirestore, doc, getDoc, collection, getDocs, query } from "firebase/firestore";
import firebase_app from "@/firebase/config";

const db = getFirestore(firebase_app);

async function getDataByID(collection: string, id: string) {
  let docRef = doc(db, collection, id);
  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

async function getAllData(collectionName: string) {
  const dbRef = collection(db, collectionName);
  const q = query(dbRef);
  const docSnap = await getDocs(q);

  if (docSnap) {
    return docSnap.docs.map((doc) => doc.data());
  }
  return null;
}

export { getDataByID, getAllData };
