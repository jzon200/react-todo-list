import { useState } from "react";

export default function NewTodoInput() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        className="w-full p-2 rounded-lg focus:outline focus:outline-blue-600 focus:bg-transparent"
        type="text"
        placeholder="+ Add New to “To-do List”"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {isFocused && (
        <input
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-transparent"
          type="datetime-local"
          id="meeting-time"
          name="meeting-time"
          // defaultValue={new Date().toISOString().substring(0, 16)}
          placeholder="Enter Date and Time"
        />
      )}
    </div>
  );
}
