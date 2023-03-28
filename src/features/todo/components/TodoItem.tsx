import { useState } from "react";
import { setSelectedTodo, setTodoProperty } from "../todoSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  // const [isFocused, setIsFocused] = useState(false);
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const dispatch = useAppDispatch();

  return (
    <li
      className={`flex items-center gap-2 py-2 px-8 ${
        selectedTodo?.id === todo.id && "bg-neutral-700"
      }`}>
      <input type="checkbox" className="w-5 h-5" />
      <input
        type="text"
        defaultValue={todo.title}
        className="w-full bg-transparent focus:outline-none"
        onFocus={() => {
          // setIsFocused(true);
          dispatch(setSelectedTodo(todo));
        }}
        onChange={(e) => {
          dispatch(
            setTodoProperty({
              id: todo.id,
              key: "title",
              value: e.target.value,
            })
          );
          // dispatch(setSelectedTodo(todo));
        }}
      />
    </li>
  );
}
