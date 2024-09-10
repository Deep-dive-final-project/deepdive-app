"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { Plan } from "@/types/plan";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import styles from "./planList.module.css";
import PlanItem from "./PlanItem";


export default function PlanList() {
  const { fetchWithAuth } = useAuth();
  const [openPlan, setOpenPlan] = useState<number | null>(null);

  const fetchPlans = async () => {
    const {getPlanForPlanPageResponseDtoList: data
    } = await fetchWithAuth('/api/plan');
    if (!data) {
      return;
    }
    return data as Plan[];
  };

  const fetchTasksByPlanId = async (planId: number) => {
    const res = await fetchWithAuth(`/api/task/${planId}`);
    if (!res) {
      return;
    }
    return res as Task[];
  };

  const { data: planList, isLoading: isGetPlansLoading, error: getPlansError } = useQuery({queryKey: ['plansWithTasks'],
      queryFn: async () => {
      const plans = await fetchPlans();
      if(!plans) {
        console.log("No plan");
        return null;
      }
  
      const plansWithTasks = await Promise.all(
        plans.map(async (plan) => {
          const tasks = await fetchTasksByPlanId(plan.plan_id);
          
          if (!tasks) {
            return { ...plan }
          }
          return {
            ...plan,
            tasks,
          };
        })
      );
  
      return plansWithTasks;
    }});

    if (isGetPlansLoading) return <div>Loading...</div>;
  if (getPlansError) {
    console.log("error", getPlansError)
    return <div>Error loading plans</div>;
  }

  const togglePlan = async (index: number) => {
    if (openPlan === index) {
      setOpenPlan(null);
    } else {
      setOpenPlan(index);
    }};
  
  return (
    <div className={styles.container}>
      {(!isGetPlansLoading && planList) ? planList.map((plan, planIndex) => (
        <PlanItem
        key={planIndex}
          plan={plan}
          isOpen={openPlan === planIndex}
          togglePlan={() => togglePlan(planIndex)}
          />
      )) : (<div>아직 학습 계획이 없어요!</div>)}
    </div>
  );


}