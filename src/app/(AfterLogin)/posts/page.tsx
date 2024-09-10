import React, { Suspense } from "react";
import PostContainer from "./_component/PostContainer";

export default function Posts() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostContainer />
    </Suspense>
  );
}
