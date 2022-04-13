// @flow
import TrackSelector from "../components/TrackSelector";
import NightingaleChart from "../components/NightingaleChart";
import KeyboardListener from "../components/KeyboardListener";
import Track from "../components/Track";
import LevelThermometer from "../components/LevelThermometer";
import { eligibleTitles } from "../constants";
import PointSummaries from "../components/PointSummaries";
import type { Milestone, MilestoneMap, TrackId } from "../constants";
import React, { useState, useContext } from "react";
import TitleSelector from "../components/TitleSelector";
import type { User } from "../pages/user/[id].js";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import Autosuggest from "../components/Autosuggest";
type SnowflakeAppState = {
  milestoneByTrack: MilestoneMap,
  name: string,
  title: string,
  focusedTrackId: TrackId,
};

const defaultState = (userName, milestoneByTrack): SnowflakeAppState => {
  return {
    name: userName,
    title: "Staff Engineer",
    milestoneByTrack,
    focusedTrackId: "Mobile",
  };
};

const getFirstUser = (users): User => {
  return users[Object.keys(users)[0]];
};

const SnowflakeApp = () => {
  const [state, setState] = useState(defaultState(userName, milestoneByTrack));
  const router = useRouter();
  const { data } = useContext(AppContext);
  const { tracks, trackIds, users } = data;
  const { id } = router.query;
  const user = users[id] || getFirstUser(users);
  const { userName, milestoneByTrack } = user;

  const handleTrackMilestoneChange = (
    trackId: TrackId,
    milestone: Milestone
  ) => {
    milestoneByTrack[trackId] = milestone;

    const titles = eligibleTitles(milestoneByTrack, trackIds);
    const title = titles.indexOf(state.title) === -1 ? titles[0] : state.title;

    setState({
      ...state,
      milestoneByTrack,
      focusedTrackId: trackId,
      title,
    });
  };

  const shiftFocusedTrack = (delta: number) => {
    let index = trackIds.indexOf(state.focusedTrackId);
    index = (index + delta + trackIds.length) % trackIds.length;
    const focusedTrackId = trackIds[index];
    setState({ ...state, focusedTrackId });
  };

  const setFocusedTrackId = (trackId: TrackId) => {
    let index = trackIds.indexOf(trackId);
    const focusedTrackId = trackIds[index];
    setState({ ...state, focusedTrackId });
  };

  const shiftFocusedTrackMilestoneByDelta = (delta: number) => {
    let prevMilestone = milestoneByTrack[state.focusedTrackId];
    let milestone = prevMilestone + delta;
    if (milestone < 0) milestone = 0;
    if (milestone > 5) milestone = 5;

    handleTrackMilestoneChange(
      state.focusedTrackId,
      ((milestone: any): Milestone)
    );
  };

  const setTitle = (title: string) => {
    let titles = eligibleTitles(milestoneByTrack, trackIds);
    title = titles.indexOf(title) === -1 ? titles[0] : title;
    setState({ ...state, title });
  };

  return (
    <main>
      <style jsx global>{`
        body {
          font-family: Helvetica;
        }
        main {
          margin: 0 auto;
        }
      `}</style>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <form>
            <Autosuggest userName={userName} />
            <TitleSelector
              milestoneByTrack={milestoneByTrack}
              currentTitle={state.title}
              setTitleFn={(title) => setTitle(title)}
            />
          </form>
          <PointSummaries milestoneByTrack={milestoneByTrack} />
          <LevelThermometer
            milestoneByTrack={milestoneByTrack}
            tracks={tracks}
          />
        </div>
        <div style={{ flex: 0 }}>
          <NightingaleChart
            milestoneByTrack={milestoneByTrack}
            focusedTrackId={state.focusedTrackId}
            handleTrackMilestoneChangeFn={(track, milestone) =>
              handleTrackMilestoneChange(track, milestone)
            }
          />
        </div>
      </div>
      <TrackSelector
        milestoneByTrack={milestoneByTrack}
        focusedTrackId={state.focusedTrackId}
        setFocusedTrackIdFn={setFocusedTrackId.bind(this)}
      />
      <KeyboardListener
        selectNextTrackFn={() => shiftFocusedTrack(1)}
        selectPrevTrackFn={() => shiftFocusedTrack(-1)}
        increaseFocusedMilestoneFn={() => shiftFocusedTrackMilestoneByDelta(1)}
        decreaseFocusedMilestoneFn={() => shiftFocusedTrackMilestoneByDelta(-1)}
      />
      <Track
        milestoneByTrack={milestoneByTrack}
        trackId={state.focusedTrackId}
        handleTrackMilestoneChangeFn={(track, milestone) =>
          handleTrackMilestoneChange(track, milestone)
        }
      />
      <div style={{ display: "flex", paddingBottom: "20px" }}>
        <div style={{ flex: 1 }}>
          Made with ❤️ by{" "}
          <a href="https://medium.engineering" target="_blank">
            Medium Eng
          </a>
          . Learn about the{" "}
          <a
            href="https://medium.com/s/engineering-growth-framework"
            target="_blank"
          >
            this version of our growth framework
          </a>{" "}
          and{" "}
          <a
            href="https://medium.engineering/engineering-growth-at-medium-4935b3234d25"
            target="_blank"
          >
            what we do currently
          </a>
          . Get the{" "}
          <a href="https://github.com/Medium/snowflake" target="_blank">
            source code
          </a>
          . Read the{" "}
          <a href="https://medium.com/p/85e078bc15b7" target="_blank">
            terms of service
          </a>
          .
        </div>
      </div>
    </main>
  );
};

export default SnowflakeApp;
