//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  formInputChange:function(e){
      this.setData({
          [e.target.dataset.field]:e.detail.value
      })
  },

  submitForm:function(){

      const data = {
          college_name:this.data.name,
          student_count:this.data.studentNum,
          teacher_count:this.data.teacherNum,
          cost:this.data.total
      }
      if(this.data.name!=null&& this.data.studentNum!=null && this.data.teacherNum!=null && this.data.total!=null){
            console.log(`submit form data is ${JSON.stringify(data)}`)
          const token = wx.getStorageSync("accessToken")

          console.log("token is "+token)
          app.register.signUp(data,{Authorization:`Bearer ${token}`}).then(res=>{
              console.log("-----------------------------------")
              console.log(`info is ${JSON.stringify(res)}`)
              console.log("-----------------------------------")

              wx.setStorageSync("userInfo",res)
          })
        wx.showToast({
                title: '提交成功',
                icon: 'none',
                duration: 1000
            })
        setTimeout(function() {
            wx.navigateTo({
              url: '../success/success'
            })
        }.bind(this), 1000);
      }else{
          wx.showToast({
              title:"请填完必填内容",
              icon:"none",
              duration:2000
          })
      }


  }
})
