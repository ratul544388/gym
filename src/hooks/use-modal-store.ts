import { MemberWithPlan, PlanWithBenefits } from "@/types";
import { Benefit, MembershipPlan } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "MEMBERSHIP_PLAN_PICKER_MODAL"
  | "DELETE_MEMBER_MODAL"
  | "EDIT_MEMBER_MODAL"
  | "DELETE_BENEFIT_MODAL"
  | "ADMISSION_FEE_MODAL"
  | "DELETE_MEMBERSHIP_PLAN_MODAL";
interface ModalData {
  membershipPlans?: PlanWithBenefits[];
  membershipPlanId?: string;
  memberId?: string;
  benefit?: Benefit;
  member?: MemberWithPlan;
  admissionFee?: number;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
