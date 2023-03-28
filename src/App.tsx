import { HiSortDescending } from "react-icons/hi";
import CollapsibleTodoList from "./features/todo/components/CollapsibleTodoList";
import NewTodoInput from "./features/todo/components/NewTodoInput";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUsersRequest } from "./features/users/usersSlice";
import getTargetDateString from "./util/getTargetDate";
import ProfileHeader from "./features/todo/components/ProfileHeader";
import TodoDetails from "./features/todo/components/TodoDetails";

function App() {
  const myTodoList = useAppSelector((state) => state.todo.todoList) ?? [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  const uniqueDates = Array.from(
    new Set(myTodoList.map(({ targetDate }) => getTargetDateString(targetDate)))
  );

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col gap-4 py-4 px-6">
        {/* <ProfileHeader /> */}
        <header>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">To-do</h1>
            <button
              title="Sort"
              className="p-2 rounded-[50%] hover:bg-neutral-600/50">
              <HiSortDescending size={24} />
            </button>
          </div>
        </header>
        <NewTodoInput />

        <div className="flex flex-col gap-4 overflow-y-auto h-[50rem] pr-2">
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
        </div>
      </div>

      <TodoDetails />
    </main>
  );
}

export default App;
