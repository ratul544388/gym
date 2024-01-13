import { PageHeader } from "@/components/page-header";
import { AdmissionFee } from "@/components/settings/admission-fee";
import { MembershipBenefits } from "@/components/settings/membership-benefits";
import db from "@/lib/db";

const SettingsPage = async () => {
  const membershipBenefits = await db.benefit.findMany({
    where: {},
  });

  const defaultSetting = await db.defaultSettings.findFirst();
  return (
    <div className="space-y-3">
      <PageHeader label="Settings" />
      <MembershipBenefits benefits={membershipBenefits} />
      <AdmissionFee admissionFee={defaultSetting?.admissionFee} />
    </div>
  );
};

export default SettingsPage;
