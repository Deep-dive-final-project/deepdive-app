import axiosInstance from "@/lib/axios";

export default async function GetWithCookie() {
  const res = await axiosInstance.get("/api/note", {
    withCredentials: true,
  });
  console.log(res.data);
  return <div>hi</div>;
}
