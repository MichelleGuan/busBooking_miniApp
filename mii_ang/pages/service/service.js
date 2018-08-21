var _request = require("../../util/request.js"), _request2 = _interopRequireDefault(_request);
var template = require("../../../mii_ang/template/footer.js");
function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        pageConstant: {},
        page: 1,
        active: [],
        routeline: "",
        info: {},
        show: "true",
        thispath: "",
    },
    onLoad: function (t) {
        var a = this;
        a.setData({
            pageConstant: app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
        });
        template.tabbar("tabBar", 0, this)
        var e = null == t.typeid ? "all" : t.typeid;
        a.setData({
            active: {
                data: [],
            },
        }); 
        a.getGoodsList(e);
        wx.setNavigationBarTitle({
            title: "CHADSTONE",
        });

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
    onShow: function () { },
        getGoodsList: function (t) {
        var a = this, e = t || "all";
        app.util.request({
            url: "entry/wxapp/getoptionalfareline",
            data: {
                uniacid: app.siteInfo.uniacid
            },
            cachetime: "30",
            success: function (t) {
              var farelinearray = t.data.data;
              farelinearray.forEach(function (element) {
                element.fairstartname = a.titlecase(element.fairstartname.toLowerCase());
                element.fairendname = a.titlecase(element.fairendname.toLowerCase());
                  //console.log(element);
              });
              //console.log(farelinearray);
                a.setData({
                  "active.data": farelinearray,
                }); 
            }
        });
    },
    gobook: function (t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url     
        });console.log(t.currentTarget.dataset.url)
    },
    show: function (t) {
        var a = this;
        this.setData({
            "toast.isHide": !0,
            "toast.content": t
        }), setTimeout(function () {
            a.setData({
                "toast.isHide": !1
            });
        }, 2e3);
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
});