// const db = wx.cloud.database();
// const place = db.collection('place');
// var app = getApp();
// Page({
//   data: {
//     // tasks: [
//     //   { idd: '1', statue: '一', price: '12' },
//     //   { idd: '5', statue: '五', price: '24' },
//     //   { idd: '3', statue: '三', price: '28' },
//     //   { idd: '4', statue: '四', price: '18' },
//     //   { idd: '2', statue: '二', price: '36' },
//     // ],
//     // tempFilePaths: '',
//     fileList: [
//       // Uploader 根据文件后缀来判断是否为图片文件
//       // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
//     ],
//   },


//   afterRead(event) {
//     const { file } = event.detail;
//     // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
//     wx.uploadFile({
//       url: wx.cloud.database(), // 仅为示例，非真实的接口地址
//       filePath: file.path,
//       name: 'file',
//       formData: { user: 'test' },
//       success(res) {
//         // 上传完成需要更新 fileList
//         const { fileList = [] } = this.data;
//         fileList.push({ ...file, url: res.data });
//         this.setData({ fileList });
//       },
//     });
//   },


//   // chooseimage: function () {
//   //   var _this = this;
//   //   wx.chooseImage({
//   //     count: 1, // 默认9
//   //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//   //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//   //     success: function (res) {
//   //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//   //       _this.setData({
//   //         tempFilePaths: res.tempFilePaths
//   //       })
//   //     }
//   //   })
//   // },

//   uploadToCloud() {
//     wx.cloud.init();
//     const { fileList } = this.data;
//     if (!fileList.length) {
//       wx.showToast({ title: '请选择图片', icon: 'none' });
//     } else {
//       const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
//       Promise.all(uploadTasks)
//         .then(data => {
//           wx.showToast({ title: '上传成功', icon: 'none' });
//           const newFileList = data.map(item => { url: item.fileID });
//           this.setData({ cloudPath: data, fileList: newFileList });
//         })
//         .catch(e => {
//           wx.showToast({ title: '上传失败', icon: 'none' });
//           console.log(e);
//         });
//     }
//   },

// uploadFilePromise(fileName, chooseResult) {
//     return wx.cloud.uploadFile({
//       cloudPath: fileName,
//       filePath: chooseResult.path
//     });
//   },

//   // onLoad: function () {
//   //   place.get().then(res => {
//   //     console.log(res.data)
//   //     this.setData({
//   //       tasks: res.data
//   //     })
//   //   })
//   // },
  
//   // mySort: function (e) {
//   //   //property 根据什么排序
//   //   var property = e.currentTarget.dataset.property;
//   //   console.log(property);
//   //   var self = this;
//   //   var tasks = self.data.tasks;
//   //   console.log("important");
//   //   console.log(tasks);
//   //   var sortRule = true; // 正序倒序
//   //   self.setData({
//   //     tasks: tasks.sort(self.compare(property, sortRule))
//   //   })
//   // },
//   // compare: function (property, bol) {
//   //   console.log("compared");
//   //   return function (a, b) {
//   //     var value1 = a[property];
//   //     var value2 = b[property];
//   //     if (bol) {
//   //       return value1 - value2;
//   //     } else {
//   //       return value2 - value1;
//   //     }
//   //   }
//   // }
//   onChangename(event) {
//     // event.detail 为当前输入的值
//     console.log(event.detail);
//     this.data.username = event.detail;
//   },
//   onChangepwd(event) {
//     // event.detail 为当前输入的值
//     console.log(event.detail);
//     this.data.passward = event.detail;
//   },

// });



// pages/pulish/pulish.js
// var app = getApp()
// const db = wx.cloud.database()
// const _ = db.command;
// Page({

//   /**
//   * 页面的初始数据
//   */
//   data: {
//     text: '',
//     imgUrl: '',
//     count: 0
//   },
//   //上传图片
//   chuantupian() {
//     let that = this;
//     let timestamp = (new Date()).valueOf();
//     wx.chooseImage({
//       success: chooseResult => {
//         wx.showLoading({
//           title: '上传中。。。',
//         })
//         // 将图片上传至云存储空间
//         wx.cloud.uploadFile({
//           // 指定上传到的云路径
//           cloudPath: timestamp + '.png',
//           // 指定要上传的文件的小程序临时文件路径
//           filePath: chooseResult.tempFilePaths[0],
//           // 成功回调
//           success: res => {
//             console.log('上传成功', res)
//             wx.hideLoading()
//             wx.showToast({
//               title: '上传图片成功',
//             })
//             if (res.fileID) {
//               that.setData({
//                 zhaopian: '图片如下',
//                 imgUrl: res.fileID
//               })
//             }

//           },
//         })
//       },
//     })
//   },

//   /**
//   * 生命周期函数--监听页面加载
//   */
//   onLoad: function (options) {
//     this.getCount()

//   },
//   onShow: function () {
    
//   },
//   getCount: function () {
//     //已输入的字数
//     var that = this
//     db.collection('funnys').count({
//       success: res => {
//         that.setData({
//           count: Number(res.total) + 1
//         })
//       }
//     })

//   },
//   textInput: function (e) {
//     this.setData({
//       text: e.detail.value
//     })
//   },
//   pulish: function () {

