"use client";

import { MembershipPlan } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PaginationDropdownMenu } from "../pagination-dropdown-menu";
import { Button } from "../ui/button";
import { Filter } from "./filter";
import { TableSearchInput } from "./table-search-input";

export const TableFilters = ({
  membershipPlans,
}: {
  membershipPlans: MembershipPlan[];
}) => {
  const [value, setValue] = useState("");
  const params = useSearchParams();
  const router = useRouter();

  const handleReset = () => {
    setValue("");
    router.push("/admin/members");
  };

  return (
    <section className="flex gap-3 flex-wrap">
      <TableSearchInput
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
      <Filter options={["male", "female"]} filterKey="gender" title="Gender" />
      <Filter
        options={membershipPlans.map((plan) => plan.name.toLowerCase())}
        filterKey="membership_plan"
        title="Membership Plan"
      />
      {!!params.size && (
        <Button onClick={handleReset} className="group h-8" variant="outline">
          Reset
          <X className="h-4 w-4 ml-2 group-hover:scale-[1.4] transition group-hover:text-red-500" />
        </Button>
      )}
      <PaginationDropdownMenu maxPages={50} />
    </section>
  );
};
