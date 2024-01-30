// api/completed/route.ts

import prisma from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';


export async function PUT(req: NextRequest) {
  const requestBody = await req.json();
  if (req.method === 'PUT') {
    const { id, completed } = requestBody;

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
      data: { completed },
      });

      if (updatedTodo) {
        console.log({ message: 'Todo status successfully' });
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