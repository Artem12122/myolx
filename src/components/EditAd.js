import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useGetAdOneQuery } from "../store/api";
import MyAdNew from "./MyAdNew";
import { useDispatch } from "react-redux";
import feedSlice from "../store/feedSlice/feedSlice";


const EditAd = () => {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const { isFetching, data } = useGetAdOneQuery({ _id });

    if (isFetching) return <h2>Loading...</h2>

    const {title, description, tags, address, price, images } = data.AdFindOne

    images && images.map(img => {
        dispatch(feedSlice.actions.addImages(img))
    })

    return (
        <MyAdNew
        _id={_id}
        titleAD={title}
        descriptionAd={description}
        tagsAd={tags}
        addressAd={address}
        priceAd={price}
        />
    )
}

export default EditAd