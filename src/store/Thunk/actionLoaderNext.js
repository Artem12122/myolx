import { api } from "../api";
import feedSlice from "../feedSlice/feedSlice";

export const actionLoaderNextAll = () => async (dispatch, getState) => {
  const { feed } = getState();
  const skip = feed.payload.length;

  const ad = await dispatch(api.endpoints.getAdAll.initiate(skip));
  if (ad.data) {
    await dispatch(feedSlice.actions.addData(ad.data.AdFind));
  }
};

export const actionLoaderNextTags = (tag) => async (dispatch, getState) => {
  await dispatch(feedSlice.actions.clearDataTags(tag));

  const { feed } = getState();
  const skip = feed.payloadTags.length;

  const ad = await dispatch(
    api.endpoints.getAllAdTagg.initiate({ tag, skip: [skip] })
  );

  if (ad.data) {
    await dispatch(feedSlice.actions.addDataTags(ad.data.AdFind, tag));
  }
};
