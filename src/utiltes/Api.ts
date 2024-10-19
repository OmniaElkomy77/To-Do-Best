const APIS = {
    sign_up: "/api/user/register",
    otp: "/api/user/activeAccount",
    resend_code: "/api/user/resendCode",
    forget_password: "/api/user/forgetPassword",
    code_confirmation: "/api/user/verifyCode",
    reset_password: "/api/user/resetPassword",
    signin: "/api/user/login",
    logout: "/api/user/logout", //get
    all_cards: "/api/card/index",  //get
    all_deleted_cards: "/api/card/deleted_cards", //get
    add_card: "/api/card/create",
    edit_card: "/api/card/update",
    edit_card_status: "/api/card/update/status",
    delete_card: "/api/card/delete",
    user_points: "/api/user/points", //get
    Update_user_data: "/api/user/updateProfile"

};

export default APIS;