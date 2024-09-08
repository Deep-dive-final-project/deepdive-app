"use client";
import axios from "axios";
import axiosInstance from "@/lib/axios";

interface Quest {
  id: number;
  name: string;
  content: string;
  answer: string;
  feedback: string;
  createdDate: string;
}

export default async function Get() {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lecture`, {
      withCredentials: true,
    })
    .then((res) => res.data);
  console.log(res);
  const {
    data: { dtos: quests },
  } = await axios
    .get<{ data: { dtos: Quest[] } }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quest`
    )
    .then((res) => res.data);

  return (
    <div>
      hihi
      {/* {quests &&
        quests.map((quest, index) => (
          <div key={index}>
            <h2>{quest.name}</h2>
            <div>{quest.createdDate}</div>
          </div>
        ))} */}
    </div>
  );
}
