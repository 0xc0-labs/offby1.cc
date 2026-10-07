import { ResearchIndex } from "@/components/Research/ResearchIndex";
import { en } from "@/content/en";
import { researchIndexMetadata } from "../../research-metadata";

export const metadata = researchIndexMetadata("en");

export default function Page() {
  return <ResearchIndex content={en} />;
}
