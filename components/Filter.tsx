// components/Filter.tsx

'use client'

import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";

interface FilterProps {
  todos: Todo[];
  onFilterChange: (filteredTodos: Todo[]) => void;
}

const Filter: React.FC<FilterProps> = ({ todos, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    let filteredTodos;
    switch (selectedFilter) {
      case "newest":
        filteredTodos = [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        filteredTodos = [...todos].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "done":
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      case "undone":
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
      case "priority-high":
        filteredTodos = todos.sort((a, b) => (b as any).priority - (a as any).priority);
        break;
      case "priority-low":
        filteredTodos = todos.sort((a, b) => (a as any).priority - (b as any).priority);
        break;
      default:
        filteredTodos = todos;
    }
    onFilterChange(filteredTodos);
  }, [selectedFilter, todos, onFilterChange]);

  return (
    <div className="mb-4">
      <label htmlFor="filter" className="mr-2 text-xl font-extrabold uppercase">Filter:</label>
      <select
        id="filter"
        value={selectedFilter}
        onChange={({ target: { value } }) => setSelectedFilter(value)}
        className="border p-2 rounded-md"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
        <option value="priority-high">Priority High</option>
        <option value="priority-low">Priority Low</option>
      </select>
    </div>
  );
};

export default Filter;