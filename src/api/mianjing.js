import request from "@/utils/request";

// 获取面经列表接口
export const getMianjingAPI = (params) => {
  return request({
    url: "/admin/interview/query",
    params,
  });
  //   return request.get("/admin/interview/query", params);
};

// 删除面经接口
export const delMianjingListAPI = (id) => {
  return request({
    url: "/admin/interview/remove",
    method: "delete",
    data: { id },
  });
};

// 获取单个面经内容接口
export const getMianjingShowAPI = (id) => {
  return request({
    url: "/admin/interview/show",
    params: { id },
  });
  // return request.get(`/admin/interview/show/${id}`);
};

// 更新面经内容接口
export const updateMianJingAPI = (data) => {
  return request({
    url: "/admin/interview/update",
    method: "put",
    data,
  });
  // return request.post("/admin/interview/update", data);
};

// 创建面经内容接口
export const addMianJingAPI = (data) => {
  return request({
    url: "/admin/interview/create",
    method: "post",
    data,
  });
};
