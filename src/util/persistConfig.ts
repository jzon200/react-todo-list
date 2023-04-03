import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["todoList", "selectedTodo"],
};

export default persistConfig;
