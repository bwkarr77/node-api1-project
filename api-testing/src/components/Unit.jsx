import React from "react";
import { connect } from "react-redux";

import { deleteUnit } from "../actions/actions.jsx";

const Unit = ({ each, deleteUnit }) => {
  // console.log(props);
  const { id, name, bio, created_at, updated_at } = each;

  const editUser = prop => {
    console.log(`editUser ${prop}`);
  };

  return (
    <div>
      <div className="card">
        <p>{name}</p>
        <p>{bio}</p>
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          deleteUnit(id);
        }}
      >
        delete
      </button>
      <button onClick={() => editUser(id)}>edit</button>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  list: state.list
});

export default connect(mapStateToProps, { deleteUnit })(Unit);
