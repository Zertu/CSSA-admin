import { get, post, put, deleteReq } from ".";

export const CREATE_TAG_INITIAL = "CREATE_TAG_INITIAL";
export const CREATE_TAG_REQUEST = "CREATE_TAG_REQUEST";
export const CREATE_TAG_SUCCESS = "CREATE_TAG_SUCCESS";
export const CREATE_TAG_FAILURE = "CREATE_TAG_FAILURE";
export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";

function createTagInitial() {
  return {
    type: CREATE_TAG_INITIAL,
    isFetching: false,
  };
}

function requestCreateTag(tag) {
  return {
    type: CREATE_TAG_REQUEST,
    isFetching: true,
    tag,
  };
}
// function requestDeleteTag(tag) {
//   return {
//     type: CREATE_TAG_REQUEST,
//     isFetching: true,
//     tag,
//   };
// }

function createTagSuccess(tag) {
  return {
    type: CREATE_TAG_SUCCESS,
    isFetching: false,
    tag,
  };
}

function createTagError(message) {
  return {
    type: CREATE_TAG_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchTags() {
  return {
    type: FETCH_TAGS_REQUEST,
    isFetching: true,
  };
}

function fetchTagsSuccess(tags) {
  return {
    type: FETCH_TAGS_SUCCESS,
    isFetching: false,
    tags,
  };
}

function fetchTagsError(message) {
  return {
    type: FETCH_TAGS_FAILURE,
    isFetching: false,
    message,
  };
}

export function deleteTag(data) {
  return async (dispatch) => {
    // We dispatch requestCreateTag to kickoff the call to the API
    // dispatch(requestDeleteTag(data));
    console.log(data);
    const response = await deleteReq(`tags/${data.id}`, data);

    if (!response) {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(createTagError(response.tag_name));
      return Promise.reject("tag failed to delete");
    }
    // Dispatch the success action
    dispatch(createTagSuccess("tag delete successfully"));
    setTimeout(() => {
      dispatch(createTagInitial());
    }, 5000);
    return Promise.resolve("tag delete successfully");
  };
}
export function updateTag(data) {
  return async (dispatch) => {
    // We dispatch requestCreateTag to kickoff the call to the API
    dispatch(requestCreateTag(data));
    const response = await put(`tags/${data.id}`, data);

    if (!response) {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(createTagError(response.tag_name));
      return Promise.reject("tag failed to update");
    }
    // Dispatch the success action
    dispatch(createTagSuccess("tag update successfully"));
    setTimeout(() => {
      dispatch(createTagInitial());
    }, 5000);
    return Promise.resolve("tag update successfully");
  };
}

export function createTag(tagData) {
  return async (dispatch) => {
    // We dispatch requestCreateTag to kickoff the call to the API
    dispatch(requestCreateTag(tagData));
    const response = await post("tags", tagData);

    if (!response) {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(createTagError(response.tag_name));
      return Promise.reject("tag failed to create");
    }
    // Dispatch the success action
    dispatch(createTagSuccess("tag created successfully"));
    setTimeout(() => {
      dispatch(createTagInitial());
    }, 5000);
    return Promise.resolve("tag created successfully");
  };
}

export function fetchTags(id = "") {
  return async (dispatch) => {
    dispatch(requestFetchTags());
    const tags = await get(`${id ? `tags/${id}` : "tags"}`);
    if (!tags) {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(fetchTagsError(tags.message));
      return Promise.reject(tags);
    }
    // Dispatch the success action
    dispatch(fetchTagsSuccess(tags));
    return Promise.resolve(tags);
  };
}
