import { api } from "../api";
import authSlice from "../authSlice/authSlice";
import { actionAboutMe } from "./actionAboutMe";

export const actionApdateUser = (user) => async (dispatch) => {
    
    const newUser = await dispatch(
      api.endpoints.setCreateUser.initiate(user)
    );
    if (newUser.data.UserUpsert._id !== null) {
      dispatch(authSlice.actions.aboutMe(newUser.data.UserUpsert));
    }
};