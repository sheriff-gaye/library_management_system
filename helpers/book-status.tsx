export const copiesStatus = (copies: number) => {

    console.log(copies)
    
  if (copies <=0) {
    return <span className="badge bg-danger d-block">Out of Stock</span>;
  } else {
    return (
      <span className="badge bg-primary d-block">
        {copies} copies available
      </span>
    );
  }
};
