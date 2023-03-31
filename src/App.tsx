import NewTodoInput from "./features/todo/components/NewTodoInput";
import SortButton from "./features/todo/components/SortButton";
import TodoDetails from "./features/todo/components/TodoDetails";
import TodoListContent from "./features/todo/components/TodoListContent";

function App() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col gap-4 py-4 px-6 col-span-2 lg:col-span-1">
        {/* <ProfileHeader /> */}
        <header>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">To-do</h1>
            <SortButton />
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
