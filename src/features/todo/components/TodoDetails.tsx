import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteTodoRequest, updateTodoRequest } from "../todoSlice";

export default function TodoDetails() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const dispatch = useAppDispatch();

  const placeholder = (
    <div className="border-l-2 border-neutral-600 flex flex-col gap-4 justify-center items-center">
      <img src="/click-task.svg" alt="Click Task Image" />
      <p className="text-neutral-400">Click task to view the details</p>
    </div>
  );

  if (selectedTodo == null) return placeholder;

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
              dispatch(
                updateTodoRequest({
                  ...selectedTodo,
                  completed: e.target.checked,
                })
              );
            }}
          />
          <div className="h-5 border-l border-neutral-600" />
          <input
            className="bg-transparent focus:bg-neutral-600 focus:outline-none"
            type="datetime-local"
            value={selectedTodo?.targetDate.substring(0, 16)}
            onChange={(e) => {
              dispatch(
                updateTodoRequest({
                  ...selectedTodo,
                  targetDate: e.target.value,
                })
              );
            }}
          />
        </div>
        <button
          title="Delete Todo"
          onClick={() => {
            dialogRef.current?.showModal();
          }}>
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
            dispatch(
              updateTodoRequest({ ...selectedTodo, title: e.target.value })
            );
          }}
        />
        <input
          type="text"
          className="focus:outline-none bg-transparent text-xl"
          placeholder="Description"
          value={selectedTodo?.description}
          onChange={(e) => {
            dispatch(
              updateTodoRequest({
                ...selectedTodo,
                description: e.target.value,
              })
            );
          }}
        />
      </div>
      <dialog
        ref={dialogRef}
        className="w-80 rounded-lg bg-dark-variant backdrop:bg-black/25">
        <div className="text-xl">Are you sure?</div>
        <p className="text-neutral-400">
          This will be deleted in the to-do list.
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              dialogRef.current?.close();
            }}
            className="px-4 py-2 rounded-lg border border-neutral-600 hover:bg-neutral-600">
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(deleteTodoRequest(selectedTodo));
              dialogRef.current?.close();
            }}
            className="px-4 py-2 rounded-lg bg-red-500 font-medium hover:bg-rose-500">
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
}
