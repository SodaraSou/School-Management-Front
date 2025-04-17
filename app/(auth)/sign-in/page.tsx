import { getCurrentUserV2 } from "@/lib/auth";
import AuthForm from "../auth-form";
import { redirect } from "next/navigation";

async function SignInPage() {
  const user = await getCurrentUserV2();
  if (user) {
    redirect("/v2/dashboard");
  }

  return <AuthForm mode="sign-in" />;
}

export default SignInPage;
