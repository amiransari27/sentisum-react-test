import axios from 'axios';

export const FETCH_STRINGS_BEGIN = 'FETCH_STRINGS_BEGIN';
export const FETCH_STRINGS_SUCCESS = 'FETCH_STRINGS_SUCCESS';
export const FETCH_STRINGS_FAILURE = 'FETCH_STRINGS_FAILURE';
export const SET_STRINGS_ITEMS = 'SET_STRINGS_ITEMS';

export const fetchStringsBegin = () => ({
  type: FETCH_STRINGS_BEGIN
});

export const fetchStringsSuccess = stringsData => ({
  type: FETCH_STRINGS_SUCCESS,
  payload: { stringsData }
});

export const fetchStringsFailure = error => ({
  type: FETCH_STRINGS_FAILURE,
  payload: { error }
});

export const setStringsItems = stringsItems => ({
  type: SET_STRINGS_ITEMS,
  payload: { stringsItems }
});

export function fetchStrings(terms) {
  return async dispatch => {
    dispatch(fetchStringsBegin());

    const requestUrl = `https://api-demo.sentisum.com/api/v1/comments/textsearch`;
    const requestParam = {
      source: 'dhl-parcel',
      terms: terms,
      sentiment: 'all',
      apiKey: 'AU_WtVnh93Tixe_CNZqp'
    };
    const { data } = await axios.get(requestUrl, { params: requestParam });
    if (data.error) {
      dispatch(fetchStringsFailure(data.error))
    } else {
      const {
        topFeatures,
        sentimentDistribution,
        sentences
      } = data
      const result = {
        topFeatures,
        sentimentDistribution,
        sentences: [],
      }
      for (let sentence in sentences) {
        result.sentences.push({ id: sentences[sentence], value: sentence })
      }

      dispatch(fetchStringsSuccess(result));
    }
  };
}

export function getStringsChunk(page) {
  return async (dispatch, getState) => {
    const { strings } = getState()
    const result = {
      items: strings.sentences.slice((page-1) * 30, page * 30),
      page: page,
    }
    dispatch(setStringsItems(result));
  };
}
