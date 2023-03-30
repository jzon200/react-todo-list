import { useRef } from "react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { HiSortDescending } from "react-icons/hi";
import { getTodoListRequest } from "../todoSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

export default function SortButton() {
  const sortDialogRef = useRef<HTMLDialogElement>(null);

  function handleCloseDialog() {
    sortDialogRef.current?.close();
    document.removeEventListener("click", handleCloseDialog);
  }

  const sortedBy = useAppSelector((state) => state.todo.sortedBy);

  const dispatch = useAppDispatch();

  return (
    <div className="relative">
      <button
        className="p-2 rounded-[50%] hover:bg-neutral-600/50"
        title="Sort"
        onClick={(e) => {
          e.stopPropagation();

          if (!sortDialogRef.current?.open) {
            sortDialogRef.current?.show();
            document.addEventListener("click", handleCloseDialog);
          } else {
            handleCloseDialog();
          }
        }}>
        <HiSortDescending size={24} />
      </button>
      <dialog
        ref={sortDialogRef}
        className="w-32 p-0 m-0 rounded-lg z-10 -left-24 overflow-clip bg-dark-variant">
        <ul>
          <li
            onClick={() => {
              dispatch(getTodoListRequest("targetDate"));
            }}
            className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-neutral-600 ${
              sortedBy === "targetDate" && "text-blue-500"
            }`}>
            <AiOutlineClockCircle />
            <div>By Date</div>
          </li>
          <li
            onClick={() => {
              dispatch(getTodoListRequest("title"));
            }}
            className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-neutral-600 ${
              sortedBy === "title" && "text-blue-500"
            }`}>
            <AiOutlineSortAscending />
            <div>By Title</div>
          </li>
        </ul>
      </dialog>
    </div>
  );
}
