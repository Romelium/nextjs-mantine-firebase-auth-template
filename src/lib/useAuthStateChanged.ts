import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function useAuthStateChanged(nextOrObserver: (user: User | null) => void){
    let previousState = auth.currentUser;
    return onAuthStateChanged(auth, user => {
        if (user === previousState) return;
        previousState = user;
        nextOrObserver(user);
      });
}