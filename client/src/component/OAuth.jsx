import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
export default function OAuth() {
  const dispatch=useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res =await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        }),
      });
      const data=await res.json();
      dispatch(signInSuccess(data));
      // You can handle the result here, e.g., save the user info
      console.log(result);
    } catch (error) {
      console.log("Could not login with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
