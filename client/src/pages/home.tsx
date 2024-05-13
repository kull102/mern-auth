import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
export const Home = () => {
  const navigate = useNavigate();
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      return (
        await api.get("/user", {
          headers: {},
        })
      ).data;
    },
    retry: 2,
  });

  const { mutate, isPending: isPendingLogout } = useMutation({
    mutationFn: async () => {
      return await api.get("/auth/logout");
    },
    onSettled: () => {
      navigate("/login");
    },
  });

  if (isPending) {
    return (
      <div className="grid place-content-center">
        <Loader className="size-6 animate-spin text-white" />
      </div>
    );
  }
  if (isError) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-[380px] p-4 bg-white rounded-md space-y-6 text-center">
      {isSuccess ? (
        <>
          <h1 className="text-center">Hi, {data?.name}. You logged in</h1>

          <Button
            disabled={isPendingLogout}
            onClick={() => {
              mutate();
            }}
          >
            {isPendingLogout ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              "Log out"
            )}
          </Button>
        </>
      ) : null}
    </div>
  );
};
