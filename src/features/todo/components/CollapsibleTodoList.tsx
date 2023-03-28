import { Fragment, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import TodoItem from "./TodoItem";
import { FaEllipsisV } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdCheckCircle, MdDeleteSweep } from "react-icons/md";

type Props = {
  title: string;
  quantity: number;
  todoList: Todo[];
};

export default function CollapsibleTodoList({
  title,
  quantity,
  todoList,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const actionsDialogRef = useRef<HTMLDialogElement>(null);

  function handleCloseDialog() {
    actionsDialogRef.current?.close();
    document.removeEventListener("click", handleCloseDialog);
  }

  return (
    <Fragment>
      <div className="flex items-center gap-2 font-medium">
        <FiChevronDown
          className={`transition-transform ${
            isCollapsed ? "-rotate-90" : "rotate-0"
          } `}
          size={24}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        />
        <div>{title}</div>
        <div className="text-neutral-500">{quantity}</div>
        <div className="relative">
          <HiDotsVertical
            onClick={(e) => {
              e.stopPropagation();

              if (!actionsDialogRef.current?.open) {
                actionsDialogRef.current?.show();
                document.addEventListener("click", handleCloseDialog);
              } else {
                handleCloseDialog();
              }
            }}
          />
          <dialog
            ref={actionsDialogRef}
            className="w-40 absolute left-2 m-0 p-0 rounded-lg bg-dark-variant overflow-clip">
            <button className="w-full flex items-center gap-2 p-2 hover:bg-transparent/50 focus:outline-none">
              <MdDeleteSweep className="text-red-400" size={24} />
              <div>Delete All</div>
            </button>
            <button className="w-full flex items-center gap-2 p-2 hover:bg-transparent/50">
              <MdCheckCircle className="text-blue-400" size={24} />
              <div>Complete All</div>
            </button>
          </dialog>
        </div>
      </div>
      {!isCollapsed && (
        <ul>
          {todoList.map((todo) => {
            // const todoId = `${todo.title}-${todo.id}`;
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
      )}
    </Fragment>
  );
}
