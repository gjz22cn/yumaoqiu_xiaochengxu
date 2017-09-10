import request from '../../request/requestFunc.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'../../images/tab1/u73.png',
    matchTime: '',
    matchAddress: '',
    memberNum: 0,
    ownerName:'',
    phone:'',
    matchId:0,
    progress:'',
    gameName:'',
    //小组赛和淘汰赛的信息
    teamList: [],
    knockoutList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId: options.matchid
    })
    const that = this;
    let param = {
      'API_URL': '/wx/game/query_by_id',
      'data': {
        'id': that.data.matchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.result.data.pic!=''){
        that.setData({
          imageUrl: request.APIDomian +'/'+ res.data.result.data.pic
        })
      }
      that.setData({
        matchTime: res.data.result.data.beginTime,
        matchAddress: res.data.result.data.address,
        memberNum: res.data.result.data.limitNum,
        ownerName: res.data.result.data.creator,
        phone: res.data.result.data.creatorPhone,
        gameName: res.data.result.data.gameName,
        progress: res.data.result.data.progress
      })
    }
    ).catch(e =>
      console.log(e)
    )
  },
  onShow: function () {
    //获取小组赛信息
    let _this = this;
    let param = {
      'API_URL': '/wx/group_game/list2',
      'data': {
        gameId: _this.data.matchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.code == '000000') {
        //处理数据
        var jsonData = res.data.result.data;
        if (jsonData == []) {

        }
        else {
          var resultArr = [];
          for (var key in jsonData) {
            var matchArr = [];
            for (var key2 in jsonData[key]) {
              var newObj2 = {
                'teamName': key2,
                'matchInfo': jsonData[key][key2]
              };
              matchArr.push(newObj2)
            }

            var newObj = {
              'roundName': key,
              'teamInfo': matchArr
            };
            resultArr.push(newObj)
          }

          _this.setData({
            teamList: resultArr
          })
        }
      }
    }
    ).catch(e =>
      console.log(e)
      )

    //获取淘汰赛信息
    let knockoutParam = {
      'API_URL': '/wx/knockout/list2',
      'data': {
        gameId: _this.data.matchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(knockoutParam).then(res => {
      if (res.data.code == '000000') {
        //处理数据
        var jsonData = res.data.result.data;
        if (jsonData == []) {

        }
        else {
          var resultArr = [];
          for (var key in jsonData) {
            var newObj = {
              'roundName': key,
              'matchInfo': jsonData[key]
            };
            resultArr.push(newObj)
          }

          _this.setData({
            knockoutList: resultArr
          })
        }
      }
    }
    ).catch(e =>
      console.log(e)
      )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareTitle = '';
    if(this.data.progress=='报名中'){
      shareTitle = '['+this.data.gameName+']-报名'
    }
    else{
      shareTitle = '[' + this.data.gameName + ']-赛程'
    }

    return {
      title: shareTitle,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //进入信息填写页面
  gotoInfoPage(e){
    wx.navigateTo({
      url: '../enrollInfo/enrollInfo?matchid=' + this.data.sendMatchId
    })
  }
})