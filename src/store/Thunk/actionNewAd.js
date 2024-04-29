import { api } from "../api";
import feedSlice from "../feedSlice/feedSlice";

export const actionNewAd = (newAd) => async (dispatch) => {
  const ad = await dispatch(api.endpoints.createNewAd.initiate(newAd));

  if (ad.data) {
    await dispatch(feedSlice.actions.clearData());
    await dispatch(feedSlice.actions.clearImages());

    const { _id } = ad.data.AdUpsert;
    return _id;
  }
};
