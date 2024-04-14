import { api } from "../api";
import authSlice from "../authSlice/authSlice";


export const actionAboutMe = () => async (dispatch, getState) => {
    const { auth } = getState();
    if (auth.payload) {
      const { id } = auth.payload.sub;
      const user = await dispatch(
        api.endpoints.getUserById.initiate({ _id: id })
      );
      dispatch(authSlice.actions.aboutMe(user.data.UserFindOne));
      return user;
    }
};