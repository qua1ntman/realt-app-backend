import { User } from 'src/auth/modules/user.interface';

export interface Ad {
  id?: number;
  pic?: string;
  date?: Date;
  title?: string;
  price?: number;
  location?: string;
  description?: string;
  author?: User;
}
