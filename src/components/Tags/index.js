import { Link } from "react-router-dom";
import { useGetTagsAllQuery } from "../../store/api";

const Tags = () => {
  const { isLoading, data } = useGetTagsAllQuery();

  if (isLoading) return <h2>Loading tags...</h2>;

  const tags = [];

  for (let i = 0; i < data?.AdFind.length; i++) {
    data.AdFind[i].tags.map((el) => {
      tags.includes(el) || tags.push(el);
    });
  }

  return (
    <div className="block-tags">
      <h2>Розділи на сервісі MyOLX</h2>
      {tags.map((el) => (
        <Link key={el} className="tags" to={`/tags/${el}`}>
          {el}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
