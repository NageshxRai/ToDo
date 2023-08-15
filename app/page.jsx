import { Suspense } from "react";
import AddTodoForm from "./addTodoForm";

import Todos from "./todos";

export default async function Home() {
  return (
    <>
      <div className="container">
        <AddTodoForm />
        <Suspense fallback={<div>Loading...</div>}>
          <Todos />
        </Suspense>
      </div>
    </>
  );
}
