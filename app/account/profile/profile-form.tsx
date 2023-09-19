"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Session } from "@supabase/supabase-js";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";

import { useSupabase } from "../../../components/providers/supabase-provider";

interface Props {
  session: Session | null;
  userDetails?: any;
}

const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .optional(),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ session, userDetails }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const user = session?.user;
  const { supabase } = useSupabase();

  const defaultValues: Partial<ProfileFormValues> = {
    full_name: userDetails?.full_name ?? "",
    email: user ? user.email : "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const updateName = async (full_name: string) => {
    setIsLoading(true);

    const user = session?.user;
    const { error } = await supabase
      .from("users")
      .update({ full_name })
      .eq("id", user?.id);
    if (error) {
      setIsLoading(false);
      console.log("updateName error: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Your display name couldn't be changed.",
        description: error.message ?? `Please try again`,
      });
    } else {
      toast({
        title: "You've succesfully changed your name!",
        description: `Your display name has been changed to ${full_name}.`,
      });
    }

    setIsLoading(false);
  };

  const updateEmail = async (email: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      setIsLoading(false);
      console.log("updateEmail: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Your email couldn't be changed.",
        description: error.message ?? `Please try again`,
      });
    } else {
      toast({
        title: `A confirmation email has been sent to ${email}.`,
        description: `Please check your inbox to confirm your new email address.`,
      });
    }
    setIsLoading(false);
  };

  function onSubmit(values: ProfileFormValues) {
    const { full_name, email } = values;
    if (full_name && full_name !== defaultValues.full_name) {
      updateName(full_name);
    }
    if (email && email !== defaultValues.email) {
      updateEmail(email);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Alan Turing" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <FormControl>
                  <Input placeholder="alan.turing@google.com" {...field} />
                </FormControl>
              </FormControl>
              <FormDescription>
                Change your verified email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
