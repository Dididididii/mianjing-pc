import request from "@/utils/request";

// 用户登录接口
export function loginUser(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

// 获取管理员相关的信息
export const getUserInfoAPI = () => {
  return request.get("/auth/currentUser");
};

// 退出登录接口
export const logoutUserAPI = () => {
  return request.get("/auth/logout");
};

// 获取后台访问量接口
export const getVisitAPI = () => {
  return request.get("/analysis/DailyVisitTrend");
};
