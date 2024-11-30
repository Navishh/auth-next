"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onclick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <Dialog>
    <DialogTrigger asChild={asChild}>
      {children}
    </DialogTrigger>
    <DialogContent className="p-0 w-auto bg-transparent border-none">
      <LoginForm/>
    </DialogContent>
  </Dialog>;
  }

  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  );
};
