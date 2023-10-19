"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}
export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push("/");
      }

      setIsLoading(false);
    })();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Super Secret Dashboard</h1>
    </div>
  );
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    }
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
