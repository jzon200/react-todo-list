import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { addTodoRequest } from "../todoSlice";
import getDefaultDueDate from "../../../util/getDefaultDueDate";

export default function NewTodoInput() {
  // const userId = useAppSelector((state) => state.users.currentUser?.id);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<Todo>({
    defaultValues: {
      targetDate: getDefaultDueDate(),
      userId: 1,
    },
  });

  return (
    <form
      className="relative"
      onSubmit={handleSubmit((data) => {
        dispatch(addTodoRequest(data));
        reset();
      })}>
      <input
        className="w-full p-2 rounded-lg focus:outline focus:outline-blue-600 focus:bg-transparent"
        type="text"
        placeholder="+ Add New to To-do"
        {...register("title", { required: true })}
      />

      <input
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-transparent"
        type="datetime-local"
        {...register("targetDate", { required: true })}
      />
    </form>
  );
}
