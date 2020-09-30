import { Moment } from 'moment';
import { ITaskBucket } from 'app/shared/model/task-bucket.model';
import { TaskType } from 'app/shared/model/enumerations/task-type.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';

export interface ITask {
  id?: number;
  title?: string;
  type?: TaskType;
  status?: TaskStatus;
  startDate?: string;
  endDate?: string;
  priority?: number;
  size?: string;
  bucket?: ITaskBucket;
}

export const defaultValue: Readonly<ITask> = {};
