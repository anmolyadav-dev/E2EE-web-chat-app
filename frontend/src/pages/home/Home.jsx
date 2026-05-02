import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1E1F22]">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
