import { IUser } from 'app/shared/model/user.model';

export interface IBoard {
  id?: number;
  name?: string;
  type?: string;
  owner?: IUser;
}

export const defaultValue: Readonly<IBoard> = {};
