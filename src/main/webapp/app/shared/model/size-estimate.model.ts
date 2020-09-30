import { IUser } from 'app/shared/model/user.model';
import { IBoard } from 'app/shared/model/board.model';

export interface ISizeEstimate {
  id?: number;
  size?: string;
  estimate?: number;
  user?: IUser;
  board?: IBoard;
}

export const defaultValue: Readonly<ISizeEstimate> = {};
