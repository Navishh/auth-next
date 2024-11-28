"use client";

import { settings } from "@/actions/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrenUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsPage = () => {
  const user = useCurrenUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
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
        <Form {...form}>
          <form className="sapce-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-8">
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
