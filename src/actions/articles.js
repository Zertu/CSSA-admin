import { get, post, put } from ".";

export const CREATE_ARTICLE_INITIAL = "CREATE_ARTICLE_INITIAL";
export const CREATE_ARTICLE_REQUEST = "CREATE_ARTICLE_REQUEST";
export const CREATE_ARTICLE_SUCCESS = "CREATE_ARTICLE_SUCCESS";
export const CREATE_ARTICLE_FAILURE = "CREATE_ARTICLE_FAILURE";
export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";

function createArticleInitial() {
  return {
    type: CREATE_ARTICLE_INITIAL,
    isFetching: false,
  };
}

function requestCreateArticle(article) {
  return {
    type: CREATE_ARTICLE_REQUEST,
    isFetching: true,
    article,
  };
}

function createArticleSuccess(article) {
  return {
    type: CREATE_ARTICLE_SUCCESS,
    isFetching: false,
    article,
  };
}

function createArticleError(message) {
  return {
    type: CREATE_ARTICLE_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchArticles() {
  return {
    type: FETCH_ARTICLES_REQUEST,
    isFetching: true,
  };
}

function fetchArticlesSuccess(articles) {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    isFetching: false,
    articles,
  };
}

function fetchArticlesError(message) {
  return {
    type: FETCH_ARTICLES_FAILURE,
    isFetching: false,
    message,
  };
}
export function updateArticle(data) {
  put(`articles${data.id}`, data);
}
export function createArticle(articleData) {
  console.log(articleData);
  return async(dispatch) => {
    // We dispatch requestCreateArticle to kickoff the call to the API
    dispatch(requestCreateArticle(articleData));
    const response = await post("articles", articleData)
      
        if (!response) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createArticleError(response.title));
          return Promise.reject('article failed to create');
        }
        // Dispatch the success action
        dispatch(createArticleSuccess('article created successfully'));
        setTimeout(() => {
          dispatch(createArticleInitial());
        }, 5000);
        return Promise.resolve('article created successfully');
  };
}

export function fetchArticles() {
  return async (dispatch) => {
    dispatch(requestFetchArticles());
    const articles = await get("articles");
    if (!articles) {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(fetchArticlesError(articles.message));
      return Promise.reject(articles);
    }
    // Dispatch the success action
    dispatch(fetchArticlesSuccess(articles));
    return Promise.resolve(articles);
  };
}
