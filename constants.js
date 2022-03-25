// @flow

// TODO: remove once data is taken from Google Sheets
export type TrackId = string;
export type Milestone = 0 | 1 | 2 | 3 | 4 | 5;
export type MilestoneMap = {
  [key: TrackId]: Milestone,
};
export const milestones = [0, 1, 2, 3, 4, 5];

export const CATEGORIES = {
  BUILDING: "Building",
  EXECUTING: "Executing",
  SUPPORTING: "Supporting",
  STRENGTHENING: "Strengthening",
};

export const milestoneToPoints = (milestone: Milestone): number => {
  switch (milestone) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 6;
    case 4:
      return 12;
    case 5:
      return 20;
    default:
      return 0;
  }
};

export const pointsToLevels = {
  "0": "1.1",
  "5": "1.2",
  "11": "1.3",
  "17": "2.1",
  "23": "2.2",
  "29": "2.3",
  "36": "3.1",
  "43": "3.2",
  "50": "3.3",
  "58": "4.1",
  "66": "4.2",
  "74": "4.3",
  "90": "5.1",
  "110": "5.2",
  "135": "5.3",
};

export const maxLevel = 135;

export type Track = {
  displayName: string,
  category: string, // TK categoryId type?
  description: string,
  milestones: {
    summary: string,
    signals: string[],
    examples: string[],
  }[],
};

export const categoryPointsFromMilestoneMap = (
  milestoneMap: MilestoneMap,
  tracks: Tracks
) => {
  const trackIds: TrackId[] = Object.keys(tracks);
  const categoryIds: Set<string> = trackIds.reduce((set, trackId) => {
    set.add(tracks[trackId].category);
    return set;
  }, new Set());

  let pointsByCategory = new Map();
  trackIds.forEach((trackId) => {
    const milestone = milestoneMap[trackId];
    const categoryId = tracks[trackId].category;
    let currentPoints = pointsByCategory.get(categoryId) || 0;
    pointsByCategory.set(
      categoryId,
      currentPoints + milestoneToPoints(milestone)
    );
  });

  return Array.from(categoryIds.values()).map((categoryId) => {
    const points = pointsByCategory.get(categoryId) || 0;

    return { categoryId, points };
  });
};

export const totalPointsFromMilestoneMap = (
  milestoneMap: MilestoneMap,
  trackIds: TrackId[]
): number =>
  trackIds
    .map((trackId) => milestoneToPoints(milestoneMap[trackId]))
    .reduce((sum, addend) => sum + addend, 0);

// TODO: Get from server
export const titles = [
  { label: "Engineer I", minPoints: 0, maxPoints: 16 },
  { label: "Engineer II", minPoints: 17, maxPoints: 35 },
  { label: "Senior Engineer", minPoints: 36, maxPoints: 57 },
  { label: "Group Lead", minPoints: 36, maxPoints: 57 },
  { label: "Staff Engineer", minPoints: 58, maxPoints: 89 },
  { label: "Senior Group Lead", minPoints: 58, maxPoints: 89 },
  { label: "Principal Engineer", minPoints: 90 },
  { label: "Director of Engineering", minPoints: 90 },
];

export const eligibleTitles = (
  milestoneMap: MilestoneMap,
  trackIds
): string[] => {
  const totalPoints = totalPointsFromMilestoneMap(milestoneMap, trackIds);

  return titles
    .filter(
      (title) =>
        (title.minPoints === undefined || totalPoints >= title.minPoints) &&
        (title.maxPoints === undefined || totalPoints <= title.maxPoints)
    )
    .map((title) => title.label);
};
