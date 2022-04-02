//@flow
import { google } from "googleapis";
import { CATEGORIES } from "../../constants";
// TODO: Share type between server and client
export type User = {
  userName: string,
  level: string,
  totalScore: number,
  milestoneByTrack: {
    [trackName: string]: number,
  },
};

const parseLevels = (levels) => {
  return levels.reduce((state, data) => {
    const [points, level, pointsToNextLevel] = data;

    state[points] = {
      points,
      level,
      pointsToNextLevel,
    };

    return state;
  }, {});
};

const parseMilestoneData = (milestoneData) => {
  return milestoneData.reduce((state, data) => {
    const [milestone, points, cumulative] = data;

    state[milestone] = {
      milestone,
      points,
      cumulative,
    };

    return state;
  }, {});
};

const parseTracks = (categories) => {
  const tracks = {};

  categories.forEach((category) => {
    const [categoryName, categoryData] = category;
    const [header, subHeader, ...milestonesScores] = categoryData;

    const trackNames = header.filter((trackName) => trackName !== "");
    const trackDescriptions = subHeader.filter(
      (trackDescription) => trackDescription !== ""
    );

    trackNames.forEach((trackName, index) => {
      tracks[trackName] = {
        category: categoryName,
        displayName: trackName,
        trackDescription: trackDescriptions[index],
        milestones: [],
      };
    });

    milestonesScores.forEach((milestone, milestoneIndex, array) => {
      if (milestoneIndex % 5 === 0) {
        const [score, ...summaries] = milestone;

        const examples1 = array[milestoneIndex + 2];
        const examples2 = array[milestoneIndex + 3];
        const examples3 = array[milestoneIndex + 4];

        summaries.forEach((summary, summaryIndex) => {
          if (summaryIndex % 3 === 0) {
            const trackName = trackNames[summaryIndex / 3];
            const exampleIndex = summaryIndex + 1;
            const signalIndex = summaryIndex + 2;

            tracks[trackName].milestones.push({
              score,
              summary,
              examples: [
                examples1[exampleIndex],
                examples2[exampleIndex],
                examples3[exampleIndex],
              ],
              signals: [
                examples1[signalIndex],
                examples2[signalIndex],
                examples3[signalIndex],
              ],
            });
          }
        });
      }
    });
  });

  return tracks;
};

const parseUsers = (
  usersData,
  categoryTracks
): {
  [userName: string]: User,
} => {
  return usersData.reduce((userState, data) => {
    const [userName, level, totalScore, ...userScores] = data;
    const milestoneByTrack = userScores.reduce((scoreState, score, index) => {
      if (score !== "") {
        const trackName = categoryTracks[index];
        scoreState[trackName] = parseInt(score, 10);
      }

      return scoreState;
    }, {});

    userState[userName] = {
      userName,
      level,
      totalScore: parseInt(totalScore, 10),
      milestoneByTrack,
    };

    return userState;
  }, {});
};

export default async function handler(req, res) {
  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Ranges of the sheet to read
    const userProgressionRange = `Progression!A4:V`;
    const categoryRange = `Progression!D1:V3`;
    const levelRange = `Notes!G10:I`;
    const milestoneRange = `Notes!B10:D`;

    // Range of categories sheets
    const buildingMilestonesRange = `Building!B8:V`;
    const executionMilestonesRange = `Executing!B8:P`;
    const supportingMilestonesRange = `Supporting!B8:P`;
    const strengtheningMilestonesRange = `Strengthening!B8:P`;

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.SHEET_ID,
      ranges: [
        userProgressionRange,
        categoryRange,
        levelRange,
        milestoneRange,
        buildingMilestonesRange,
        executionMilestonesRange,
        supportingMilestonesRange,
        strengtheningMilestonesRange,
      ],
      majorDimension: "ROWS",
    });

    const [
      userProgressionData,
      categoryData,
      levelsData,
      milestoneData,
      buildingMilestonesData,
      executionMilestonesData,
      supportingMilestonesData,
      strengtheningMilestonesData,
    ] = response.data.valueRanges;

    /**
     * Generate tracks from the category sheet
     */
    const tracks = parseTracks([
      [CATEGORIES.BUILDING, buildingMilestonesData.values],
      [CATEGORIES.EXECUTING, executionMilestonesData.values],
      [CATEGORIES.SUPPORTING, supportingMilestonesData.values],
      [CATEGORIES.STRENGTHENING, strengtheningMilestonesData.values],
    ]);

    /**
     * Users score
     */
    const categoryTracks = categoryData.values[1];
    const users = parseUsers(userProgressionData.values, categoryTracks);

    /**
     * Levels
     */
    const levels = parseLevels(levelsData.values);

    /**
     * Milestones points
     */
    const milestones = parseMilestoneData(milestoneData.values);

    res
      .status(200)
      .json(JSON.parse(JSON.stringify({ tracks, users, levels, milestones })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
