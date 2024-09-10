"use client";

import { useState } from "react";
import { plansWithTasks } from "@/data/plansWithTasks";
import styles from "./planList.module.css";
import PlanItem from "./PlanItem";


export default function DummyPlanList() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);

  const togglePlan = async (index: number) => {
    if (openPlan === index) {
      setOpenPlan(null);
    } else {
      setOpenPlan(index);
    }};
  
  return (
    <div className={styles.container}>
      {plansWithTasks && plansWithTasks.map((plan, index) => (
        <PlanItem
        key={index}
          plan={plan}
          isOpen={openPlan === index}
          togglePlan={() => togglePlan(index)}
          />
      ))}
    </div>
  );


}