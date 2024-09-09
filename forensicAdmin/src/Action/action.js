import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestFormData,
} from "../coreFIles/helper";

export const LoginAction = (data) => {
  return postRequest("login", data).then((res) => {
    return res.data;
  });
};

/// Category

export const getCategoryListAction = (data) => {
  return postRequest("getCategoryList", data).then((res) => {
    return res.data;
  });
};
export const addCategoryAction = (data) => {
  return postRequest("addCategory", data).then((res) => {
    return res.data;
  });
};

export const getCategoryDetailAction = (data) => {
  return postRequest("getCategoryDetail", data).then((res) => {
    return res.data;
  });
};
export const deleteCategoryAction = (data) => {
  return postRequest("deleteCategory", data).then((res) => {
    return res.data;
  });
};
export const editCategoryAction = (data) => {
  return postRequest("editCategory", data).then((res) => {
    return res.data;
  });
};

export const getsubcategorybyidAction = (data) => {
  return postRequest("getsubcategorybyid", data).then((res) => {
    return res.data;
  });
};

export const getcategoryusersAction = (data) => {
  return postRequest("getcategoryusers", data).then((res) => {
    return res.data;
  });
};

export const getsizeAction = (data) => {
  return postRequest("getsize", data).then((res) => {
    return res.data;
  });
};

export const deletesubCategoryAction = (data) => {
  return postRequest("deletesubCategory", data).then((res) => {
    return res.data;
  });
};
export const editSubCategoryAction = (data) => {
  return postRequest("editSubCategory", data).then((res) => {
    return res.data;
  });
};

export const getSubCategoryListAction = (data) => {
  return postRequest("getSubCategoryList", data).then((res) => {
    return res.data;
  });
};
export const addSubCategoryAction = (data) => {
  return postRequest("addSubCategory", data).then((res) => {
    return res.data;
  });
};



//attributes

export const getAttributesListAction = (data) => {
  return postRequest("getAttributesList", data).then((res) => {
    return res.data;
  });
};
export const addAttributeAction = (data) => {
  return postRequest("addAttribute", data).then((res) => {
    return res.data;
  });
};

export const getAttributebyidListAction = (data) => {
  return postRequest("getAttributeByid", data).then((res) => {
    return res.data;
  });
};
export const deleteAttributeAction = (data) => {
  return postRequest("deleteAttribute", data).then((res) => {
    return res.data;
  });
};
export const getAttributeDetailAction = (data) => {
  return postRequest("getAttributeDetail", data).then((res) => {
    return res.data;
  });
};
export const editAttributeAction = (data) => {
  return postRequest("editAttribute", data).then((res) => {
    return res.data;
  });
};







export const changePasswordAction = (data) => {
  return postRequest("changePassword", data).then((res) => {
    return res.data;
  });
};


/// Items

export const getItemListAction = (data) => {
  return postRequest("getItemList", data).then((res) => {
    return res.data;
  });
};
export const addItemAction = (data) => {
  return postRequestFormData("addItem", data).then((res) => {
    return res.data;
  });
};

export const getItemDetailAction = (data) => {
  return postRequest("getItemDetail", data).then((res) => {
    return res.data;
  });
};
export const getassistance_requestListAction = (data) => {
  return postRequest("getassistance_requestlist", data).then((res) => {
    return res.data;
  });
};

export const getuserguideAction = (data) => {
  return postRequest("getuserguide", data).then((res) => {
    return res.data;
  });
};

export const addUserGuideAction = (data) => {
  return postRequest("addUserGuide", data).then((res) => {
    return res.data;
  });
};

export const editUserGuideAction = (data) => {
  return postRequest("editUserGuide", data).then((res) => {
    return res.data;
  });
};

export const deleteUserGuideAction = (data) => {
  return postRequest("deleteUserGuide", data).then((res) => {
    return res.data;
  });
};

export const getexpertlistAction = (data) => {
  return postRequest("getexpertlist", data).then((res) => {
    return res.data;
  });
};

export const addexpertAction = (data) => {
  return postRequestFormData("addexpert", data).then((res) => {
    return res.data;
  });
};

export const editexpertAction = (data) => {
  return postRequestFormData("editexpert", data).then((res) => {
    return res.data;
  });
};

export const deleteexpertAction = (data) => {
  return postRequest("deleteexpert", data).then((res) => {
    return res.data;
  });
};


export const getassistance_requestCountAction = (data) => {
  return postRequest("getassistance_requestCount", data).then((res) => {
    return res.data;
  });
};

export const updateassistance_requestAction = (data) => {
  return postRequest("updateassistance_request", data).then((res) => {
    return res.data;
  });
};



export const getnotificationAction = (data) => {
  return postRequest("getnotification", data).then((res) => {
    return res.data;
  });
};
export const updatenotificationAction = (data) => {
  return postRequest("updatenotification", data).then((res) => {
    return res.data;
  });
};
export const addnotificationAction = (data) => {
  return postRequest("addnotificationtoall", data).then((res) => {
    return res.data;
  });
};
export const addnotificationtouserAction = (data) => {
  return postRequest("addnotificationtouser", data).then((res) => {
    return res.data;
  });
};
export const updatenotificationstatusAction = (data) => {
  return postRequest("updatenotificationstatus", data).then((res) => {
    return res.data;
  });
};
export const updateanswerAction = (data) => {
  return postRequest("updateanswer", data).then((res) => {
    return res.data;
  });
};
export const editItemAction = (data) => {
  return postRequestFormData("editItem", data).then((res) => {
    return res.data;
  });
};
export const deleteItemAction = (data) => {
  return postRequest("deleteItem", data).then((res) => {
    return res.data;
  });
};

export const getAlertRequestListAction = (data) => {
  return postRequest("getAlert_RequestList", data).then((res) => {
    return res.data;
  });
};

export const deleteAlertRequestAction = (data) => {
  return postRequest("Deletealertrequest", data).then((res) => {
    return res.data;
  });
};

export const getTransactionListAction = (data) => {
  return postRequest("getTransactionList", data).then((res) => {
    return res.data;
  });
};


 ////  Filter letter
export const getDashboardStatisticsAction = (data) => {
  return postRequest("getDashboardStatistics", data).then((res) => {
    return res.data;
  });
};

export const getUsersListAction = () => {
  return postRequest("getAllCustomersList").then((res) => {
   
    return res.data;
  });
};

export const userdeletetAction = (data) => {
  return postRequest("DeleteUsers", data).then((res) => {
    return res.data;
  });
};

export const getUsersListDataAction = (data) => {
  return postRequest("getUsersList", data).then((res) => {
    return res.data;
  });
};

export const editUserAction = (data) => {
  return postRequest("updateUser", data).then((res) => {
    return res.data;
  });
};

export const getordersListDataAction = (data) => {
  return postRequest("checkoutList", data).then((res) => {
    return res.data;
  });
};

export const UserBlockAction = (data) => {
  return postRequest("userblock", data).then((res) => {
    return res.data;
  });
};
export const UserUnBlockAction = (data) => {
  return postRequest("userUnblock", data).then((res) => {
    return res.data;
  });
};
export const updatekycapprovalAction = (data) => {
  return postRequest("updatekycapproval", data).then((res) => {
    return res.data;
  });
};
export const rejectkycapprovalAction = (data) => {
  return postRequest("rejectkycapproval", data).then((res) => {
    return res.data;
  });
};
export const getuserDetailsAction = (data) => {
  return postRequest("getuserDetails", data).then((res) => {
    return res.data;
  });
};

