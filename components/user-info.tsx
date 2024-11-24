/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtendUser } from "@/next-auth";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInterfaceProps {
  user?: ExtendUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInterfaceProps) => {
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        {/* <div className=" flex text-center justify-center items-center">
          <p className=" text-center text-xl font-semibold ">{label}</p>
          <span>
            {"  "}-{"  "}
          </span>
          <p className=" w-[50px] text-slate-500 bg-blue-200 py-0.5 px-1 rounded-md">
            client
          </p>
        </div> */}
        <div className="flex text-center justify-center items-center">
          <p className="text-center text-xl font-semibold">{label}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className=" flex flex-row items-center justify-between rounded-lg  border-slate-400 p-3 shadow-sm ">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-sm max-w-[200px] font-mono py-1 px-2 bg-slate-100 rounded-md ">
            {user?.id}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg  border-slate-400 p-3 shadow-sm ">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-sm max-w-[200px] font-mono py-1 px-2 bg-slate-100 rounded-md ">
            {user?.name}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg  border-slate-400 p-3 shadow-sm ">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-sm max-w-[200px] font-mono py-1 px-2 bg-slate-100 rounded-md ">
            {user?.email}
          </p>
        </div>{" "}
        <div className=" flex flex-row items-center justify-between rounded-lg  border-slate-400 p-3 shadow-sm ">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-sm max-w-[200px] font-mono py-1 px-2 bg-slate-100 rounded-md ">
            {user?.role}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg  border-slate-400 p-3 shadow-sm ">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
