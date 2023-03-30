import { HiSortDescending } from "react-icons/hi";
import NewTodoInput from "./features/todo/components/NewTodoInput";
import TodoDetails from "./features/todo/components/TodoDetails";
import TodoListContent from "./features/todo/components/TodoListContent";

function App() {
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
        <TodoListContent />
      </div>

      <TodoDetails />
    </main>
  );
}

export default App;
