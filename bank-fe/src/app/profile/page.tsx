import { ProfileView } from "@/sections/profile/view/profile-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile and settings",
};

export default function ProfilePage() {
  return <ProfileView />;
} 