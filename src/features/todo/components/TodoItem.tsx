import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import isTodoOverdue from "../../../util/isTodoOverdue";
import { setSelectedTodo, updateTodoRequest } from "../todoSlice";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { selectedTodo, sortedBy } = useAppSelector((state) => ({
    selectedTodo: state.todo.selectedTodo,
    sortedBy: state.todo.sortedBy,
  }));
  const dispatch = useAppDispatch();

  return (
    <li
      className={`relative flex items-center gap-2 py-2 px-8 ${
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

      {isTodoOverdue(todo.targetDate) && !todo.completed && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-red-500 ">
          {new Date(todo.targetDate).toLocaleDateString()}
        </div>
      )}

      {sortedBy === "title" && !todo.completed && (
        <div
          className={`absolute top-1/2 right-4 -translate-y-1/2 ${
            isTodoOverdue(todo.targetDate) ? "text-red-500" : "text-blue-500"
          } `}>
          {new Date(todo.targetDate).toLocaleDateString()}
        </div>
      )}
    </li>
  );
}
