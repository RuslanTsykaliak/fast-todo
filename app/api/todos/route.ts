// app/api/todos/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { title, description, priority } = requestBody;

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: Number(priority),
      },
    });

    if (newTodo) {
      console.log({ message: 'Todo created successfully' });
      return NextResponse.json(newTodo);
    }
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


export async function GET(req: NextRequest) {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


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


export async function DELETE(req: NextRequest) {
  const requestBody = await req.json();
  const { id } = requestBody;

  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });

    if (deletedTodo) {
      console.log({ message: 'Todo deleted successfully' });
      return NextResponse.json(deletedTodo);
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
