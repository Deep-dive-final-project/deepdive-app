
import {  Suspense  } from "react";

import PostWriter from "./_component/PostWriter";


export default function PostsWrite() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <PostWriter />
      </Suspense>
  );
}

