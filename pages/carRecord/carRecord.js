let openId = wx.getStorageSync("openId");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   if (openId == '') {
  //     app.getOpenId().then(res => {
  //       console.log("res")
  //       openId = wx.getStorageInfoSync()
  //       console.log(openId)
  //     })
  //   }
  //   openId = wx.getStorageSync("openId");
  //   cars.where({
  //     _openid: openId
  //   }).get().then(res =>{
  //     console.log(res)
  //     this.setData({
  //       tasks:res.data
  //     })
  //   })
  // },
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
        for (var i = 0; i < res.data.length; i++) {
          varmarkers.push({
            carId: res.data[i]._id,
            cost: res.data[i].cost,
            beginTime: res.data[i].beginTime,
            endTime: res.data[i].endTime
          })
        }
      }
    })
    for (var i = 0; i < varmarkers.length; i++) {
      db.collection('car').where({
        _id: varmarkers[i].carId
      }).get({
        success: res => {
          varmarkers[i].push({
            carName: res.data[i].carName
          })
        }
      })
    }

    _this.setData({
      markers: varmarkers
    })
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