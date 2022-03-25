import { useContext } from "react";
import SnowflakeApp from "../../components/SnowflakeApp";
import AppContext from "../../context/AppContext";
import RouteGuard from "../../guards/RouteGuard";

const UserPage = () => {
  const { loading } = useContext(AppContext);

  return (
    <RouteGuard>
      <div>{loading ? "Loading..." : <SnowflakeApp />}</div>
    </RouteGuard>
  );
};

export default UserPage;
