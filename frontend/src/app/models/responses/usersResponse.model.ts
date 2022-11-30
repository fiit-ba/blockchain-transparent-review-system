import { User } from 'src/app/models';

export interface UsersResponse {
  code: string;
  message: string;
  data: User[];
}
