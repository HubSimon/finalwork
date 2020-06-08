let openId = wx.getStorageSync("openId");
const db = wx.cloud.database();
const place = db.collection('place');
const persons = db.collection('persons');
const walletRecord = db.collection('walletRecord');
const app = getApp();
import Notify from '../../dist/notify/notify';
var util = require('../../utils/util.js');
import Dialog from '../..//dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: null,
    needpay: 0,
    placename0: '',
    beginTime: '',
    placeid: ''
  },
  onLoad: function(options) {
    if (openId == '') {
      app.getOpenId().then(res => {
        console.log("res")
        openId = wx.getStorageInfoSync()
        console.log(openId)
      })
    }
    openId = wx.getStorageSync("openId");
    console.log(openId)
    var _this = this
    var varmarkers = [];
    const db = wx.cloud.database();
    db.collection('placeRecord').where({
      _openid: openId
    }).get({
      success: res => {
        this.data.placename = res.data[0].placeName;
        this.data.needpay = res.data[0].price;
        this.data.beginTime = res.data[0].beginTime;
        this.data.placeid = res.data[0].placeId
        for (var i = 0; i < res.data.length; i++) {
          varmarkers.push({
            placeName: res.data[i].placeName,
            cost: res.data[i].price,
            beginTime: res.data[i].beginTime,
            endTime: res.data[i].endTime
          })
        }
        // for (var i = 0; i < varmarkers.length; i++) {
        //   db.collection('place').where({
        //     _id: varmarkers[i].placeId
        //   }).get({
        //     success: res => {
        //       varmarkers[i].push({
        //         placeName: res.data[i].placeName
        //       })
        //     }
        //   })
        // }
        _this.setData({
          tasks: varmarkers
        })
      }
    })

  },
  onOpen(event) {
    const {
      position,
      name
    } = event.detail;
    switch (position) {
      case 'left':
        Notify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
        });
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },

  finish: function(e) {
    console.log(this.data.placename)
    var dayTime = util.formatTime(new Date());
    console.log('finish time :' + dayTime);
    console.log('start time :' + this.data.beginTime);
    var year1 = dayTime.substring(0, 4);
    var month1 = dayTime.substring(5, 7);
    var day1 = dayTime.substring(8, 10);
    var hour1 = dayTime.substring(11, 13);
    var minutes1 = dayTime.substring(14, 16);
    console.log(year1 + ':' + month1 + ':' + day1 + ':' + hour1 + ':' + minutes1);

    var year2 = this.data.beginTime.substring(0, 4);
    var month2 = this.data.beginTime.substring(5, 7);
    var day2 = this.data.beginTime.substring(8, 10);
    var hour2 = this.data.beginTime.substring(11, 13);
    var minutes2 = this.data.beginTime.substring(14, 16);
    console.log("day1:"+day1+"day2:"+day2+"hour1:"+hour1+"hour2:"+hour2);
    var time = (day1 - day2) * 24 + (hour1 - hour2);
    var rest = minutes1 - minutes2;
    if (rest > 30) time++;
    else if (rest > 15) time += 0.5;
    console.log(time);

    Dialog.alert({
      title: '扣费提示',
      message: '您的停车时间结束，金额将从钱包中直接扣除',
    }).then(() => {
      place.where({
        placeName: this.data.placename
      }).get().then(res => {
        place.doc(this.data.placeid).update({
          data: {
            state: true,
          },
          success: (res) => {
            setTimeout(function() {
              wx.hideLoading();
              wx.showToast({
                title: '扣费成功',
                icon: 'success',
                duration: 1500,
              })
            }, 1500)
          }
        })
      })
      console.log("need pay" + this.data.needpay);
      openId = wx.getStorageSync("openId");
      persons.where({
        _openid: openId
      }).get().then(res => {
        this.setData({
          oldmoney: res.data[0].wallet
        })
        persons.doc().update({
              data: {
                wallet: this.data.oldmoney - (time * this.data.needpay)
              },
              success: (res) => {
                walletRecord.add({
                  data: {
                    amount: parseFloat(time * this.data.needpay),
                    info: "停车花费",
                    placeRecorId: -2,
                    time: db.serverDate()
                  }
                })
              }
            }
          ),
          wx.redirectTo({
            url: '../wallet/wallet',
          })

      })
    });


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})