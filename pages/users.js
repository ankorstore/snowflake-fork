import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import Link from "next/link";
import RouteGuard from "../guards/RouteGuard";
import Profile from "../components/Profile";
import Autosuggest from "react-autosuggest";

const UsersPage = ({ levels, milestones }) => {
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
          <Autosuggest
            renderSuggestion={(userName) => (
              <Link href={`/user/${userName}`}>{userName}</Link>
            )}
            alwaysRenderSuggestions={true}
            inputProps={{
              placeholder: "Type a user name",
              type: "search",
              value: inputValue,
              onChange: (event, { newValue }) => setInputValue(newValue),
            }}
            suggestions={users}
            onSuggestionsFetchRequested={({ value }) => {
              const usersToDisplay = Object.keys(data.users);

              setUsers(
                usersToDisplay.filter((user) => {
                  return user.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                })
              );
            }}
            onSuggestionsClearRequested={() => {
              const usersToDisplay = Object.keys(data.users);
              setUsers(usersToDisplay);
            }}
            getSuggestionValue={(value) => value}
          />
        </div>
      )}
    </RouteGuard>
  );
};

export default UsersPage;
