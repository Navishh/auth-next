"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrenUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrenUser();
  return (
    <>
      {/* <p className="relative overflow-hidden bg-blue-200 text-slate-500 font-medium px-4 py-2 rounded-md transition-all duration-300 group">
        <span className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
          Client{" "}
        </span>
      </p> */}
      <p className="text-blue-300 font-bold text-xl">Client</p>

      <UserInfo label="🥸 User Details" user={user} />
    </>
  );
};

export default ClientPage;
