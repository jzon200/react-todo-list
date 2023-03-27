/// <reference types="vite/client" />
type User = {
  id: number;
  username: string;
  todoList: Todo[];
};

type Todo = {
  id: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
  targetDate: string;
};
