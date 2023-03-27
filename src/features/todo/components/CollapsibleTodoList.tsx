import { Fragment, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import TodoItem from "./TodoItem";

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
  const [isCompact, setIsCompact] = useState(false);

  return (
    <Fragment>
      <div className="flex gap-2 font-medium">
        <FiChevronDown
          className={`transition-transform ${
            isCompact ? "-rotate-90" : "rotate-0"
          } `}
          size={24}
          onClick={() => {
            setIsCompact(!isCompact);
          }}
        />
        <div>{title}</div>
        <div className="text-neutral-500">{quantity}</div>
      </div>
      {!isCompact && (
        <ul className="flex flex-col gap-4 mx-8">
          {todoList.map((todo) => {
            const todoId = `${todo.title}-${todo.id}`;
            return <TodoItem key={todoId} id={todoId} title={todo.title} />;
          })}
        </ul>
      )}
    </Fragment>
  );
}