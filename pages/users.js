import { useContext } from "react";
import AppContext from "../context/AppContext";
import Link from "next/link";

const UsersPage = ({ levels, milestones }) => {
  const { data, loading } = useContext(AppContext);

  if (loading) {
    return "Loading...";
  }

  return (
    <ul>
      {Object.keys(data.users).map((userName) => (
        <li key={userName}>
          <Link href={`/user/${userName}`}>{userName}</Link>
        </li>
      ))}
    </ul>
  );
};

export default UsersPage;
