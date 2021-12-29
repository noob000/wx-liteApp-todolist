/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    userName?:string,
    userAge?:number
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  setUserName:Function
  
}