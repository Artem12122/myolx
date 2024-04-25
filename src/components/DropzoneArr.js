import { Trash2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "../images/placeholder.png";
import feedSlice from "../store/feedSlice/feedSlice";
import uploadFile from "../utils/uploadFile";

function DropzoneArr() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.feed.payloadImages);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 8 - images.length,
    noClick: images.length > 7,
    noDrag: images.length > 7,
    onDrop: (files) => {
      files.map((el) => {
        uploadFile(el)
          .then((res) => res.json())
          .then((data) => {
            dispatch(feedSlice.actions.addImages(data));
          });
      });
    },
  });

  const files = images.map((img) => (
    <div className="dropzone-img" key={img._id}>
      <img
        style={{ maxHeight: "150px", maxWidth: "200px" }}
        src={"http://marketplace.node.ed.asmer.org.ua/" + img.url}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(feedSlice.actions.clearImg(img._id));
        }}
      >
        <Trash2 />
      </button>
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files}
        <div className="dropzone-add-img">
          {images.length < 8 && <img src={placeholder} />}
          <p>Додати зображення</p>
        </div>
        <>
          {images.length < 1 && ( <div><img src={placeholder} /></div> )}
          {images.length < 2 && ( <div><img src={placeholder} /></div> )}
          {images.length < 3 && ( <div><img src={placeholder} /></div> )}
          {images.length < 4 && ( <div><img src={placeholder} /></div> )}
          {images.length < 5 && ( <div><img src={placeholder} /></div> )}
          {images.length < 6 && ( <div><img src={placeholder} /></div> )}
          {images.length < 7 && ( <div><img src={placeholder} /></div> )}
        </>
      </div>
    </section>
  );
}

export default DropzoneArr;
