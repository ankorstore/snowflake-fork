import { useContext, useState } from "react";
import Link from "next/link";
import RouteGuard from "../../guards/RouteGuard";
import AppContext from "../../context/AppContext";
import SnowflakeApp from "../../components/SnowflakeApp";
import Autosuggest from "../../components/Autosuggest";

const UserPage = () => {
  const { loading } = useContext(AppContext);

  return (
    <RouteGuard>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-start pt-2 gap-2">
          <Autosuggest />
          <SnowflakeApp />
        </div>
      )}
    </RouteGuard>
  );
};

export default UserPage;
