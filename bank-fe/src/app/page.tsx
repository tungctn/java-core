"use client";
import LoadingScreen from "@/components/loading";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/axios";

export default function Init() {
  const router = useRouter();
  const token = getAuthToken();
  if (token) {
    router.push("/home");
  } else {
    router.push("/login");
  }
  return <LoadingScreen />;
}
