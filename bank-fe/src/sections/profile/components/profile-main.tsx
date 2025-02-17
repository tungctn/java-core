import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toast } from "@/hooks/use-toast";
import API from "@/services/API";
import { getUserLogin } from "@/store/features/auth/action";
import { useTranslation } from "@/hooks/use-translation";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";
import type { ProfileFormValues } from "../types";

export function ProfileMain() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (data: ProfileFormValues) => {
    try {
      const res = await API.Auth.updateProfile(data);
      if (res?.status === 200) {
        dispatch(getUserLogin());
        toast({
          title: t("Success"),
          description: t(res?.data?.message),
        });
      }
    } catch (error) {
      toast({
        title: t("Error"),
        description:
          error instanceof Error ? error.message : t("An error occurred"),
        variant: "destructive",
      });
    }
  };

  const defaultValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  };

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t("Settings")}</h2>
        <p className="text-muted-foreground">
          {t("Manage your account settings and preferences.")}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("Profile")}</CardTitle>
            <CardDescription>
              {t("Update your profile information and email address.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileAvatar
              avatar={user?.avatar}
              fullName={user?.fullName}
              onAvatarChange={(url) =>
                handleSubmit({ ...defaultValues, avatar: url })
              }
            />
            <ProfileForm
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
