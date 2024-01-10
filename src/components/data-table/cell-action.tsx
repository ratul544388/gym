"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Member } from "@prisma/client";
import { Calendar, EditIcon, TrashIcon } from "lucide-react";
import { ActionDropdownMenu } from "../action-dropdown-menu";
import { MemberWithPlan } from "@/types";
import { useRouter } from "next/navigation";

interface CellActionProps {
  member: MemberWithPlan;
}

export const CellAction = ({ member }: CellActionProps) => {
  const { onOpen, isOpen } = useModal();
  const router = useRouter();
  return (
    <ActionDropdownMenu
      items={[
        {
          label: "Renew",
          icon: Calendar,
          onClick: () => router.push(`/members/${member.id}/renew`),
        },
        {
          label: "Edit",
          icon: EditIcon,
          onClick: () => router.push(`/members/${member.id}/edit`),
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
