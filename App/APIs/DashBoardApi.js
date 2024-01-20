import {axiosApi} from './api';

const DashBoardApi = {
  getDashBoardInputStatus: async (week, callback) => {
    await axiosApi()
      .get(`/input-status/app/${week}`)
      .then((response) => {

        callback && callback(response.data);
        console.log("$$$$$",response.data)

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },


  getDashBoardOrderInquiry: async (callback) => {
    await axiosApi()
      .get("/order-inquiry")
      .then((response) => {
        callback && callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
};

export default DashBoardApi;
