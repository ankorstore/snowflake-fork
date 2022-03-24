export const getGoogleSheetData = async (sheetId, sheetName) =>
  fetch("/api/google-sheet").then((res) => res.json());
