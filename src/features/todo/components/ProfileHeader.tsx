import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-2">
      <FaUserCircle size={24} />
      <div>Edzon</div>
      <FiChevronDown size={24} />
    </div>
  );
}
