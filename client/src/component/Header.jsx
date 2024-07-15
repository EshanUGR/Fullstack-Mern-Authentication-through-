import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
        {" "}
        {/* Fixed 'flext' typo */}
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="object-cover rounded-full h-7 w-7"
                />
              ) : (
                "SignIn"
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
