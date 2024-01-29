"use server";

import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";

export const switchAdminOrUser = async () => {
  try {
    const user = await currentUser();

    const isAdmin = !!user?.isAdmin;

    await db.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        ...(isAdmin ? { isAdmin: false } : { isAdmin: true }),
      },
    });

    return {
      success: isAdmin
        ? "You are now Switch to User Mode"
        : "Your are now switched to Admin Mode",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
