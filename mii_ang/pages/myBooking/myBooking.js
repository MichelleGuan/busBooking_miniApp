// mii_ang/pages/my booking/myBooking.js
var app = getApp()
var template = require("../../../mii_ang/template/footer.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  booking:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var o = this;
    o.setData({
      pageConstant: app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
    });
    var t= this;
    wx.setNavigationBarTitle({
      title: this.data.pageConstant.ticket_nav,
    })
    
    template.tabbar("tabBar", 1, this)
    var that = this;
    app.util.request({
      url: "entry/wxapp/getmybookingticketslist",
      data: {
      uniacid: app.siteInfo.uniacid,
      openid: '', // 'one way' or 'return'
      },
      cachetime: "30",
      success: function (t) {
        for(var i = 0; i < t.data.data.ticketslist.length; i++)
        {
          if( i == 0)
          {
            t.data.data.ticketslist[i]['toggle']=false;
          }
          else
          {
              t.data.data.ticketslist[i]['toggle']=true;
          }
        t.data.data.ticketslist[i]['index']=i;
        for(var j = 0; j < t.data.data.ticketslist[i].fairdetail.length; j++)
        {
          t.data.data.ticketslist[i].fairdetail[j].farename = that.titlecase(t.data.data.ticketslist[i].fairdetail[j].farename)
        }
      }
        that.setData({
          tickets: t.data.data.ticketslist,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          })
      console.log(t.data.data.ticketslist);
      }
      })
  },
  titlecase: function(str) { 
    var convertToArray = str.toLowerCase().split(" ");
    for (var i = 0; i < convertToArray.length; i++) {
      var char = convertToArray[i].charAt(0); 
      convertToArray[i] = convertToArray[i].replace(char, function replace(char) {
        return char.toUpperCase();
      });
    }
    return convertToArray.join(" ");
  } ,
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
  onChangeShowState: function (e) {
    console.log(this); 
    var index = e.currentTarget.dataset.index;
    var toggle = this.data.tickets[index].toggle;
    console.log(index);
    console.log(toggle);
    for( var i = 0; i < this.data.tickets.length; i++)
    {
      this.data.tickets[i].toggle = true;
    }
    this.data.tickets[index].toggle = !toggle;
    this.setData({
      tickets:this.data.tickets
    }) 
  },
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
  check:function(){
    wx.navigateTo({
      url: '/mii_ang/pages/detail/detail',
    })
  },
  onShareAppMessage: function (t) {
    var a = this;
    return "button" === t.from && console.log(t.target), {
      title: 'Chastone Shuttle Bus',
      path: "/pages/index/index",
      imageUrl: '/images/beautyShare.jpg',
      success: function (t) {
      },
      fail: function (t) {
      }
    };
  }
})