import { useContext } from "react";
import AppContext from "../context/AppContext";
import Link from "next/link";
import RouteGuard from "../guards/RouteGuard";

const UsersPage = ({ levels, milestones }) => {
  const { data, loading } = useContext(AppContext);

  return (
    <RouteGuard>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {Object.keys(data.users).map((userName) => (
            <li key={userName}>
              <Link href={`/user/${userName}`}>{userName}</Link>
            </li>
          ))}
        </ul>
      )}
    </RouteGuard>
  );
};

export default UsersPage;
