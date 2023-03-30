import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import getTargetDateString from "../../../util/getTargetDate";
import { getUsersRequest } from "../../users/usersSlice";
import CollapsibleTodoList from "./CollapsibleTodoList";

export default function TodoListContent() {
  const myTodoList = useAppSelector((state) => state.todo?.todoList) ?? [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  const relativeDates = Array.from(
    new Set(myTodoList.map(({ targetDate }) => getTargetDateString(targetDate)))
  );

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[50rem] pr-2">
      {relativeDates.map((relativeDate, index) => {
        const relativeTodoList = myTodoList.filter(
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
