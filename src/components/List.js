import React from "react";

const List = ({ listItems }) => {
  return (
    <>
      <ol>
        {listItems.length ? (
          listItems.map((item, idx) => (
            <li key={`${item}${idx}`}>{item}</li>
          ))
        ) : (
          <div>No filters selected</div>
        )}
      </ol>
    </>
  )
}

export default List;

