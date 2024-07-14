import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');

      if (res.ok) {
        console.log("User created successfully");
      } else {
        console.log("Error creating user:", data);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Network error:", error);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {loading ? "Loading..." : "Sign Up"}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-3 rounded bg-slate-100"
          onChange={handleChange}
          required
        />

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
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth/>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>

      {error && <p className="mt-5 text-red-700">Something went wrong!</p>}
    </div>
  );
};

export default SignUp;
