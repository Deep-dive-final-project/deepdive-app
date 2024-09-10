"use client";

import useAuth from "@/lib/auth";
import { useEffect } from "react";

export default function Post() {
  const { accessToken, fetchWithAuth, refreshAccessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth("/api/protected-resource");
        const { data } = response;
        console.log("res", data);
      } catch (error) {
        console.error("Error fetching protected resource", error);
      }
    };

    fetchData();
  }, [accessToken, fetchWithAuth, refreshAccessToken]);
  return <div>login</div>;
}
