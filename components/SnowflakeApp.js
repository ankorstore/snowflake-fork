// @flow

import TrackSelector from "../components/TrackSelector";
import NightingaleChart from "../components/NightingaleChart";
import KeyboardListener from "../components/KeyboardListener";
import Track from "../components/Track";
import Logo from "./Logo";
import LevelThermometer from "../components/LevelThermometer";
import {
  eligibleTitles,
  trackIds,
  milestones,
  milestoneToPoints,
} from "../constants";
import PointSummaries from "../components/PointSummaries";
import type { Milestone, MilestoneMap, TrackId } from "../constants";
import React, { useState, useEffect } from "react";
import TitleSelector from "../components/TitleSelector";

type SnowflakeAppState = {
  milestoneByTrack: MilestoneMap,
  name: string,
  title: string,
  focusedTrackId: TrackId,
};

const hashToState = (hash: String): ?SnowflakeAppState => {
  if (!hash) return null;
  const result = defaultState();
  const hashValues = hash.split("#")[1].split(",");
  if (!hashValues) return null;
  trackIds.forEach((trackId, i) => {
    result.milestoneByTrack[trackId] = coerceMilestone(Number(hashValues[i]));
  });
  if (hashValues[16]) result.name = decodeURI(hashValues[16]);
  if (hashValues[17]) result.title = decodeURI(hashValues[17]);
  return result;
};

const coerceMilestone = (value: number): Milestone => {
  // HACK I know this is goofy but i'm dealing with flow typing
  switch (value) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    default:
      return 0;
  }
};

const emptyState = (): SnowflakeAppState => {
  return {
    name: "",
    title: "",
    milestoneByTrack: {
      MOBILE: 0,
      WEB_CLIENT: 0,
      FOUNDATIONS: 0,
      SERVERS: 0,
      PROJECT_MANAGEMENT: 0,
      COMMUNICATION: 0,
      CRAFT: 0,
      INITIATIVE: 0,
      CAREER_DEVELOPMENT: 0,
      ORG_DESIGN: 0,
      WELLBEING: 0,
      ACCOMPLISHMENT: 0,
      MENTORSHIP: 0,
      EVANGELISM: 0,
      RECRUITING: 0,
      COMMUNITY: 0,
    },
    focusedTrackId: "MOBILE",
  };
};

const defaultState = (): SnowflakeAppState => {
  return {
    name: "Cersei Lannister",
    title: "Staff Engineer",
    milestoneByTrack: {
      MOBILE: 1,
      WEB_CLIENT: 2,
      FOUNDATIONS: 3,
      SERVERS: 2,
      PROJECT_MANAGEMENT: 4,
      COMMUNICATION: 1,
      CRAFT: 1,
      INITIATIVE: 4,
      CAREER_DEVELOPMENT: 3,
      ORG_DESIGN: 2,
      WELLBEING: 0,
      ACCOMPLISHMENT: 4,
      MENTORSHIP: 2,
      EVANGELISM: 2,
      RECRUITING: 3,
      COMMUNITY: 0,
    },
    focusedTrackId: "MOBILE",
  };
};

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.milestoneByTrack) return null;
  const values = trackIds
    .map((trackId) => state.milestoneByTrack[trackId])
    .concat(encodeURI(state.name), encodeURI(state.title));
  return values.join(",");
};

type Props = {};

const SnowflakeApp = (props: Props) => {
  const [state, setState] = useState(emptyState());

  useEffect(() => {
    const state = hashToState(window.location.hash);

    if (state) {
      setState(state);
    } else {
      setState(defaultState());
    }
  }, []);

  useEffect(() => {
    const hash = stateToHash(state);
    if (hash) window.location.replace(`#${hash}`);
  }, [state]);

  const handleTrackMilestoneChange = (
    trackId: TrackId,
    milestone: Milestone
  ) => {
    const milestoneByTrack = state.milestoneByTrack;
    milestoneByTrack[trackId] = milestone;

    const titles = eligibleTitles(milestoneByTrack);
    const title = titles.indexOf(state.title) === -1 ? titles[0] : state.title;

    setState({ ...state, milestoneByTrack, focusedTrackId: trackId, title });
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
    let prevMilestone = state.milestoneByTrack[state.focusedTrackId];
    let milestone = prevMilestone + delta;
    if (milestone < 0) milestone = 0;
    if (milestone > 5) milestone = 5;

    handleTrackMilestoneChange(
      state.focusedTrackId,
      ((milestone: any): Milestone)
    );
  };

  const setTitle = (title: string) => {
    let titles = eligibleTitles(state.milestoneByTrack);
    title = titles.indexOf(title) == -1 ? titles[0] : title;
    setState({ ...state, title });
  };

  return (
    <main>
      <style jsx global>{`
        body {
          font-family: Helvetica;
        }
        main {
          width: 960px;
          margin: 0 auto;
        }
        .name-input {
          border: none;
          display: block;
          border-bottom: 2px solid #fff;
          font-size: 30px;
          line-height: 40px;
          font-weight: bold;
          width: 380px;
          margin-bottom: 10px;
        }
        .name-input:hover,
        .name-input:focus {
          border-bottom: 2px solid #ccc;
          outline: 0;
        }
        a {
          color: #888;
          text-decoration: none;
        }
      `}</style>
      <div style={{ margin: "19px auto 0", width: 142 }}>
        <Logo />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <form>
            <input
              type="text"
              className="name-input"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="Name"
            />
            <TitleSelector
              milestoneByTrack={state.milestoneByTrack}
              currentTitle={state.title}
              setTitleFn={(title) => setTitle(title)}
            />
          </form>
          <PointSummaries milestoneByTrack={state.milestoneByTrack} />
          <LevelThermometer milestoneByTrack={state.milestoneByTrack} />
        </div>
        <div style={{ flex: 0 }}>
          <NightingaleChart
            milestoneByTrack={state.milestoneByTrack}
            focusedTrackId={state.focusedTrackId}
            handleTrackMilestoneChangeFn={(track, milestone) =>
              handleTrackMilestoneChange(track, milestone)
            }
          />
        </div>
      </div>
      <TrackSelector
        milestoneByTrack={state.milestoneByTrack}
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
        milestoneByTrack={state.milestoneByTrack}
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
