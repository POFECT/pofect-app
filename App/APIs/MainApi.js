import {axiosApi} from './api';

const MainApi = {

  getOrderListByOrdNo: async (ordNo, callback, errorCallback) => {
    await axiosApi()
        .get(`/main/app/${ordNo}`)
        .then((response) => {
          console.log("API ordNo", ordNo);
          console.log("API response.data", response.data);

          callback && callback(response.data);
        })
        .catch((error) => {
          console.log(error);
            // console.log("****alert")
            errorCallback && errorCallback();

        })
        .finally(() => {});
  },


    getOrdCnt: async (callback) => {
        await axiosApi()
            .get("/main/app/orderCntByMM")
            .then((response) => {

                callback && callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    },

    getOrderList: async (kind, week, status, flag, callback) => {
        const params = {
            ordPdtItpCdN: kind || undefined,
            ordThwTapWekCd: week || undefined,
            osMainStatusCd: status || undefined,
            faConfirmFlag: flag || undefined,
        };

        // 배열인 경우 직접 쿼리 스트링 생성
        if (Array.isArray(flag)) {
            params.faConfirmFlag = flag.join(",");
        }

        await axiosApi().get(`/main?`, { params })
            .then((response) => {
                callback && callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    },

  getOrder: async (no, callback) => {
    await axiosApi()
      .get(`/main/${no}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

    cfrmOrderCount: async (callback) => {
    await axiosApi()
      .get("/main/cfrmOrderCount")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getWeekList: async (statusCd, confirmFlag, callback) => {
    await axiosApi()
      .get(`/main/week?faConfirmFlag=${confirmFlag}&osMainStatusCd=${statusCd}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },

  getFaCapacityList: async (no, callback) => {
    await axiosApi()
      .get(`/capacity/factory/${no}/0`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateFlag: async (flag, orderIds, callback) => {
    await axiosApi()
      .patch("/main/flag/update", {
        value: flag,
        ids: orderIds,
      })
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateStatus: async (status, orderIds, callback) => {
    await axiosApi()
      .patch("/main/status/update", {
        value: status,
        ids: orderIds,
      })
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  possibleDecision: async (orderIds, callback) => {
    await axiosApi()
      .patch("/main/possible", orderIds)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  confirmDecision: async (orderIds, callback) => {
    await axiosApi()
      .patch("/main/confirm", orderIds)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  changeFactory: async (dto, callback) => {
    await axiosApi()
      .patch("/main/factory/update", dto)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  checkWeekListCapacity: async (weekList, callback) => {
    await axiosApi()
      .get(`/capacity/weeklist?weekList=${weekList}`)
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default MainApi;
