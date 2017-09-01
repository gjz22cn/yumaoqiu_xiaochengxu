import request from '../../request/requestFunc.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    phone:'',
    message:'',
    getMatchId:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    setTimeout(function(){
      that.setData({
        nickName: app.globalData.userInfo.nickName,
        getMatchId: options.matchid
      })
    },500)
    
    
  },

  onShow: function () {
    
  },

  onShareAppMessage: function () {
  
  },

  //输入用户名
  inputNickname(e){
    this.setData({
      nickName: e.detail.value
    })
  },

  //输入电话
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //输入用户名
  inputNote(e) {
    this.setData({
      message: e.detail.value
    })
  },

  //提交报名
  submitInfo(){
    const that = this;

    let param = {
      'API_URL': '/wx/participant/add',
      'data': {
        'gameId': that.data.getMatchId,
        'name': that.data.nickName,
        'phone': that.data.phone,
        'comment': that.data.message
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.code=='000000') {
        wx.showToast({
          title: '报名成功',
          icon: '',
          duration: 2000
        });
        setTimeout(function(){
          wx.switchTab({
            url: '../mine/mine',
          })
        },2000)
        
      }
      if (res.data.code =='600201'){
        request.failTips('报名失败！')
      }
    }
    ).catch(e =>
      console.log(e)
      )

    
  }
})