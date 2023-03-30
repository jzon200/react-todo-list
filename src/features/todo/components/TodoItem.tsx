import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setSelectedTodo, updateTodoRequest } from "../todoSlice";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const dispatch = useAppDispatch();

  return (
    <li
      className={`flex items-center gap-2 py-2 px-8 ${
        selectedTodo?.id === todo.id && "bg-neutral-700"
      }`}>
      <input
        type="checkbox"
        className="w-5 h-5"
        checked={todo.completed}
        onChange={(e) => {
          dispatch(updateTodoRequest({ ...todo, completed: e.target.checked }));
        }}
      />
      <input
        type="text"
        value={todo.title}
        className="w-full bg-transparent focus:outline-none"
        placeholder="No Title"
        onFocus={() => {
          dispatch(setSelectedTodo(todo));
        }}
        onChange={(e) => {
          dispatch(updateTodoRequest({ ...todo, title: e.target.value }));
        }}
      />
    </li>
  );
}
