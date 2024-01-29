// app/page.tsx

import prisma from "@/lib/prismadb";
import { Todo } from "@prisma/client";
import Edit from "@/components/Edit";

async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos;
}

export default async function Home() {
  const todos: Todo[] = await getTodos();
  return (
    <main className="flex flex-col items-center px-4">
      <div className="container mx-auto my-4 p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white bg-gray-100 text-black">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md mb-4 dark:bg-gray-700 dark:text-white">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold">{todo.title}</h2>

                {/* <Completed
                todoId={todo.id}
              /> */}

              </div>
              <p className={`text-gray-700 mb-2 ${todo.description && 'dark:text-gray-300'}`}>{todo.description}</p>
              <div className="flex justify-between items-end ">
                <p className={`text-${todo.priority}-500 font-bold`}>
                  Priority: {todo.priority}
                </p>
                <div className="flex space-x-4">

                  <div className="text-blue-500 hover:underline">
                    <Edit
                      todo={todo}
                    />
                  </div>

                  {/* <RemoveTodos
                  todo={todo.id}
                /> */}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}