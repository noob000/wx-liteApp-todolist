// app.ts
App<IAppOption>({
  globalData: {
    userName: "zhl",
    userAge: 20
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
    setUserName:function () {
      const that = this;
      return function (val: any) {
        const obj = {
          userName: val
        };
        console.log(that)
        that.globalData = {
          ...that.globalData,
          ...obj
        }
      }
    }
  
})