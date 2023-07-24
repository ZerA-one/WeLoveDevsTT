import firebase_app from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(
  email: string,
  password: string
): Promise<{ result: UserCredential | null; error: any }> {
  let result: UserCredential | null = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
