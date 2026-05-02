import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto flex items-center justify-end w-full">
      {!loading ? (
        <button 
          onClick={logout}
          className="p-2 rounded-md hover:bg-[#DA373C] hover:text-white text-gray-400 transition-colors"
          title="Log out"
        >
          <BiLogOut className="w-5 h-5" />
        </button>
      ) : (
        <span className="loading loading-spinner loading-sm text-gray-400"></span>
      )}
    </div>
  );
};
export default LogoutButton;
