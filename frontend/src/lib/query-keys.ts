const QueryKeys = {
  auth: {
    sign_in: "sign_in",
    sign_up: "sign_up",
  },
  users: {
    users_list: "users_list",
    update_user: "update_user",
    forgot_password: 'forgot_password'
  },
} as const;

export default QueryKeys;
