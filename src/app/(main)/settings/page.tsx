import React from "react";
import { SettingsClient } from "./settings-client";
import db from "@/lib/db";

const SettingsPage = async () => {
  const membershipBenefits = await db.benefit.findMany({
    where: {},
  });
  return <SettingsClient membershipBenefits={membershipBenefits} />;
};

export default SettingsPage;
