import GuestGuard from "@/components/layout/auth/guest-guard";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <GuestGuard>{children}</GuestGuard>;
}
