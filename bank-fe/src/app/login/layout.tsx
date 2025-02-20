import GuestGuard from "@/components/layout/auth/guest-guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
