// add/page.tsx // need dark mode

"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from "react-hot-toast"

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number>(1);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      const errorMessage = "Title and description are required";
      toast.error(errorMessage);
      return;
    }

    try {
      console.log("Submitting form...");

      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      });

      console.log("Response from API:", res);

      if (res.ok) {
        toast.success("Post created successfully");
        router.push("/");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <form onSubmit={handleSubmit}>
        <Label className="block mb-4">
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />
        </Label>
        <Label className="block mb-4">
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          ></textarea>
        </Label>
        <Label className="block mb-4">
          Priority:
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value, 10))}
            className="w-full mt-2 p-2 border rounded"
          >
            {Array.from(Array(10).keys()).map((number) => (
              <option key={number + 1} value={number + 1}>
                {number + 1}
              </option>
            ))}
          </select>
        </Label>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}