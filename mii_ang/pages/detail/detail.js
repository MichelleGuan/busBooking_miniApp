var app = getApp(), WxParse = require("../../../wxParse/wxParse.js");

Page({
    data: {
        goodsInfo: {},
        attachurl: "",
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
        thispath: "",
    },
    onLoad: function(options) {
        var o = this;
        o.setData({
          pageConstant: app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
        });
        console.log('start');
        var that = this;
        console.log(that);
        console.log(options);
        var routes = JSON.parse(options.routelines);
        var passenger = parseInt(options.bookingseats_adults) + parseInt(options.bookingseats_kids);
        console.log(routes.length);
        for(var i = 0; i<routes.length; i++)
        {
          routes[i].routename = that.titlecase(routes[i].routename);
          if(routes[i].time == "")
          {
            routes[i].time = 'unset';
          }
        }
        console.log(routes);
        wx.setNavigationBarTitle({
          title: this.data.pageConstant.success_nav,
        })
        this.setData({
            phone: options.phone,
            firstname : options.firstname,
            lastname : options.lastname,
            bookingdate : options.bookingdate,
            email: options.email,
            route_detail: routes,
            passenger: passenger,
            confirm_number: options.ordersn
        })
 
    },
    onReady: function() {

    },
    done:function(){
        wx.setStorageSync('booking', 'true')
        wx.navigateTo({
          url: '/mii_ang/pages/myBooking/myBooking',
        })
      },
      terms:function(){
        wx.showModal({
          title: 'Terms&Conditions',
          content: 'Addictive Entertainment & Tours Pty Ltd(ACN 104 999 108)(AET) has been engaged by Vicinity Centres PM Pty Ltd(ACN 101 504 045) (VCPM), as the property manager of Chadstone shopping centre(Chadstone), to operate a free shuttle bus service between Chadstone and various locations in Melbourne including Federation Square(Shuttle Service).',
          showCancel: false,
          confirmText: 'confirm',
          confirmColor: '#000000',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
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
    goto: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    }
});