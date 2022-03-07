import { User } from 'src/auth/modules/user.interface';

export interface Message {
  id?: number;
  message?: string;
  date?: Date;
  recipient?: User;
  author?: User;
}
