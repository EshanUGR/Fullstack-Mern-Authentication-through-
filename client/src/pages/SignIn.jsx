import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Define local loading state
  const [error, setError] = useState(null); // Define local error state

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading, userError } = useSelector((state) => state.user); // Get Redux state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");

      if (res.ok) {
        console.log("User signed in successfully");
      } else {
        console.log("Error signing in:", data);
        setError("Error signing in");
      }
    } catch (error) {
      setLoading(false);
      setError(error.toString());
      dispatch(signInFailure(error.toString()));
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-3 rounded bg-slate-100"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 rounded bg-slate-100"
          onChange={handleChange}
          required
        />

        <button
          className="text-white uppercase rounded bg-slate-700 hover:opacity-95 disabled:opacity-80"
          type="submit"
          disabled={loading || userLoading}
        >
          {loading || userLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="mt-5 text-red-700">
        {error ? error : userError ? userError : ""}
      </p>
    </div>
  );
};

export default SignIn;
