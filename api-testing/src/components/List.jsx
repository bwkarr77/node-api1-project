import React, { useEffect, useState } from "react";
import axios from "axios";

const apiBase = "https://jsonplaceholder.typicode.com";
const apiGetDummy = `${apiBase}/todos/1`;

const apiGet = "localhost:5000/api/users";

const List = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      //   .get(apiGetDummy)
      .get(apiGet)
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
      {!list ? (
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
