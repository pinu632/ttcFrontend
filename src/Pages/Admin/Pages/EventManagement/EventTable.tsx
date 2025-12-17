import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../../components/common/ComponentCard";
import EventTable from "@/components/Event/Eventtable";

export default function EventTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Event" />
      <div className="space-y-6">
        <ComponentCard title="Event">
         <EventTable/>
        </ComponentCard>
      </div>
    </>
  );
}
