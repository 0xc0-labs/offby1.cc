import type { Metadata } from "next";
import { EmailObfuscationLab } from "@/components/Lab/EmailObfuscationLab";

export const metadata: Metadata = {
  title: "Email Obfuscation lab — offby1",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EmailObfuscationLab variant="strict" />;
}
