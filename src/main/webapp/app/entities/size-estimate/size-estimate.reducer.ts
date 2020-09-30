import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISizeEstimate, defaultValue } from 'app/shared/model/size-estimate.model';

export const ACTION_TYPES = {
  FETCH_SIZEESTIMATE_LIST: 'sizeEstimate/FETCH_SIZEESTIMATE_LIST',
  FETCH_SIZEESTIMATE: 'sizeEstimate/FETCH_SIZEESTIMATE',
  CREATE_SIZEESTIMATE: 'sizeEstimate/CREATE_SIZEESTIMATE',
  UPDATE_SIZEESTIMATE: 'sizeEstimate/UPDATE_SIZEESTIMATE',
  DELETE_SIZEESTIMATE: 'sizeEstimate/DELETE_SIZEESTIMATE',
  RESET: 'sizeEstimate/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISizeEstimate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SizeEstimateState = Readonly<typeof initialState>;

// Reducer

export default (state: SizeEstimateState = initialState, action): SizeEstimateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SIZEESTIMATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SIZEESTIMATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SIZEESTIMATE):
    case REQUEST(ACTION_TYPES.UPDATE_SIZEESTIMATE):
    case REQUEST(ACTION_TYPES.DELETE_SIZEESTIMATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SIZEESTIMATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SIZEESTIMATE):
    case FAILURE(ACTION_TYPES.CREATE_SIZEESTIMATE):
    case FAILURE(ACTION_TYPES.UPDATE_SIZEESTIMATE):
    case FAILURE(ACTION_TYPES.DELETE_SIZEESTIMATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SIZEESTIMATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SIZEESTIMATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SIZEESTIMATE):
    case SUCCESS(ACTION_TYPES.UPDATE_SIZEESTIMATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SIZEESTIMATE):
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

const apiUrl = 'api/size-estimates';

// Actions

export const getEntities: ICrudGetAllAction<ISizeEstimate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SIZEESTIMATE_LIST,
  payload: axios.get<ISizeEstimate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISizeEstimate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SIZEESTIMATE,
    payload: axios.get<ISizeEstimate>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISizeEstimate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SIZEESTIMATE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISizeEstimate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SIZEESTIMATE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISizeEstimate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SIZEESTIMATE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
