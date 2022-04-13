import { useContext, useState } from "react";
import Link from "next/link";
import AppContext from "../../context/AppContext";
import ReactAutosuggest from "react-autosuggest";
import theme from "./autosuggest.module.css";

const Autosuggest = ({ userName = "" }) => {
  const { data } = useContext(AppContext);
  const [users, setUsers] = useState(Object.keys(data.users));
  const [inputValue, setInputValue] = useState(userName);

  return (
    <div className="flex relative mb-4">
      <label className="w-full inline-flex">
        <ReactAutosuggest
          theme={theme}
          renderSuggestion={(userName) => (
            <Link href={`/user/${userName}`}>{userName}</Link>
          )}
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
      </label>
    </div>
  );
};

export default Autosuggest;
