import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateTodoRequest } from "../todoSlice";

export default function TodoDetails() {
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const dispatch = useAppDispatch();

  return (
    <div className="border-l-2 border-neutral-600">
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name=""
            id=""
            className="w-5 h-5"
            checked={selectedTodo?.completed ?? false}
            onChange={(e) => {
              if (selectedTodo != null) {
                dispatch(
                  updateTodoRequest({
                    ...selectedTodo,
                    completed: e.target.checked,
                  })
                );
              }
            }}
          />
          <div className="h-5 border-l border-neutral-600" />
          <input
            className="bg-transparent focus:bg-neutral-600 focus:outline-none"
            type="datetime-local"
            value={selectedTodo?.targetDate.substring(0, 16)}
            onChange={(e) => {
              if (selectedTodo != null) {
                dispatch(
                  updateTodoRequest({
                    ...selectedTodo,
                    targetDate: e.target.value,
                  })
                );
              }
            }}
          />
        </div>
        <button title="Delete Todo">
          <MdDelete size={24} className="text-red-400" />
        </button>
      </div>

      <div className="flex flex-col gap-2 p-4 border-t border-neutral-600">
        <input
          type="text"
          className="focus:outline-none bg-transparent text-2xl font-medium"
          placeholder="Title"
          value={selectedTodo?.title}
          onChange={(e) => {
            if (selectedTodo != null) {
              dispatch(
                updateTodoRequest({ ...selectedTodo, title: e.target.value })
              );
            }
          }}
        />
        <input
          type="text"
          className="focus:outline-none bg-transparent text-xl"
          placeholder="Description"
          value={selectedTodo?.description}
          onChange={(e) => {
            if (selectedTodo != null) {
              dispatch(
                updateTodoRequest({
                  ...selectedTodo,
                  description: e.target.value,
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
}