//     var data = {
//       image: new Array(app.globalData.fileID), //将图片储存为数组类型
//       content: this.data.text, //用户输入的文字
//       comment: [],
//       userId: wx.getStorageSync('userId'),
//       username: wx.getStorageSync('username'), //用户名
//       id: Number(this.data.count) + 1, //是现在数据库的条数+1,微信小程序的不知道怎么设置自增的数字字段
//       shareNum: 0,
//       commentNum: 0,
//       validStatus: 0,
//       validTime: 0
//     }
//     //validStatus: 审核状态, 通过时候 +1, 反对时候-1
//     //validTime: 审核次数, 最多5次,如果反对的人大于等于3,则不通过

//     console.log(data)

//     if (data.content) {
//       db.collection('funnys').add({
//         data: data,
//         success: res => {
//           wx.showToast({
//             title: '发布成功',
//           })
//           setTimeout(() => {

//             wx.switchTab({
//               url: '../index/index',
//             })
//           }, 1000)
//         },
//         fail: e => {
//           wx.showToast({
//             title: '发布错误',
//           })
//           console.log(e)
//         }
//       })
//     } else {
//       wx.showToast({
//         title: '请填写文字',
//         icon: 'none'
//       })
//     }

//   },

//   // 上传图片
//   //上传的时候，我们可以获得一个fileId，这个id我们必须存起来，在别人查看的时候，image的src使用的就是fileId，然后用户必
//   //须得知道上传的是哪张图片呀， 所以我们使用的是本地的图片路径来展示，即imagePath 
//   doUpload: function () {
//     // 选择图片
//     var that = this;
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {

//         wx.showLoading({
//           title: '上传中',
//         })

//         const filePath = res.tempFilePaths[0]
//         that.setData({
//           imgUrl: filePath
//         })
//         // 上传图片
//         const cloudPath = that.data.count + filePath.match(/\.[^.]+?$/)[0]
//         //改写: 数组 多图片
//         // const filePath = res.tempFilePaths, cloudPath = [];
//         // filePath.forEach((item, i)=>{
//         // cloudPath.push(that.data.count + '_' + i + filePath[i].match(/\.[^.]+?$/)[0])
//         // })

//         console.log(cloudPath)


//         // filePath.forEach((item, i) => {
//         wx.cloud.uploadFile({
//           cloudPath,
//           filePath,
//           success: res => {
//             console.log('[上传文件] 成功：', cloudPath, res)

//             app.globalData.fileID = res.fileID
//             app.globalData.cloudPath = cloudPath
//             app.globalData.imagePath = filePath

//           },
//           fail: e => {
//             console.error('[上传文件] 失败：', e)
//             wx.showToast({
//               icon: 'none',
//               title: '上传失败',
//             })
//           },
//           complete: () => {
//             wx.hideLoading()
//           }
//         })
//         // })

//       },
//       fail: e => {
//         console.error(e)
//       }
//     })
//   },
//   /**
//   * 用户点击右上角分享
//   */
//   onShareAppMessage: function () {

//   }
// })

//---------------------添加车辆--------------------------
// const db = wx.cloud.database();
// const cars = db.collection('cars');
// let openId = wx.getStorageSync("openId")
// const app = getApp()

// Page({
//   data: {
//     num: '',
//     type: '',
//     info: '',
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
//   onLoad: function (options) {
//     if (openId == '') {
//       app.getOpenId().then(res => {
//         console.log("res")
//         openId = wx.getStorageInfoSync("openId")
//         console.log(openId)
//       })
//     }
//     openId = wx.getStorageSync("openId")
//   },


//   submit: function () {
//     wx.showLoading({
//       title: '提交中',
//     })
//     const promiseArr = []
//     //只能一张张上传 遍历临时的图片数组
//     for (let i = 0; i < this.data.tempImg.length; i++) {
//       let filePath = this.data.tempImg[i]
//       let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
//       //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
//       promiseArr.push(new Promise((reslove, reject) => {
//         wx.cloud.uploadFile({
//           cloudPath: new Date().getTime() + suffix,
//           filePath: filePath, // 文件路径
//         }).then(res => {
//           // get resource ID
//           console.log(res.fileID)
//           this.setData({
//             fileIDs: this.data.fileIDs.concat(res.fileID)
//           })
//           reslove()
//         }).catch(error => {
//           console.log(error)
//         })
//       }))
//     }
//     Promise.all(promiseArr).then(res => {
//       db.collection('comments').add({
//         data: {
//           carName: this.data.num,
//           carType: this.data.type,
//           state: true,
//           info: this.data.info,
//           fileIDs: this.data.fileIDs //只有当所有的图片都上传完毕后，这个值才能被设置，但是上传文件是一个异步的操作，你不知道他们什么时候把fileid返回，所以就得用promise.all
//         }
//       })
//         .then(res => {
//           console.log(res)
//           wx.hideLoading()
//           wx.showToast({
//             title: '提交成功',
//           })
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     })
//   },
//   uploadImgHandle: function () {
//     wx.chooseImage({
//       count: 9,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: res => {
//         // tempFilePath可以作为img标签的src属性显示图片
//         const tempFilePaths = res.tempFilePaths
//         this.setData({
//           tempImg: tempFilePaths
//         })
//       }
//     })
//   }

// })


//----------------------添加车位-------------------------

// Page({
//   data: {
//     show: false,
//   },

//   showPopup() {
//     this.setData({ show: true });
//   },

//   onClose() {
//     this.setData({ show: false });
//   },
// });



// Page({
//   data: {
//     value: '',
//   },

//   onChange(event) {
//     // event.detail 为当前输入的值
//     console.log(event.detail);
//   },
// });


//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  showCardInfo: function (event) {
    //vip会员卡类型
    console.log(event.currentTarget)
    var cardType = event.currentTarget.dataset.index;
    console.log(cardType);
  },
})

