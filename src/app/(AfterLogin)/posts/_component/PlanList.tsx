"use client";

import { useState } from "react";
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
    console.log("fetch! plans!", data);
    if (!data) {
      return;
    }
    return data as Plan[];
  };

  const fetchTasksByPlanId = async (planId: number) => {
    const { data } = await fetchWithAuth(`/api/task/${planId}`);
    console.log("fetch! tasks!", data);
    if (!data.length()) {
      return;
    }
    return data as Task[];
  };

  const { data: planList, isLoading: isGetPlansLoading, error: getPlansError } = useQuery({queryKey: ['plansWithTasks'],
      queryFn: async () => {
      const plans = await fetchPlans();
      if(!plans) {
        console.log("학습 계획이 없네유");
        new Error("No plan");
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
    if (!planList) {
      console.log("없다고?", planList);
      return <div>No plan</div>;
    }
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
      {planList ? planList.map((plan, planIndex) => (
        <div key={planIndex}>
          <h2>{plan.plan_name}</h2>
          <h3>Tasks:</h3>
          <ul>
            {plan.tasks?.map((task, taskIndex) => (
              <li key={`${planIndex}_${taskIndex}`}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      )) : (<div>아직 학습 계획이 없어요!</div>)}
    </div>
  );


}