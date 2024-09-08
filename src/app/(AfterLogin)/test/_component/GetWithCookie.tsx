"use client";

import { useEffect } from "react";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export default function GetWithCookie() {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lecture`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // useEffect 내부에서 fetchData 호출
  }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 실행

  return <div>fetching Data</div>;
}
