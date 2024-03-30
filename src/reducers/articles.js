import {
  CREATE_ARTICLE_INITIAL,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
} from '../actions/articles';

export default function articles(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case CREATE_ARTICLE_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Article created successfully',
      });
    case CREATE_ARTICLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          'Due to security reasons articles creation is closed in demo version. Please setup locally to test',
      });
    case FETCH_ARTICLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        articles: action.articles,
      });
    case FETCH_ARTICLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Something wrong happened. Please come back later',
      });
    default:
      return state;
  }
}
