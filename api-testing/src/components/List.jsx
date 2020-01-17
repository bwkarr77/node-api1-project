import React, { useEffect } from "react";
import { connect } from "react-redux";

import Unit from "./Unit";
import NewUser from "./NewUser";

import { getData } from "../actions/actions.jsx";

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const proxyurl = "";
const apiBase = "http://localhost:5000/api/users";

const List = ({ getData, list, state, reFetch }) => {
  useEffect(() => {
    getData();
  }, [reFetch]);

  console.log("state: ", state, "\nlist1:", list);
  return (
    <div>
      {list.length === 0 ? (
        <h3>no data...</h3>
      ) : (
        <div>
          <h2>DATA EXISTS!!</h2>
          <div className="datashow">
            {list.map(each => (
              <Unit each={each} />
            ))}
          </div>
        </div>
      )}
      <NewUser />
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  list: state.list,
  reFetch: state.reFetch
});

export default connect(mapStateToProps, { getData })(List);
