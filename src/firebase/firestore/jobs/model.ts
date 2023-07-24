// Models for Firestore jobs

export interface JobModel {
  id: string;
  title: string;
  description: string;
  start: string;
  skills: [];
}
