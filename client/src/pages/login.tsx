import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/card-wrapper";
import FormError from "@/components/form-error";
import { api } from "@/lib/api";
import { Loader } from "lucide-react";
import { useState } from "react";

type LoginData = z.infer<typeof LoginSchema>;

export const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: LoginData) => {
      return (await api.post("/auth/login", credentials)).data;
    },
    onSuccess: () => {
      setError("");
      navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setError(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/register"
      backButtonLabel="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="abc@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <Loader className="size-5 animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
