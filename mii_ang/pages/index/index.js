function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var _ca = require("../../public/cache.js"), app = getApp();

Page({
    data: {
        loading: "show",
        onShow: "",
        ad: [],
        webInfo: {},
        men: {},
        menuData: [],
        footerData: [],
        hotgoods: {},
        attachurl: "",
        toad: {
            isHide: !1,
            title: "",
            images: "",
            url: "",
            info: "",
            path: ""
        },
        toast: {
            isHide: !1,
            content: ""
        },
        thispath: "",
        swiperCurrent: "",
        tabBarData: {
            thisurl: "",
            borderStyle: "#d9d9d9",
            backgroundColor: "#fff",
            list: []
        },
        pageConstant : {},
        isOn:3
    },
    onLoad: function(t) {
        var o = this;
      o.setData({
        pageConstant: app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
      });
    },
    onReady: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                loading: "hide"
            });
        }, 1e3);
        t.setData({
            isOn:1
        });
        
    },
    onShow: function() {
        this.setData({
            onShow: !0,
            
        });
    },
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onHide: function() {
        this.setData({
            onShow: !1
        });
    },
    onUnload: function() {
        this.setData({
            onShow: !1
        });
    },
    GetuserInfo: function (t) {
      var a = this;
      app.util.getUserInfo(function (t) {
        a.setData({
          userInfo: t.wxInfo
        });
      });
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
      chooseCn: function (t) {
        app.globalData.lang = "cn";
        this.setData({
            isOn : 1
        })
        console.log(app.globalData.lang)
         wx.navigateTo({
         url: "/mii_ang/pages/service/service"
         }); 
      },
      chooseEn: function (t) {
        app.globalData.lang = "en";
        this.setData({
            isOn : 0
        })
        console.log(app.globalData.lang)
        wx.navigateTo({
            url: "/mii_ang/pages/service/service"
            });
      },
    navservice: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    adclose: function(t) {
        this.setData({
            "toad.isHide": !1
        });
    },
    goto: function(t) {
        console.log(t), wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    show: function(t) {
        var a = this;
        this.setData({
            "toast.isHide": !0,
            "toast.content": t
        }), setTimeout(function() {
            a.setData({
                "toast.isHide": !1
            });
        }, 2e3);
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    }
});