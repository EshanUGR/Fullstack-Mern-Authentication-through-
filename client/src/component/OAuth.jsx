import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { app } from "../firebase"; // Ensure this file correctly initializes your Firebase app

export default function OAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save user data");
      }

      const data = await res.json();
      console.log(data);

      // Dispatch action to save user info to the Redux store
      dispatch(signInSuccess(data));
    } catch (error) {
      console.error("Could not login with Google", error);
      setError("Login with Google failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95"
        disabled={loading}
      >
        {loading ? "Loading..." : "Continue with Google"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
