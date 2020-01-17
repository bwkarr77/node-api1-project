import {
  //logging in to api...
  LOGINSTART,
  LOGINSUCCESS,
  LOGINFAIL,
  //getting data...
  GETDATASTART,
  GETDATASUCCESS,
  GETDATAFAIL,
  //registering to api...
  REGISTERSTART,
  REGISTERSUCCESS,
  REGISTERFAIL,
  //edit data from api...
  EDITDATASTART,
  EDITDATASUCCESS,
  EDITDATAFAIL,
  //add data to api...
  ADDDATASTART,
  ADDDATASUCCESS,
  ADDDATAFAIL,
  //some more names
  HANDLECHANGE,
  LOGOUT,
  DELETEUNIT,
  CANCELEDIT
} from "../actions/actions";

const initialState = {
  error: "",

  isLoggingIn: false,
  isNewUser: false,
  didNewUser: false,

  isFetching: false,
  list: [{ id: "", name: "", bio: "", created_at: "", updated_at: "" }],
  newUser: { name: "", bio: "" },
  dataToEdit: { name: "", bio: "" },

  isAdding: false,
  isEditing: false,
  initialData: "",
  dataToEdit: "",

  reFetch: false
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGINSTART:
      return {
        ...state
      };
    case LOGINSUCCESS:
      return {
        ...state
      };
    case LOGINFAIL:
      return {
        ...state
      };
    //getting data...
    case GETDATASTART:
      return {
        ...state,
        error: "",
        isFetching: true
      };
    case GETDATASUCCESS:
      return {
        ...state,
        error: "",
        isFetching: false,
        list: payload
      };
    case GETDATAFAIL:
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    //registering to api...
    case REGISTERSTART:
      return {
        ...state
      };
    case REGISTERSUCCESS:
      return {
        ...state,
        reFetch: !state.reFetch
      };
    case REGISTERFAIL:
      return {
        ...state
      };
    //edit data from api...
    case EDITDATASTART:
      console.log(payload);
      return {
        ...state,
        isEditing: true,
        error: "",
        dataToEdit: {
          ...state.dataToEdit,
          dataToEdit: state.list.filter((dataset, index) => {
            console.log(dataset);
            if (dataset.id === payload.id) {
              return false;
            } else {
              return {
                name: dataset.name,
                bio: dataset.bio
              };
            }
          })
        }
      };
    case EDITDATASUCCESS:
      return {
        ...state,
        reFetch: !state.reFetch
      };
    case EDITDATAFAIL:
      return {
        ...state
      };
    //add data to api...
    case ADDDATASTART:
      return {
        ...state,
        isAdding: true,
        error: ""
      };
    case ADDDATASUCCESS:
      console.log(payload);
      var newID = state.list[state.list.length - 1].id + 1;
      var dt = new Date();
      var modifiedDate = `${dt.getFullYear()}-${dt.getMonth() +
        1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds() +
        1}} `;
      return {
        ...state,
        error: "",
        isAdding: false,
        reFetch: !state.reFetch,
        list: [
          ...state.list,
          {
            id: newID,
            name: payload.name,
            bio: payload.bio,
            created_at: modifiedDate
          }
        ]
      };
    case ADDDATAFAIL:
      return {
        ...state
      };
    //some more names
    case HANDLECHANGE:
      console.log(payload);
      switch (payload.form) {
        case "newUser":
          return {
            ...state,
            newUser: {
              ...state.newUser,
              [payload.target.name]: payload.target.value
            }
          };
        case "editData":
          return {
            ...state,
            dataToEdit: {
              ...state.dataToEdit,
              [payload.target.name]: payload.target.value
            }
          };
        default:
          return {
            ...state
          };
      }
    case LOGOUT:
      return {
        ...state
      };
    case DELETEUNIT:
      console.log("deleteUnit:", payload, state.list);
      return {
        ...state,
        reFetch: !state.reFetch,
        list: state.list.filter((dataset, index) => {
          if (dataset.id === payload.id) {
            return false;
          } else {
            return true;
          }
        })
      };
    case CANCELEDIT:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
