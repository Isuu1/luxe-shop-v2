import UpdateDetails from "@/features/user/components/UpdateDetails";
import UpdatePassword from "@/features/user/components/UpdatePassword";

export default function Page() {
  return (
    <div className="flex-col">
      <UpdateDetails />
      <UpdatePassword />
    </div>
  );
}
