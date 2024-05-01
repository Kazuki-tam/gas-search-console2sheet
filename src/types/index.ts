export type requestOptionsType = {
  method: "post";
  payload: { inspectionUrl: string; siteUrl: string; languageCode: string };
  muteHttpExceptions: boolean;
  headers: { Authorization: string };
};
