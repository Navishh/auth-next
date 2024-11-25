"use client";

import { useCurrentRole } from "@/hooks/use-current-role";

const AdminPage = () => {
  const role = useCurrentRole();
  return <div className="text-slate-300">Current role : {role}</div>;
};

export default AdminPage;
// import { currentRole } from "@/lib/auth";
// const AdminPage = async () => {
//   const role = await currentRole();
//   return <div className="text-slate-300">Current role : {role}</div>;
// };

// export default AdminPage;
