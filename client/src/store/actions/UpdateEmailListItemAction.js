export const UPDATE_EMAIL_LIST_ITEM = "UPDATE_EMAIL_LIST_ITEM";

export function updateEmailListItem(mail) {
  return async dispatch => {
    dispatch({
      type: UPDATE_EMAIL_LIST_ITEM,
      payload: mail
    });
  };
}
