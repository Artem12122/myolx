import dateCreatedAt from "../utils/date";

const Comments = ({ objComent }) => {
  return (
    <div className="parent-comments">
      <div className="comments-owner">
        {objComent.owner.avatar === null ? (
          <div className="icon-user" />
        ) : (
          <img src={"http://marketplace.node.ed.asmer.org.ua/" + objComent.owner.avatar.url} />
        )}
        <p>{objComent.owner.login}</p>
        <div className="comments-time-Ad">
          На MyOLX з {dateCreatedAt(objComent.owner.createdAt)}
        </div>
      </div>
      <p>{objComent.text}</p>
      <span className="comments-time-Ad">
        {dateCreatedAt(objComent.createdAt)}
      </span>
    </div>
  );
};

export default Comments;


