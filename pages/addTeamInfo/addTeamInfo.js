var utils = require('../../utils/util.js');
import request from '../../request/requestFunc.js';
var app = getApp();
Page({

  data: {
    addGameId: 0,
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双'],
    matchIndex: 0,
    roundArr: ['第一轮', '第二轮', '第三轮', '第四轮'],
    roundIndex: 0,
    groups:'',
    participant:'',
    participant2:'',
    matchDay: utils.formatDay(new Date),
    startTime: '08:00',
    endTime: '10:00',
    score: '',
    score2: '',
    address:'',
  },

  onLoad: function (options) {
    const oGameId = options.matchid;
    this.setData({
      addGameId:oGameId
    })
  },

  onShow: function () {

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  //修改比赛项目
  bindTypeChange(e) {
    this.setData({
      matchIndex: e.detail.value
    })
  },

  //选择轮次
  bindRoundChange(e) {
    this.setData({
      roundIndex: e.detail.value
    })
  },

  //修改开始时间
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  //修改结束时间
  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  //修改比赛日期
  startDayChange(e) {
    this.setData({
      matchDay: e.detail.value
    })
  },

  //输入组别
  inputGroups(e) {
    this.setData({
      groups: e.detail.value
    })
  },

  //输入参赛方
  inputParticipant(e) {
    this.setData({
      participant: e.detail.value
    })
  },

  inputParticipant2(e) {
    this.setData({
      participant2: e.detail.value
    })
  },

  //输入比分
  inputScore(e) {
    this.setData({
      score: e.detail.value
    })
  },
  inputScore2(e) {
    this.setData({
      score2: e.detail.value
    })
  },

  //输入地点
  inputAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },

  //提交添加小组赛
  submitAdd(){
    let _this = this;

    const submitData = {
      'gameId': this.data.addGameId,
      'gameEvent': parseInt(this.data.matchIndex) + 1,
      'rounds': this.data.roundArr[this.data.roundIndex],
      'groups': this.data.groups,
      'participant': this.data.participant,
      'participant2': this.data.participant2,
      'gameDate': this.data.matchDay,
      'beginTime': this.data.startTime,
      'endTime': this.data.endTime,
      'address': this.data.address,
      'score': this.data.score,
      'score2': this.data.score2
    }

    let param = {
      'API_URL': '/wx/group_game/create',
      'data': submitData,
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.code == '400001') {
        request.failTips('有相关数据没有填写哦！')
      }
      if (res.data.code == '000000') {
        //成功
        wx.navigateBack({
          delta:-1
        })
      }
    }
    ).catch(e =>
      console.log(e)
    )
  }
})