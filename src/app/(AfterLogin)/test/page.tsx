import Get from "./_component/Get";
import GetWithCookie from "./_component/GetWithCookie";
GetWithCookie;

export default function TestPage() {
  return (
    <>
      <h1>hi!</h1>
      <GetWithCookie />
      <Get />
    </>
  );
}
