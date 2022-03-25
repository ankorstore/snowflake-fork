import SnowflakeApp from "../../components/SnowflakeApp";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

const UserPage = () => {
  const { loading } = useContext(AppContext);

  return <div>{loading ? "Loading..." : <SnowflakeApp />}</div>;
};

export default UserPage;
