import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {

  const {currentUser}=useSelector(state=>state.user);
  return (
    <div className="max-w-lg p-3 mx-auto">
      Profile
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="self-center object-cover w-24 h-24 mt-2 rounded cursor-pointer-full"
        />

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="p-3 rounded bg-slate-100-lg"
        />

        <input
          type="email"
          id="Email"
          placeholder="Email"
          className="p-3 rounded-lg bg-slate-100-lg"
        />

        <input
          type="password"
          id="password"
          className="p-3 rounded bg-slate-100-lg"
        />

        <button className="p-3 text-white uppercase rounded bg-slate-700-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete Account</span>

        <span className="text-red-700">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile
// 3.42