
export const toggleAddPageContent= () => ({type: 'TOGGLE_ADD_PAGE_CONTENT'});
export const REQUEST_PAGE_CONTENT = 'REQUEST_PAGE_CONTENT'
export const RECEIVE_PAGE_CONTENT = 'RECEIVE_PAGE_CONTENT'
export const SELECT_PAGE = 'SELECT_PAGE'

export const REQUEST_REMOVING_PAGE_CONTENT = 'REQUEST_REMOVING_PAGE_CONTENT'
export const RECIEVE_REMOVING_PAGE_CONTENT = 'RECIEVE_REMOVING_PAGE_CONTENT'

export const selectPage = (pageId) => {
console.log('selectPage');
 return {
    type: SELECT_PAGE,
    selectedPageId: pageId
  }
}

export const requestPageContent = (pageId) => {
  return {
    type: REQUEST_PAGE_CONTENT
  }
}

export const receivePageContent = (json) => {
  console.log('json', json);
  return {
    type: RECEIVE_PAGE_CONTENT,
    page_content: json,//.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
export function fetchPageContent(pageId) {
  return function (dispatch) {
    dispatch(requestPageContent(pageId))
    return fetch(`/api/content/page/${pageId}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePageContent(json))
      )
  }
}

export function requestRemovingPageContent(pageId, pageContentId) {
  return {
    type: REQUEST_REMOVING_PAGE_CONTENT
  }
}
export function receiveDeletedPageContent(pageId, pageContentId) {
  return {
    type: RECIEVE_REMOVING_PAGE_CONTENT,
    pageId: pageId,
    pageContentId: pageContentId,
    recievedAt: Date.now()
  }
}

export function addedPageContent(content) { return {type: 'ADD_PAGE_CONTENT', data: content} };
export function addPageContent(pageId, content) {
  return function (dispatch) {
    dispatch(function(){ return { type: 'REQUEST_ADDING_PAGE' } });
    return fetch(`/api/content/page/${pageId}`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({
        title: content.title, 
        content_type: content.content_type,
        content_value: content.content_value,
        inPageId: content.inPageId,
        inContent: content.inContent,
      })})
      .then(response => response.json())
      .then(json => dispatch(addedPageContent({_id: json, title: content.title})))
  }
}
export function removePageContent(pageId, pageContentId) {
  return function (dispatch) {
    dispatch(requestRemovingPageContent(pageId, pageContentId))
    return fetch(`/api/content/${pageContentId}`, {method: 'delete'})
      .then(response => { 
          console.log(response);
          dispatch(receiveDeletedPageContent(pageId, pageContentId));
      })
  }
}