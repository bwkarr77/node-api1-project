import React, { useEffect, useState } from "react";
import axios from "axios";

// const apiBase = "https://jsonplaceholder.typicode.com";
// const apiGetDummy = `${apiBase}/todos/1`;

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const proxyurl = "";
const apiBase = "http://localhost:5000/api/users";
const apiGet = proxyurl + apiBase;

console.log(apiGet);

const List = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(apiBase)
      .then(results => {
        console.log(results.data);
        setList(results.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log("list:", list);
  const { id, title, completed } = list;
  return (
    <div>
      {list.length === 0 ? (
        <h3>no data...</h3>
      ) : (
        <div>
          <h2>DATA EXISTS!!</h2>
          <p>
            {id},{title},{JSON.stringify(completed)}
          </p>
        </div>
      )}
    </div>
  );
};

export default List;
