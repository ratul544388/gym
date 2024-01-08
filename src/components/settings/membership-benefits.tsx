"use client";

import { Benefit } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MembershipBenefitForm } from "./membership-benefit-form";
import { Button } from "../ui/button";
import { useState } from "react";

interface MembershipBenefitsProps {
  benefits: Benefit[];
}

export const MembershipBenefits = ({ benefits }: MembershipBenefitsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Membership Plan Benefits</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3">
          <ul className="grid lg:grid-cols-2 ">
            {benefits.map((item, index) => (
              <li key={item.id} className="font-semibold py-2">
                {index + 1}. {item.title}
              </li>
            ))}
          </ul>
          {isAdding ? (
            <MembershipBenefitForm />
          ) : (
            <Button onClick={() => setIsAdding(true)} className="ml-auto">
              Add new
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
