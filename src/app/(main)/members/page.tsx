import { getMembers } from "@/actions/members-action";
import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";

const MembersPage = async () => {
  const members = await getMembers();
  return (
    <div className="space-y-3">
      <PageHeader
        label="Members"
        actionLabel="Add New"
        actionUrl="/members/new"
      />
      <DataTable columns={columns} data={members} />
    </div>
  );
};

export default MembersPage;
