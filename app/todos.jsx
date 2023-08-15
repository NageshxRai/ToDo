import { TodoItem } from "@/components/ServerSide";
import { cookies } from "next/headers";
import React from "react";

const fetchTodo = async (token) => {
  try {
    const res = await fetch("http://localhost:3000/api/mytask", {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();
    if (!data.success) return [];
    return data.tasks;
  } catch (error) {
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  const tasks = await fetchTodo(token);
  return (
    <div>
      <section className="todosContainer">
        {tasks?.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            id={i._id}
            key={i._id}
            completed={i.isCompleted}
          />
        ))}
      </section>
    </div>
  );
};

export default Todos;
