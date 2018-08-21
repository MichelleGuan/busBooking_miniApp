// mii_ang/pages/info/info.js
const app = getApp()
var template = require("../../../mii_ang/template/footer.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  direction:'off',
  when:'off',
  pageConstant: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var o = this;
    template.tabbar("tabBar", 2, this);
    
    o.setData({
      pageConstant: app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
    });
    wx.setNavigationBarTitle({
      title: o.data.pageConstant.info_nav,
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
  onShareAppMessage: function (t) {
    var a = this;
    return "button" === t.from && console.log(t.target), {
      title: 'Chastone Shuttle Bus',
      path: "mii_ang/pages/index/index",
      imageUrl: '/images/beautyShare.jpg',
      success: function (t) {
      },
      fail: function (t) {
      }
    };
  },
  direction:function(){
    this.data.direction == 'off' ? this.setData({ "direction": 'on' }) : this.setData({ "direction": 'off' });
  console.log(this.data.direction);
  },
  when:function(){
    this.data.when == 'off' ? this.setData({ "when": 'on' }) : this.setData({ "when": 'off' });
    console.log(this.data.when);
  }
})