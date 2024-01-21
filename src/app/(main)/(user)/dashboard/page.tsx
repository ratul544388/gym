import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const UserDashboardPage = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const member = await db.member.findFirst({
    where: {
      email: user?.email,
    },
  });

  const recordBoxs = [
    {
      label: "BMI tracker",
      className: "bg-indigo-500",
      highlight: "21.65",
    },
    {
      label: "Workout Plan",
      className: "bg-rose-500",
      highlight: "21.65",
    },
    {
      label: "Progress Tracking",
      className: "bg-blue-500",
      highlight: "21.65",
    },
    {
      label: "Neutrition Guidence",
      className: "bg-sky-500",
      highlight: "21.65",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold">
        Welcome <span className="text-primary">{user.name}</span>
      </h3>
      <p className="text-foreground/70 text-sm">
        Embark on your fitness journey. Achieve, transform, and conquer your
        goals!
      </p>
      <section className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {recordBoxs.map((item) => (
          <div
            key={item.label}
            className={cn(
              "border rounded-xl shadow-lg p-6 text-white",
              item.className
            )}
          >
            <h4 className="text-sm font-bold">{item.label}</h4>
          </div>
        ))}
      </section>
      <div className="mt-8 font-bold text-4xl">
        This page will fully be created soon...
      </div>
    </div>
  );
};

export default UserDashboardPage;
