// "use client";
// import { signIn } from "@/auth";
// import { DEFAULT_LOGGIN_REDIRRECT } from "@/routes";
// import { FaGithub } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Button } from "../ui/button";

// export const Social = () => {
//   const onClick = (provider: "google" | "github") => {
//     signIn(provider, {
//       callbackUrl: DEFAULT_LOGGIN_REDIRRECT,
//     });
//   };
//   return (
//     <div className="flex items-center w-full gap-x-2">
//       <Button
//         size={"lg"}
//         className="w-full"
//         variant={"outline"}
//         onClick={() => onClick("google")}
//       >
//         <FcGoogle className="h-5 w-5" />
//       </Button>
//       <Button
//         size={"lg"}
//         className="w-full"
//         variant={"outline"}
//         onClick={() => onClick("github")}
//       >
//         <FaGithub className="h-5 w-5" />
//       </Button>
//     </div>
//   );
// };
"use client";
import { DEFAULT_LOGGIN_REDIRRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGGIN_REDIRRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
