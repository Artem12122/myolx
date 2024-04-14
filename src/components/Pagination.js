
const Pagination = ({ AdPerPage, totalAd, paginate, currentPage }) => {
  const pegeNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAd / AdPerPage); i++) {
    pegeNumbers.push(i);
  }

  if (pegeNumbers.length <= 1) return

  const pagePlus = (page) => {
    page + 1 >= pegeNumbers.length
      ? paginate(pegeNumbers.length)
      : paginate(page + 1);
  };

  const pageMinus = (page) => {
    page - 1 <= 0 ? paginate(1) : paginate(page - 1);
  };

  return (
    <div className="parent-pagination">
      <ul className="pagination">
        <li>
          <a
            className={{ FontFamily: "icomoon" }}
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
            }}
            href="/"
            style={{ border: "none", opacity: currentPage !== 1 ? 0.9 : 0.7 }}
          >
            <span
              style={{ fontSize: "24px" }}
              className="icon-circle-left"
            ></span>
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              pageMinus(currentPage);
            }}
            href="/"
            style={{ border: "none", opacity: currentPage !== 1 ? 0.9 : 0.7 }}
          >
            <span className="icon-circle-left"></span>
          </a>
        </li>
        {pegeNumbers.map((numb) => (
          <li key={numb}>
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(numb);
              }}
              href="/"
              style={
                currentPage === numb
                  ? {
                      backgroundColor: "#404551",
                      color: "#74d2f8",
                    }
                  : {}
              }
            >
              {numb}
            </a>
          </li>
        ))}
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              pagePlus(currentPage);
            }}
            href="/"
            style={{
              border: "none",
              opacity: currentPage !== pegeNumbers.length ? 0.9 : 0.7,
            }}
          >
            <span className="icon-circle-right" />
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              paginate(pegeNumbers.length);
            }}
            href="/"
            style={{
              border: "none",
              opacity: currentPage !== pegeNumbers.length ? 0.9 : 0.7,
            }}
          >
            <span style={{ fontSize: "24px" }} className="icon-circle-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
