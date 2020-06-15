// const db = wx.cloud.database();
// const cars = db.collection('cars');
// let openId = wx.getStorageSync("openId")
// const app = getApp()

// Page({

//   data: {
//     num: '',
//     type:'',
//     info:'',
//     tempImg: [],
//     fileIDs: [],
//   },
//   onChangenum(event) {
//     // event.detail 为当前输入的值
//     this.data.num = event.detail;
//   },
//   onChangetype(event) {
//     // event.detail 为当前输入的值
//     this.data.type = event.detail;
//   },
//   onChangeinfo(event) {
//     // event.detail 为当前输入的值
//     this.data.info = event.detail;
//   },
//   onLoad: function(options){
//     if(openId == ''){
//       app.getOpenId().then( res => {
//         console.log("res")
//         openId = wx.getStorageInfoSync("openId")
//         console.log(openId)
//       })
//     }
//     openId = wx.getStorageSync("openId")
//   },

//   onSubmit: function(event) {
//     if (this.data.num == "" || this.data.type == "") {
//       wx.showToast({
//         title: '添加失败',
//         icon: 'none'
//       })
//       return false
//     }
//     cars.add(
//       {
//         data: {
//           // carName: event.detail.value.title1,
//           // carType: event.detail.value.title2,
//           carName: this.data.num,
//           carType: this.data.type ,
//           state:true,
//           info: this.data.info,
//         }
//       },
//       wx.showLoading({
//         title: '数据上传中..',
//       }),
//     ).then(res => {
//         // 数据传输提示框
//         setTimeout(function () {
//           wx.hideLoading();
//           wx.showToast({
//             title: '添加完成',
//             icon: 'success',
//             duration: 1500,
//           })
//         }, 1500)
//         wx.redirectTo({
//           url: '/pages/ctcar/ctcar',
//         })
//       }).catch(err => {
//         setTimeout(function () {
//           wx.hideLoading();
//           wx.showToast({
//             title: '出错请重试',
//             icon: 'none',
//             duration: 1500,
//           })
//         }, 1500)
//       })
//   }
// })


//0523修改

const db = wx.cloud.database();
const cars = db.collection('cars');
let openId = wx.getStorageSync("openId")
const app = getApp()

Page({
  data: {
    num: '',
    type: '',
    info: '',
    tempImg: [],
    fileIDs: [],
  },

  onChangenum(event) {
    // event.detail 为当前输入的值
    this.data.num = event.detail;
  },
  onChangetype(event) {
    // event.detail 为当前输入的值
    this.data.type = event.detail;
  },
  onChangeinfo(event) {
    // event.detail 为当前输入的值
    this.data.info = event.detail;
  },
  onLoad: function (options) {
    if (openId == '') {
      app.getOpenId().then(res => {
        console.log("res")
        openId = wx.getStorageInfoSync("openId")
        console.log(openId)
      })
    }
    openId = wx.getStorageSync("openId")
  },


  submit: function () {
    wx.showLoading({
      title: '提交中',
    })
    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.tempImg.length; i++) {
      let filePath = this.data.tempImg[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
    }
    Promise.all(promiseArr).then(res => {
      db.collection('cars').add({
        data: {
          carName: this.data.num,
          carType: this.data.type,
          state: true,
          info: this.data.info,
          fileIDs: this.data.fileIDs //只有当所有的图片都上传完毕后，这个值才能被设置，但是上传文件是一个异步的操作，你不知道他们什么时候把fileid返回，所以就得用promise.all
        }
      })
        .then(res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
          url: '/pages/ctcar/ctcar',
        })
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  uploadImgHandle: function () {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          tempImg: tempFilePaths
        })
      }
    })
  }

})
