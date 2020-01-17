import React from "react";
import { connect } from "react-redux";

import { deleteUnit, startEdit } from "../actions/actions.jsx";

const Unit = ({ each, deleteUnit, startEdit }) => {
  // console.log(props);
  const { id, name, bio, created_at, updated_at } = each;

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
      <button
        onClick={e => {
          e.stopPropagation();
          startEdit(id);
        }}
      >
        edit
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  list: state.list
});

export default connect(mapStateToProps, { deleteUnit, startEdit })(Unit);
