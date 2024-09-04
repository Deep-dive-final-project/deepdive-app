import Link from "next/link";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다. 다른 페이지로 이동해주세요.</div>
      <Link href="/">홈</Link>
    </div>
  );
};

export default NotFound;
