import { useNavigate } from "react-router-dom";
import "../Styles/Search.css";

/**
 * Renders a category button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.category - The category name.
 * @returns {JSX.Element} The rendered category button.
 */
export default function CategoryButton({ category }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/services/category/" + category);
      }}
      className="text-[15px] w-[125px] p-[15px] h-[125px] m-[15px] rounded-xl backgroundBlue font-bold"
    >
      <p>{category}</p>
    </button>
  );
}
