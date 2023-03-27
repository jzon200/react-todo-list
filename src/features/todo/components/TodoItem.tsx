type Props = {
  id: string;
  title: string;
};

export default function TodoItem({ id, title }: Props) {
  return (
    <li className="flex items-center gap-2">
      <input type="checkbox" name={id} id={id} className="w-5 h-5" />
      <label htmlFor={id}>{title}</label>
    </li>
  );
}
