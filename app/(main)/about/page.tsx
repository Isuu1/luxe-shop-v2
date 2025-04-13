import AboutUs from "@/features/about-us/components/AboutUs";
import BackLink from "@/shared/components/BackLink";

export default function Page() {
  return (
    <div className="page">
      <BackLink previousPage="About us" />
      <AboutUs />
    </div>
  );
}
