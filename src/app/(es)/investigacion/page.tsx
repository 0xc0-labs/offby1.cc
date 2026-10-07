import { ResearchIndex } from "@/components/Research/ResearchIndex";
import { es } from "@/content/es";
import { researchIndexMetadata } from "../../research-metadata";

export const metadata = researchIndexMetadata("es");

export default function Page() {
  return <ResearchIndex content={es} />;
}
