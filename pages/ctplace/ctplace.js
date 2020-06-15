// pages/ctplace/ctplace.js
const db = wx.cloud.database();
const place = db.collection('place');
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
    place.where({
      _openid: openId
    }).get().then(res => {
      console.log(openId)
      // console.log(_openid)
      console.log(res.data)
      this.setData({
        tasks: res.data
      })
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})