import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import getTargetDateString from "../../../util/getTargetDate";
import { getTodoListRequest } from "../todoSlice";
import CollapsibleTodoList from "./CollapsibleTodoList";
import TodoItem from "./TodoItem";
import LoadingSpinner from "./LoadingSpinner";

export default function TodoListContent() {
  const { loading, sortedBy, todoList } = useAppSelector((state) => ({
    loading: state.todo.loading,
    todoList: state.todo?.todoList,
    sortedBy: state.todo.sortedBy,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest());
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const relativeDates = Array.from(
    new Set(
      todoList.map(({ targetDate }) => getTargetDateString(targetDate)) ?? []
    )
  );

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[50rem] pr-2">
      {sortedBy === "title" && (
        <ul>
          {todoList.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
      )}

      {sortedBy !== "title" &&
        relativeDates.map((relativeDate, index) => {
          const relativeTodoList = todoList.filter(
            ({ targetDate }) => getTargetDateString(targetDate) === relativeDate
          );

          return (
            <CollapsibleTodoList
              key={index}
              title={relativeDate}
              todoList={relativeTodoList}
              quantity={relativeTodoList.length}
            />
          );
        })}
    </div>
  );
}
