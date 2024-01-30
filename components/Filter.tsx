'use client'

// components/Filter.tsx

import { useState, useEffect } from "react";

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    onFilterChange(selectedFilter);
  }, [selectedFilter, onFilterChange]);

  return (
    <div className="mb-4">
      <label htmlFor="filter" className="mr-2 text-xl font-extrabold uppercase">Filter All:</label>
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
