import { StudyLevel } from 'src/app/models';

export interface StudyLevelResponse {
  code: string;
  message: string;
  data: StudyLevel[];
}
