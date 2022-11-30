import { Subject } from 'src/app/models';

export interface SubjectResponse {
  code: string;
  message: string;
  data: Subject[];
}
