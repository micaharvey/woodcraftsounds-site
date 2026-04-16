import type { Metadata } from "next";
import TesselRunPrivacyPolicy from "../../components/TesselRunPrivacyPolicy";

export const metadata: Metadata = {
  title: "Tessel Run iOS Privacy Policy | Woodcraft Sounds",
  description: "iOS privacy policy for Tessel Run by Woodcraft Sounds.",
};

export default function PrivacyPolicy() {
  return <TesselRunPrivacyPolicy />;
}
