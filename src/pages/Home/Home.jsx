import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";

function Home() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="px-12 py-12">
      <h1 className="text-2xl font-normal text-black mb-4">
        Welcome back{user?.name ? `, ${user.name}` : ""}!
      </h1>
      <p className="text-gray-600">
        You're logged in and ready to scan your YouTube channel for broken affiliate links.
      </p>
    </div>
  );
}

export default Home;
