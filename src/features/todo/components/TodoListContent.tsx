import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import getRelativeDate from "../../../util/getTargetDate";
import { getTodoListRequest } from "../todoSlice";
import CollapsibleTodoList from "./CollapsibleTodoList";
import TodoItem from "./TodoItem";
import LoadingSpinner from "./LoadingSpinner";
import isTodoOverdue from "../../../util/isTodoOverdue";

export default function TodoListContent() {
  const { loading, sortedBy, todoList } = useAppSelector((state) => ({
    loading: state.todo.loading,
    todoList: state.todo?.todoList,
    sortedBy: state.todo.sortedBy,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest("targetDate"));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const relativeDates = Array.from(
    new Set(todoList.map(({ targetDate }) => getRelativeDate(targetDate)) ?? [])
  );

  const overdueList = todoList.filter(
    ({ targetDate, completed }) => isTodoOverdue(targetDate) && !completed
  );

  const completedList = todoList.filter(({ completed }) => completed);
  const pendingList = todoList.filter(({ completed }) => !completed);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[50rem] pr-2">
      {sortedBy === "title" && (
        <CollapsibleTodoList
          title="Pending"
          todoList={pendingList}
          quantity={pendingList.length}
        />
      )}

      {sortedBy === "targetDate" && overdueList.length > 0 && (
        <CollapsibleTodoList
          title={"Overdue"}
          todoList={overdueList}
          quantity={overdueList.length}
        />
      )}

      {sortedBy === "targetDate" &&
        relativeDates.map((relativeDate, index) => {
          if (relativeDate === "Overdue") return;

          const relativeTodoList = todoList.filter(
            ({ targetDate, completed }) =>
              getRelativeDate(targetDate) === relativeDate && !completed
          );

          if (relativeTodoList.length === 0) return;

          return (
            <CollapsibleTodoList
              key={index}
              title={relativeDate}
              todoList={relativeTodoList}
              quantity={relativeTodoList.length}
            />
          );
        })}

      {completedList.length > 0 && (
        <CollapsibleTodoList
          title={"Completed"}
          todoList={completedList}
          quantity={completedList.length}
        />
      )}
    </div>
  );
}
