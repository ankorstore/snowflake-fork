import React, { useState, useEffect } from "react";
import { getGoogleSheetData } from "../services/api.service";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const sheetData = await getGoogleSheetData();
    setData(sheetData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ data, loading }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
