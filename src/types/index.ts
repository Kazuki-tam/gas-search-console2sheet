export type requestOptionsType = {
  method: "post";
  contentType: "application/json";
  payload: string;
  muteHttpExceptions: boolean;
  headers: { Authorization: string };
};
