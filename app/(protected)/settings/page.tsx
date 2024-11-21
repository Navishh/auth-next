"use client";

import { logout } from "@/actions/logout";
import { useCurrenUser } from "@/hooks/use-current-user";
const SettingsPage = () => {
  const user = useCurrenUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className="justify-center items-center text-center">
      {/* {JSON.stringify(user)} */}
      <button
        onClick={onClick}
        type="submit"
        className="relative overflow-hidden bg-white text-gray-950 font-medium px-4 py-2 rounded-md transition-all duration-300 group"
      >
        <span className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
          Sign out
        </span>
      </button>
    </div>
  );
};

export default SettingsPage;
