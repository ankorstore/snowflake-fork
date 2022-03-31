// import { useContext } from "react";
import SnowflakeApp from "../../components/SnowflakeApp";
// import AppContext from "../../context/AppContext";
import RouteGuard from "../../guards/RouteGuard";

import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import Link from "next/link";
// import RouteGuard from "../guards/RouteGuard";
import Profile from "../../components/Profile";
import Autosuggest from "react-autosuggest";

const UsersPage = () => {
  const { data, loading } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <RouteGuard>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <Profile />
          <div className="flex items-center justify-center">
            <div className="flex border-2 rounded">
              <Autosuggest
                renderSuggestion={(userName) => (
                  <Link href={`/user/${userName}`}>{userName}</Link>
                )}
                alwaysRenderSuggestions={true}
                inputProps={{
                  placeholder: "Type a user name",
                  type: "search",
                  value: inputValue,
                  className: "px-4 py-2 w-80",
                  onChange: (event, { newValue }) => setInputValue(newValue),
                }}
                suggestions={users}
                onSuggestionsFetchRequested={({ value }) => {
                  const usersToDisplay = Object.keys(data.users);

                  setUsers(
                    usersToDisplay.filter((user) => {
                      return (
                        user.toLowerCase().indexOf(value.toLowerCase()) !== -1
                      );
                    })
                  );
                }}
                onSuggestionsClearRequested={() => {
                  const usersToDisplay = Object.keys(data.users);
                  setUsers(usersToDisplay);
                }}
                getSuggestionValue={(value) => value}
              />
              {/* <button className="flex items-center justify-center px-4 border-l">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      )}
    </RouteGuard>
  );
};

const UserPage = () => {
  const { loading } = useContext(AppContext);

  return (
    <RouteGuard>
      <div className="flex">
        <UsersPage />
        <div>{loading ? "Loading..." : <SnowflakeApp />}</div>
      </div>
    </RouteGuard>
  );
};

export default UserPage;
