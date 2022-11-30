export interface Review {
  uid: string;
  authorID: number;
  authorName: string;
  title: string;
  text: string;
  subjectID: number;
  studyLevelID: number;
  isPublic: boolean;
  created: number;
}
