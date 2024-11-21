"use client";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 flex justify-between items-center w-full px-10 py-4 bg-[#1f1f1f] text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">LOGO.</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/protected/settings" className="text-white">
          Settings
        </a>
      </div>
    </div>
  );
};
