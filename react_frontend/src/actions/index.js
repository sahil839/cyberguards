export const login = (aadhaar, voterAddress, admin, ward, mobile) => {
  return {
    type: "LOGIN",
    aadhaar: aadhaar,
    voterAddress: voterAddress,
    admin: admin,
    ward: ward,
    mobile: mobile
  };
};
export const logout = () => {
  return {
    type: "LOGOUT"
  };
};
