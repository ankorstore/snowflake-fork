import { useContext } from "react";
import RouteGuard from "../../guards/RouteGuard";
import AppContext from "../../context/AppContext";
import SnowflakeApp from "../../components/SnowflakeApp";

const UserPage = () => {
  const { loading } = useContext(AppContext);

  return (
    <RouteGuard>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-start pt-2 gap-2">
          <SnowflakeApp />
        </div>
      )}
    </RouteGuard>
  );
};

export default UserPage;
