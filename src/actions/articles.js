export const CREATE_ARTICLE_INITIAL = 'CREATE_ARTICLE_INITIAL';
export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

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

export function createArticle(articleData) {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
                addArticle(title: "${articleData.title}", content: "${
        articleData.content
      }"){
                  id,
                  title,
                  content
                }
              }`,
    }),
    credentials: 'include',
  };

  return dispatch => {
    // We dispatch requestCreateArticle to kickoff the call to the API
    dispatch(requestCreateArticle(articleData));
    if(process.env.NODE_ENV === "development") {
    return fetch('/graphql', config)
      .then(response => response.json().then(article => ({ article, response })))
      .then(({ article, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createArticleError(article.message));
          return Promise.reject(article);
        }
        // Dispatch the success action
        dispatch(createArticleSuccess(article));
        setTimeout(() => {
          dispatch(createArticleInitial());
        }, 5000);
        return Promise.resolve(article);
      })
      .catch(err => console.error('Error: ', err));
    } else {
      dispatch(createArticleError(''));
      return Promise.reject();
    }
  };
}

export function fetchArticles() {
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{articles{id,title,content,updatedAt}}',
    }),
    credentials: 'include',
  };

  return dispatch => {
    dispatch(requestFetchArticles());

    return fetch('/graphql', config)
      .then(response =>
        response.json().then(responseJson => ({
          articles: responseJson.data.articles,
          responseJson,
        })),
      )
      .then(({ articles, responseJson }) => {
        if (!responseJson.data.articles) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchArticlesError(articles.message));
          return Promise.reject(articles);
        }
        // Dispatch the success action
        dispatch(fetchArticlesSuccess(articles));
        return Promise.resolve(articles);
      })
      .catch(err => console.error('Error: ', err));
  };
}
