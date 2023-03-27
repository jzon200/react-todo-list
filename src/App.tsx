import { HiSortDescending } from "react-icons/hi";
import CollapsibleTodoList from "./features/todo/components/CollapsibleTodoList";
import NewTodoInput from "./features/todo/components/NewTodoInput";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUsersRequest } from "./features/users/usersSlice";
import getTargetDateString from "./util/getTargetDate";

function App() {
  const myTodoList =
    useAppSelector((state) => state.users.currentUser?.todoList) ?? [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  const uniqueDates = Array.from(
    new Set(myTodoList.map(({ targetDate }) => getTargetDateString(targetDate)))
  );

  return (
    <main className="flex flex-col gap-4 p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl">To-do</h1>
        <button
          title="Sort"
          className="p-2 rounded-[50%] hover:bg-neutral-600/50">
          <HiSortDescending size={24} />
        </button>
      </header>

      <NewTodoInput />

      {uniqueDates.map((uniqueDate) => {
        const subtasks = myTodoList.filter(
          ({ targetDate }) => getTargetDateString(targetDate) === uniqueDate
        );

        return (
          <CollapsibleTodoList
            key={uniqueDate}
            todoList={subtasks}
            title={uniqueDate}
            quantity={subtasks.length}
          />
        );
      })}
    </main>
  );
}

export default App;
