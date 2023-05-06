const axios = require("axios"); // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const qs = require("qs");

const controller = {
  paymentZalo: async (req,res) => {
    const { totalMoney } = req.body;
    
    try {
      const config = {
        app_id: process.env.ZALO_PAY_APP_ID,
        key1: process.env.ZALO_PAY_KEY_1,
        key2: process.env.ZALO_PAY_KEY_2,
        endpoint: process.env.ZALO_PAY_ENDPOINT,
      };
      const embed_data = {
        redirecturl: process.env.REDIRECT_URL,
      };
      const items = [{}];
      const transID = Math.floor(Math.random() * 1000000);
      const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: Number(totalMoney),
        description: `Thanh toan hoa don  ${moment().format("YYMMDD")}_${transID}`,
        bank_code: "CC",
        title: "thanh toan hoa don @123",
      };
      const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
      axios
        .post(config.endpoint, null, { params: order })
        .then((result) => {
          console.log(result.data);
          res.json({
            zalo: result.data,
            appTransId: order.app_trans_id,
            appTime: order.app_time,
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      next(error);
    }
  },
  getStatusPayment: async (req,res) => {
    const { appTransId } = req.body;
    try {
    //   console.log(ticket);
      const config = {
        app_id: process.env.ZALO_PAY_APP_ID,
        key1: process.env.ZALO_PAY_KEY_1,
        key2: process.env.ZALO_PAY_KEY_2,
        endpoint: process.env.ZALO_PAY_ENDPOINT_QUERY,
      };
      let postData = {
        app_id: config.app_id,
        app_trans_id: appTransId, // Input your app_trans_id
      };
      let data =
        postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
      postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
      let postConfig = {
        method: "post",
        url: config.endpoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(postData),
      };
    //   const check = setInterval(() => {
        axios(postConfig)
          .then(function (response) {
            // if (response.data.return_code === 1) {
            //   clearInterval(check);

            //   paymentService
            //     .bookingTicket(ticket)
            //     .then((result) => {
            //       res.json({ data: result, status: true });
            //     })
            //     .catch((error) => {
            //       next(error);
            //     });

            //   console.log("ok");
            // } else
            //  if (
            //   Date.now() > appTime + 15 * 60 * 1000 ||
            //   response.data.return_code == 2
            // ) 
            {
            //   clearInterval(check);
              return res.json(response.data);
            }
            // console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    //   },);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = controller;
