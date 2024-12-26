import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName,
      lastName,
      email,
    });

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Signup error: ", error.message);
      throw new Error(error.message || "Signup failed");
    }
    console.error("Unknown error:", error);
    throw new Error("Signup failed due to an unknown error");
  }
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

const provider = new GoogleAuthProvider();

export const loginOrSignupWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
      });
    } else {
      const userData = docSnap.data();

      const newFirstName = user.displayName?.split(" ")[0] || "";
      const newLastName = user.displayName?.split(" ").slice(1).join(" ") || "";

      if (
        userData.firstName !== newFirstName ||
        userData.lastName !== newLastName
      ) {
        await setDoc(
          userRef,
          {
            firstName: newFirstName,
            lastName: newLastName,
            email: user.email,
          },
          { merge: true }
        );
      }
    }

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Google login/signup error: ", error.message);
      throw new Error(error.message || "Google login/signup failed");
    }
    console.error("Unknown error:", error);
    throw new Error("An unknown error occurred during Google login/signup.");
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const getUser = (): User | null => {
  return auth.currentUser;
};
