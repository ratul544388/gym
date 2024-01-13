"use client";

import { useModal } from "@/hooks/use-modal-store";
import { MemberWithPlan } from "@/types";
import { Calendar, EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionDropdownMenu } from "../action-dropdown-menu";

interface CellActionProps {
  member: MemberWithPlan;
}

export const CellAction = ({ member }: CellActionProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  return (
    <ActionDropdownMenu
      items={[
        {
          label: "Renew",
          icon: Calendar,
          onClick: () =>
            router.push(
              `/admin/members/${member.id}/renew/?selected_plan=${member.membershipPlanId}`
            ),
        },
        {
          label: "Edit",
          icon: EditIcon,
          onClick: () => router.push(`/admin/members/${member.id}/edit`),
        },
        {
          label: "Delete",
          icon: TrashIcon,
          onClick: () => onOpen("DELETE_MEMBER_MODAL", { memberId: member.id }),
        },
      ]}
    />
  );
};
