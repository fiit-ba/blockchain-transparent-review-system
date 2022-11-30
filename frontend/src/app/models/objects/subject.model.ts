import { StudyLevel, SubjectType } from 'src/app/models';

export interface Subject {
  id: number;
  name: string;
  full_name: string;
  tags: String[];
  study_level_id: number;
  subject_type_id: number;

  study_level: StudyLevel | any;
  subject_type: SubjectType | any;
}
