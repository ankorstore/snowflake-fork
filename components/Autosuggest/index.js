import { useContext, useState } from "react";
import Link from "next/link";
import RouteGuard from "../../guards/RouteGuard";
import AppContext from "../../context/AppContext";
import SnowflakeApp from "../../components/SnowflakeApp";
import Profile from "../../components/Profile";
import ReactAutosuggest from "react-autosuggest";
import theme from "./autosuggest.module.css";

const Autosuggest = () => {
  const { data, loading } = useContext(AppContext);
  const [users, setUsers] = useState(Object.keys(data.users));
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex relative min-w-[260px] px-2">
      <label className="w-full h-8 inline-flex rounded-default border px-2">
        <span className="h-full flex items-center px-1">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
          >
            <path d="M8.87 8.16l3.25 3.25-.7.71-3.26-3.25a5 5 0 1 1 .7-.7zM5 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
          </svg>
        </span>
        <ReactAutosuggest
          theme={theme}
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
          onSuggestionSelected={() => {
            console.log("onSuggestionSelected");
          }}
          alwaysRenderSuggestions={true}
        />
      </label>
    </div>
  );
};

export default Autosuggest;
