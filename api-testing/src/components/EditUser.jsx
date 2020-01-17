import React from "react";
import { connect } from "react-redux";
import {
  handleChange,
  startEdit,
  saveEdit,
  cancelEdit
} from "../actions/actions";

const EditUser = (id, { startEdit, saveEdit, cancelEdit, dataToEdit }) => {
  return (
    <div className="card">
      <form
        onSubmit={e => {
          e.preventDefault();
          saveEdit(dataToEdit);
        }}
      >
        <input
          name="name"
          type="text"
          className="editData"
          onChange={e => handleChange(e, "editData")}
          value={dataToEdit.name}
        />
        <input
          name="bio"
          type="text"
          className="editData"
          onChange={e => handleChange(e, "editData")}
          value={dataToEdit.bio}
        />
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={() => cancelEdit()}>Cancel Edit</button>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state,
  list: state.list,
  dataToEdit: state.dataToEdit
});

export default connect(mapStateToProps, { startEdit, saveEdit, cancelEdit })(
  EditUser
);
