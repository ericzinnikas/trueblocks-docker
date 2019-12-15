import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const BEGIN = 'caches_/BEGIN';
const SUCCESS = 'caches_/SUCCESS';
const FAILURE = 'caches_/FAILURE';

//----------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  //console.log('caches_', action, state);
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const Caches_reducer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'ping', '')
      .then(async (res) => {
        let json = await res.json();
        dispatch({
          type: SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: FAILURE,
          e
        });
      });
  };
};