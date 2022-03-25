// @flow
import React, { useContext } from "react";
import { eligibleTitles } from "../constants";
import type { MilestoneMap } from "../constants";
import AppContext from "../context/AppContext";
type Props = {
  milestoneByTrack: MilestoneMap,
  currentTitle: string,
  setTitleFn: (string) => void,
};

const TitleSelector = (props: Props) => {
  const { data } = useContext(AppContext);
  const { trackIds } = data;

  const titles = eligibleTitles(props.milestoneByTrack, trackIds);
  return (
    <select
      value={props.currentTitle}
      onChange={(e) => props.setTitleFn(e.target.value)}
    >
      <style jsx>{`
        select {
          font-size: 20px;
          line-height: 20px;
          margin-bottom: 20px;
          min-width: 300px;
        }
      `}</style>
      {titles.map((title) => (
        <option key={title}>{title}</option>
      ))}
    </select>
  );
};

export default TitleSelector;
