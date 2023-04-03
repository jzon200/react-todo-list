import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import getRelativeDate from "../../../util/getTargetDate";
import isTodoOverdue from "../../../util/isTodoOverdue";
import { getTodoListRequest } from "../todoSlice";
import CollapsibleTodoList from "./CollapsibleTodoList";
import LoadingSpinner from "./LoadingSpinner";

export default function TodoListContent() {
  const { page, hasMore, loading, sortedBy, todoList } = useAppSelector(
    (state) => ({
      loading: state.todo.loading,
      todoList: state.todo.todoList,
      sortedBy: state.todo.sortedBy,
      page: state.todo.page,
      hasMore: state.todo.hasMore,
    })
  );

  const divRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest({ page: 0, sortBy: "targetDate" }));
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current!;

    const isBottom = scrollHeight - scrollTop === clientHeight;

    if (isBottom && hasMore && !loading) {
      dispatch(getTodoListRequest({ page: page, sortBy: sortedBy }));
    }
  };

  const relativeDates = Array.from(
    new Set(todoList.map(({ targetDate }) => getRelativeDate(targetDate)) ?? [])
  );

  const overdueList = todoList.filter(
    ({ targetDate, completed }) => isTodoOverdue(targetDate) && !completed
  );

  const completedList = todoList.filter(({ completed }) => completed);
  const pendingList = todoList.filter(({ completed }) => !completed);

  return (
    <div
      ref={divRef}
      onScroll={handleScroll}
      className="flex flex-col gap-4 overflow-y-auto h-[50rem] pr-2">
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

      {loading && <LoadingSpinner />}
    </div>
  );
}
