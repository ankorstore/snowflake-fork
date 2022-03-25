import React, { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";
import { getGoogleSheetData } from "../services/api.service";
import * as d3 from "d3";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const isUser = session?.user;

  const fetchData = async () => {
    // TODO: Only auth users can see this data
    if (!isUser) {
      return;
    }

    setLoading(true);
    const sheetData = await getGoogleSheetData();
    const { tracks, milestones } = sheetData;
    const trackIds = Object.keys(tracks);
    const milestoneByTrack = milestones;

    const categoryIds = trackIds.reduce((set, trackId) => {
      set.add(tracks[trackId].category);
      return set;
    }, new Set());

    const categoryColorScale = d3
      .scaleOrdinal()
      .domain(categoryIds)
      .range(["#00abc2", "#428af6", "#e1439f", "#e54552"]);

    setData({
      ...sheetData,
      trackIds,
      categoryIds,
      milestoneByTrack,
      categoryColorScale,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isUser]);

  return (
    <AppContext.Provider value={{ data, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
