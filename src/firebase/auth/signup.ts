import firebase_app from "@/firebase/config";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(
  email: string,
  password: string
): Promise<{ result: UserCredential | null; error: any }> {
  let result: UserCredential | null = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
