import { api } from "../api";
import { actionFullLogin } from "./actionFullLogin";

export const actionFullRegister = (login, password) => async (dispatch) => {
  const user = await dispatch(
    api.endpoints.registration.initiate({ login, password })
  );
  console.log(user);
  if (user.data.createUser) {
    await dispatch(actionFullLogin(login, password));
  }
};
