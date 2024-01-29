// app/api/edit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function PUT(req: NextRequest) {
  const requestBody = await req.json();
  if (req.method === 'PUT') {
    const { id, title, description, priority } = requestBody;

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: {
          title,
          description,
          priority: Number(priority),
        },
      });

      if (updatedTodo) {
        console.log({ message: 'Todo updated successfully' });
        return NextResponse.json(updatedTodo);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      return NextResponse.json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}
