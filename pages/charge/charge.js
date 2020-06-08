// pages/charge/index.js
let openId = wx.getStorageSync("openId");
const db = wx.cloud.database();
const walletRecord = db.collection('walletRecord');
const persons = db.collection('persons');
const app = getApp()
let v1=0,v2=0
var v3=0,v4=0
Page({

      /**
       * 页面的初始数据
       */
      data: {
        money: 0,
        oldmoney:0
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        if (openId == '') {
          app.getOpenId().then(res => {
            // console.log("res")
            openId = wx.getStorageInfoSync()
            console.log(openId)
          })
        }
      },
      input: function(e) {
        console.log(parseFloat(e.detail.value))
        this.setData({
          money: parseFloat(e.detail.value)
        })
      },
      charge: function() {
        if (isNaN(this.data.money) || this.data.money <= 0) {
          wx.showModal({
            title: '提示',
            content: '请输入正确的金额',
          })
        } else {
          openId = wx.getStorageSync("openId");
          persons.where({
            _openid: openId
          }).get().then(res => {
              this.setData({
                oldmoney: res.data[0].wallet
              })
            //
            /*
            v1 = v3 = this.data.money
            v2 = v4 = this.data.oldmoney
            console.log("1: ",this.data.money, this.data.oldmoney, this.data.oldmoney + this.data.money)
            console.log("2. ",v1, v2, v1+ v2)
            console.log("3. ",v3, v4, v3 + v4)
            */
            //
            persons.doc().update({
              // data 传入需要局部更新的数据
              data: {
                wallet: this.data.money + this.data.oldmoney
              },
              success: (res) => {
                walletRecord.add({
                  data: {
                    amount: parseFloat(this.data.money),
                    info: "充值",
                    placeRecorId: -1,
                    time: db.serverDate()
                  }
                },
                  wx.showLoading({
                    title: '数据上传中..',
                  })).then(res => {
                    // 数据传输提示框
                    setTimeout(function () {
                      wx.hideLoading();
                      wx.showToast({
                        title: '添加完成',
                        icon: 'success',
                        duration: 1500,
                      })
                    }, 1500)
                    wx.redirectTo({
                      url: '../wallet/wallet',
                    })
                  }).catch(err => {
                    setTimeout(function () {
                      wx.hideLoading();
                      wx.showToast({
                        title: '出错请重试',
                        icon: 'none',
                        duration: 1500,
                      })
                    }, 1500)
                    wx.redirectTo({
                      url: '../wallet/wallet',
                    })
                  })

              },
              fail: (err) => { //回滚数据
                persons.doc().update({
                  // data 传入需要局部更新的数据
                  data: {
                    // 表示将 done 字段置为 true
                    wallet: this.data.oldmoney
                  }
                }),
                  setTimeout(function () {
                    wx.hideLoading();
                    wx.showToast({
                      title: '出错请重试',
                      icon: 'none',
                      duration: 1500,
                    })
                  }, 1500)
                wx.redirectTo({
                  url: '../wallet/wallet',
                })

              }

            })



          })
          ///* 
        //*/
        }
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

          },

          /**
           * 生命周期函数--监听页面隐藏
           */
          onHide: function() {

          },

          /**
           * 生命周期函数--监听页面卸载
           */
          onUnload: function() {

          },

          /**
           * 页面相关事件处理函数--监听用户下拉动作
           */
          onPullDownRefresh: function() {

          },

          /**
           * 页面上拉触底事件的处理函数
           */
          onReachBottom: function() {

          },

          /**
           * 用户点击右上角分享
           */
          onShareAppMessage: function() {

          }
      })