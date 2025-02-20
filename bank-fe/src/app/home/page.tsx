import HomeView from "@/sections/home/view/home-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function HomePage() {
  return <HomeView />;
}
