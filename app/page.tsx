import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import LockKeyIcon from "../components/icons/lockImage";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_skyblue,_blue)]">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md flex items-center gap-2",
            font.className
          )}
        >
          <LockKeyIcon />
          Auth
        </h1>
        <p className="text-white text-lg">An authentication service</p>
      </div>
      <div className="mt-6">
        <LoginButton mode="modal" asChild>
          <Button variant={"secondary"} size={"lg"}>
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
