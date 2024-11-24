import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <>
      <p className="relative overflow-hidden bg-blue-200 text-slate-500 font-bold text-xl px-4 py-2 rounded-md transition-all duration-300 group">
        <span className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
          Server{" "}
        </span>
      </p>
      <UserInfo label="🥸 User Details" user={user} />
    </>
  );
};

export default ServerPage;
