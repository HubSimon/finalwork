const db = wx.cloud.database();
const cars = db.collection('placeRecord');
let openId = wx.getStorageSync("openId");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: null
  },


  onLoad: function (options) {
    if (openId == '') {
      app.getOpenId().then(res => {
        console.log("res")
        openId = wx.getStorageInfoSync()
        console.log(openId)
      })
    }
    openId = wx.getStorageSync("openId");
    console.log(openId)
    db.collection('placeRecord').where({
      _openid: openId
    }).get().then(res => {
      console.log(openId)
      // console.log(_openid)
      console.log(res.data)
      this.setData({
        tasks: res.data
      })
    })
    console.log(this.data.tasks)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})