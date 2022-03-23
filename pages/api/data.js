import { google } from "googleapis";

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

const parseTracks = (categoryNames, categoryTracks, trackDescriptions) => {
  let categoryName = "";

  return categoryTracks.reduce((state, trackName, index) => {
    const newCategoryName = categoryNames[index];
    const trackDescription = trackDescriptions[index];

    if (trackName === "") {
      // Empty string is sign of end of category
      return state;
    }

    if (newCategoryName !== "") {
      // Save a new category name
      categoryName = newCategoryName;
    }

    state[trackName] = {
      displayName: trackName,
      category: categoryName,
      description: trackDescription,
      milestones: {
        // TODO: Get milestones from Google Sheets
      },
    };

    return state;
  }, {});
};

export default async function handler(req, res) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Ranges of the sheet to read
  const userProgressionRange = `Progression!A4:V`;
  const categoryRange = `Progression!D1:V3`;
  const levelRange = `Notes!G10:I`;
  const milestoneRange = `Notes!B10:D`;

  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [userProgressionRange, categoryRange, levelRange, milestoneRange],
    majorDimension: "ROWS",
  });

  const [userProgression, category, levelsData, milestoneData] =
    response.data.valueRanges;

  /**
   * Generate tracks from the category sheet
   */
  const categoryNames = category.values[0];
  const categoryTracks = category.values[1];
  const trackDescriptions = category.values[2];

  const tracks = parseTracks(categoryNames, categoryTracks, trackDescriptions);

  /**
   * Users score
   */
  const users = userProgression.values;

  /**
   * Levels
   */
  const levels = parseLevels(levelsData.values);

  /**
   * Milestones points
   */
  const milestones = parseMilestoneData(milestoneData.values);

  res.status(200).json({
    users: JSON.parse(JSON.stringify(users)),
    tracks: JSON.parse(JSON.stringify(tracks)),
    levels: JSON.parse(JSON.stringify(levels)),
    milestones,
  });
}
