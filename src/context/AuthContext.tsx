"use client";

import React from "react";
import { onAuthStateChanged, getAuth, User, Auth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import Loading from "@/components/Loading";

const auth = getAuth(firebase_app);

interface AuthContextProps {
  user: User | null;
  signout: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  signout: async () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const clear = () => {
    setUser(null);
  };

  const signout = async () => {
    await auth.signOut();
    clear();
  };

  React.useEffect(() => {
    const isAuthenticated = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => isAuthenticated();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signout }}>
      {loading ? <Loading/> : children}
    </AuthContext.Provider>
  );
};
