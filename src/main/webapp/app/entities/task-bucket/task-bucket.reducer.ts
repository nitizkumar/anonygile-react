import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITaskBucket, defaultValue } from 'app/shared/model/task-bucket.model';

export const ACTION_TYPES = {
  FETCH_TASKBUCKET_LIST: 'taskBucket/FETCH_TASKBUCKET_LIST',
  FETCH_TASKBUCKET: 'taskBucket/FETCH_TASKBUCKET',
  CREATE_TASKBUCKET: 'taskBucket/CREATE_TASKBUCKET',
  UPDATE_TASKBUCKET: 'taskBucket/UPDATE_TASKBUCKET',
  DELETE_TASKBUCKET: 'taskBucket/DELETE_TASKBUCKET',
  RESET: 'taskBucket/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITaskBucket>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TaskBucketState = Readonly<typeof initialState>;

// Reducer

export default (state: TaskBucketState = initialState, action): TaskBucketState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TASKBUCKET_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TASKBUCKET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TASKBUCKET):
    case REQUEST(ACTION_TYPES.UPDATE_TASKBUCKET):
    case REQUEST(ACTION_TYPES.DELETE_TASKBUCKET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TASKBUCKET_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TASKBUCKET):
    case FAILURE(ACTION_TYPES.CREATE_TASKBUCKET):
    case FAILURE(ACTION_TYPES.UPDATE_TASKBUCKET):
    case FAILURE(ACTION_TYPES.DELETE_TASKBUCKET):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASKBUCKET_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASKBUCKET):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TASKBUCKET):
    case SUCCESS(ACTION_TYPES.UPDATE_TASKBUCKET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TASKBUCKET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/task-buckets';

// Actions

export const getEntities: ICrudGetAllAction<ITaskBucket> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TASKBUCKET_LIST,
  payload: axios.get<ITaskBucket>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITaskBucket> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TASKBUCKET,
    payload: axios.get<ITaskBucket>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITaskBucket> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TASKBUCKET,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITaskBucket> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TASKBUCKET,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITaskBucket> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TASKBUCKET,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
