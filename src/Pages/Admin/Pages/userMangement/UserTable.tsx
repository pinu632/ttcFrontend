import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../../components/common/ComponentCard";
import UserTable from "@/components/Tables/usersTable";

export default function UsersTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="Users">
         <UserTable/>
        </ComponentCard>
      </div>
    </>
  );
}
