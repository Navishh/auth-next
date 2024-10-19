import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_skyblue,_blue)]">
      {children}
    </div>
  );
};

export default AuthLayout;
