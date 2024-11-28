"use client";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "John ",
      }).then(() => {
        update();
      });
    });
  };

  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <div className="flex text-center justify-center items-center">
          <p className="text-center text-xl font-semibold">🤖 Settings</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button disabled={isPending} onClick={onClick}>
          Change name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
