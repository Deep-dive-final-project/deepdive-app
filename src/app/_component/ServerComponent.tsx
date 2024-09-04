interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function ServerComponent() {
  // 서버에서 데이터를 받아오는 예시
  const data: Post = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  ).then((res) => res.json());

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
