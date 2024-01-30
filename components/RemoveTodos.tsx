// components/RemoveTodos.tsx

import toast from "react-hot-toast";

import { Todo } from "@prisma/client";

interface RemoveTodosProps {
  todo: Todo;
  onRemoveSuccess: () => void;
  setTodos: (todos: Todo[]) => void;
}

const RemoveTodos: React.FC<RemoveTodosProps> = (
  { todo, onRemoveSuccess, setTodos }
) => {
  const handleRemoveClick = async (id: number) => {
    try {
      const response = await fetch(`/api/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        toast.success("Todo removed successfully");
        onRemoveSuccess();
  
        // Fetch the updated list of todos from the server
        const updatedTodosResponse = await fetch('/api/todos');
        const updatedTodos = await updatedTodosResponse.json();
        setTodos(updatedTodos);
  
      } else {
        const errorData = await response.json();
        toast.error(`Failed to remove todo: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while removing todo:", error);
    }
  };
  

  return (
    <div>
      <button
        className="text-red-500 hover:underline"
        onClick={() => handleRemoveClick(todo.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default RemoveTodos;