"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Fetch() {
  const { accessToken, fetchWithAuth } = useAuth();
  const fetchPosts = async () => {
    const { data: {contents} } = await fetchWithAuth("/api/note");
    console.log("note??", contents)
    return contents
  }

  const fetchTasksByPlanId = async (planId: number) => {
    const {data} = await fetchWithAuth(`/api/task/${planId}`);
    console.log("fetch! tasks!", data);
    // if (!response) {
    //   return;
    // }
    // console.log("fetch! task!", data);
    // return data.contents as Task[];
  };

  const { data: plans, isLoading: isGetPlansLoading, error: getPlansError } = useQuery({queryKey: ['plansWithTasks'],
    queryFn: async () => {
    // const plans = await fetchPlans();
    // if(!plans) {
    //   console.log("학습 계획이 없네유");
    //   new Error("No plan");
    //   return null;
    // }
    let plans = [{
      planId: 4
    }]

    const plansWithTasks = await Promise.all(
      plans.map(async (plan) => {
        const tasks = await fetchTasksByPlanId(plan.planId);
        return {
          ...plan,
          tasks,
        };
      })
    );

    return plansWithTasks;
  }});

  useEffect(() => {
    fetchPosts();
  }, []);

  return <>div</>
}