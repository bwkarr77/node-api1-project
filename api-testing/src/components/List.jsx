import React, { useEffect } from "react";
import { connect } from "react-redux";

import Unit from "./Unit";
import NewUser from "./NewUser";
import EditUser from "./EditUser";

import { getData } from "../actions/actions.jsx";

const proxyurl = "";
const apiBase = "http://localhost:6050/api/users";

const List = ({ getData, list, state, reFetch, isEditing }) => {
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
          <div className="new-edit">
            {!isEditing ? <NewUser /> : <EditUser />}
          </div>
          <div className="datashow">
            {list.map(each => (
              <Unit each={each} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  list: state.list,
  reFetch: state.reFetch,
  isEditing: state.isEditing
});

export default connect(mapStateToProps, { getData })(List);
