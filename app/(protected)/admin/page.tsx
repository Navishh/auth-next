"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";

const AdminPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const role = useCurrentRole();
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <p className=" text-xl font-semibold text-center">🗝️ Admin</p>
      </CardHeader>
      <CardContent className="space-y-4"></CardContent>
    </Card>
  );
};

export default AdminPage;
// import { currentRole } from "@/lib/auth";
// const AdminPage = async () => {
//   const role = await currentRole();
//   return <div className="text-slate-300">Current role : {role}</div>;
// };

// export default AdminPage;
