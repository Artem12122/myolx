const dateCreatedAt = (d) => {
    const date = new Date(+d);
    return (
        <>
        {`${date.getDate().toString().padStart(2, 0)}:${date
            .getMonth()
            .toString()
            .padStart(2, 0)}:${date.getFullYear()}, `}
        {` ${date.getHours().toString().padStart(2, 0)}:${date
            .getMinutes()
            .toString()
            .padStart(2, 0)} `}
        <span className="icon-clock" />
        </>
    );
};

export default dateCreatedAt