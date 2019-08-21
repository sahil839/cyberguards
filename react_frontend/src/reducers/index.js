const intialState = {
  isLoggedIn: false,
  aadhaar: 0,
  voterAddress: "",
  admin: "",
  ward: "",
  mobile: ""
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        aadhaar: action.aadhaar,
        voterAddress: action.voterAddress,
        admin: action.admin,
        ward: action.ward,
        mobile: action.mobile
      };
    case "LOGOUT":
      return {
        intialState
      };
    default:
      return state;
  }
};

export default reducer;
