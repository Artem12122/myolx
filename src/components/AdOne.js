import React from "react";
import { Link, useParams } from "react-router-dom";
import "swiper/css/bundle";
import {
  EffectCreative,
  HashNavigation,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAdOneQuery } from "../store/api";
import dateCreatedAt from "../utils/date";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { ArrowLeft } from "lucide-react";
import placeholder from "../images/placeholder.png";
import { useDispatch, useSelector } from "react-redux";


const AdOne = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const history = useHistory();
  const { _id } = useParams();
  const { isFetching, data } = useGetAdOneQuery({ _id });

  if (isFetching) return <h2>Loading...</h2>;

  if (!data) return <h2>Ви не увійшли в акаунту</h2>;

  const { AdFindOne } = data;
  const _idUser = user._id

  console.log(AdFindOne)

  return (
    <>
      <div className="goBack-AdOne" onClick={history.goBack}><ArrowLeft size={32} /></div>
      <div className="parent-AdOne">
        <div className="AdOne-main">
          <div className="AdOne-img-block">
            <Swiper
              modules={[
                Navigation,
                Pagination,
                EffectCreative,
                HashNavigation,
                Keyboard,
                Scrollbar,
              ]}
              loop={AdFindOne?.images && AdFindOne?.images.length > 1}
              centeredSlides={true}
              effect={"creative"}
              creativeEffect={{
                prev: {
                  shadow: false,
                  opacity: 0,
                  translate: [0, 0, -400],
                },
                next: {
                  opacity: 1,
                  translate: ["100%", 0, 0],
                },
              }}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{
                type: "fraction",
              }}
              scrollbar={{
                hide: true,
              }}
              grabCursor={true}
              hashNavigation={{
                watchState: false,
              }}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
              }}
            >
              {AdFindOne?.images !== null && AdFindOne?.images.length > 0 ? (
                AdFindOne.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                  >
                    <img
                      src={"http://marketplace.node.ed.asmer.org.ua/" + image.url}
                      alt={image.text}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src={placeholder}
                    alt="Зображення відсутнє"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
          <div className="AdOne-description">
            <div>
              <h4 className="AdOne-description-title">Опис</h4>
              <p>{AdFindOne.description}</p>
            </div>
            <div className="block-tags-Ad">
              {AdFindOne.tags &&
                AdFindOne.tags.length > 0 &&
                AdFindOne.tags.map((el, i) => (
                  <Link className="tags-Ad" key={el} to={`/tags/${el}`}>
                    {el} {AdFindOne.tags.length !== i + 1 && ","}
                  </Link>
                ))}
            </div>
          </div>

          <div className="AdOne-comments">
            <h4>Коментарі</h4>
            <AddComment _id={_id} />
            <div className="block-comments">
              {AdFindOne.comments &&
                AdFindOne.comments.length > 0 &&
                AdFindOne.comments
                  .slice()
                  .reverse()
                  .map((el) => <Comments key={el._id} objComent={el} />)}
            </div>
          </div>
        </div>

        <div className="AdOne-aside">
          <div className="AdOne-title">
            <div className="AdOne-title-time">
              Опубліковано {dateCreatedAt(AdFindOne.createdAt)}
            </div>
            <h4>{AdFindOne.title}</h4>
            <div className="AdOne-title-price">{AdFindOne.price} грн.</div>
            <Link to={`/message/${AdFindOne.owner._id}`}>
              <button className="AdOne-title-message">Повідомлення</button>
            </Link>
          </div>

          <div className="AdOne-owner">
            <h4 className="AdOne-owner-title">Користувач</h4>
            <div className="owner">
              {AdFindOne.owner.avatar === null ? (
                <div className="icon-user" />
              ) : (
                <img
                  src={
                    "http://marketplace.node.ed.asmer.org.ua/" +
                    AdFindOne.owner.avatar.url
                  }
                />
              )}
              <p>{AdFindOne.owner.login}</p>
              <div className="owner-time">
                На MyOLX з {dateCreatedAt(AdFindOne.owner.createdAt)}
              </div>
            </div>
            <div className="owner-adress">
              {AdFindOne.address !== null && (
                <>
                  {AdFindOne.address}
                  <span className="icon-location2"></span>
                </>
              )}
            </div>
            <div className="owner-all-ad">
              <Link to={`/Ad/owner/${AdFindOne.owner._id}`}>
                Інші оголошення автора <span className="icon-redo2"></span>
              </Link>
            </div>
          </div>
          { _idUser === AdFindOne.owner._id &&  
            <div className="AdOne-edit-del">
              <Link to={`/My/Ad/new/${_id}`}>
                <button className="AdOne-edit">Редагувати</button>
              </Link>
              <button className="AdOne-del">Видалити</button>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default AdOne;
