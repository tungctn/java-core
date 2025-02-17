"use client";
import { Container } from "lucide-react";
// app/not-found.tsx
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import { URL_LIST } from "@/lib/config_global";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center items-center text-center gap-2">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          {t(
            "The page you are looking for might have been removed or is temporarily unavailable"
          )}
        </p>
        <Button
          onClick={() => router.push(URL_LIST.root.index)}
          className="mt-2"
        >
          {t("Back to Dashboard")}
        </Button>
      </div>
    </Container>
  );
}
