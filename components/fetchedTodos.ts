// components/fetchedTodos.ts

import { Todo } from "@prisma/client";

export const useFetchTodos = () => {
  const fetchAndSortTodos = async (setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    const response = await fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let fetchedTodos = await response.json();

    setTodos(fetchedTodos);
  };

  return fetchAndSortTodos;
};
