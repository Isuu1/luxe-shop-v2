import Contact from "@/features/support/components/Contact";
import FAQ from "@/features/support/components/FAQ";
import BackLink from "@/shared/components/BackLink";

export default function Page() {
  return (
    <div className="page">
      <BackLink />
      <FAQ />
      <Contact />
    </div>
  );
}
