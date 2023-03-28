import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setTodoProperty } from "../todoSlice";

export default function TodoDetails() {
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const dispatch = useAppDispatch();

  return (
    <div className="border-l-2 border-neutral-600 flex flex-col gap-4 p-4">
      <input
        type="text"
        className="focus:outline-none bg-transparent text-2xl font-medium"
        placeholder="Title"
        value={selectedTodo?.title}
        onChange={(e) => {
          dispatch(
            setTodoProperty({
              id: selectedTodo?.id ?? 1,
              key: "title",
              value: e.target.value,
            })
          );
        }}
      />
      <input
        type="text"
        className="focus:outline-none bg-transparent text-xl"
        placeholder="Description"
        value={selectedTodo?.description}
      />
    </div>
  );
}
