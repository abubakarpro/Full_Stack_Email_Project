export const RESET_STORE = "RESET_STORE";

export function resetStore() {
  return async dispatch => {
    dispatch({
      type: RESET_STORE
    });
  };
}
