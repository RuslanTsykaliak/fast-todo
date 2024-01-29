// components/handleEdit.ts

import toast from 'react-hot-toast';

export const handleEdit = async (id: number, title: string, description: string, priority: number, setIsEditing: (isEditing: boolean) => void) => {
  try {
    const response = await fetch('/api/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, description, priority })
    });

    if (!response.ok) {
      throw new Error('Response is not OK');
    }
    toast.success('Todo updated successfully');
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating todo:', error);
    toast.error('Failed to update todo');
  }
};
