import { api, history } from "../api";
import authSlice from "../authSlice/authSlice";
import { actionAboutMe } from "./actionAboutMe";

export const actionFullLogin = (login, password) => async (dispatch) => {
  const token = await dispatch(
    api.endpoints.login.initiate({ login, password })
  );
  if (token?.data?.login) {
    dispatch(authSlice.actions.login(token.data.login));
    const user = await dispatch(actionAboutMe());
    history.push("/");
  }
};
