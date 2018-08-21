var app = getApp();

Page({
    data: {
        text: "迈旗出品",
        remind: "加载中",
        ImagesList: "",
        showData: "",
        video: "",
        userInfo: {},
        attachurl: "",
        urls: ""
    },
    onLoad: function(a) {
        console.log(this);
        var t = this;
        app.util.request({
            url: "entry/wxapp/about",
            data: {},
            cachetime: "30",
            success: function(a) {
                console.log(a), t.setData({
                    showData: a.data.data,
                    ImagesList: a.data.data.pics,
                    urls: a.data.data.urls,
                    attachurl: a.data.data.attachurl
                }), setTimeout(function() {
                    t.setData({
                        video: a.data.data.videourl
                    });
                }, 3e3), setTimeout(function() {
                    wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: "#fda78e",
                        navigationBarTextStyle: "white",
                        animation: {
                            duration: 400,
                            timingFunc: "easeIn"
                        }
                    });
                }, 100);
            }
        });
    },
    onReady: function() {
        app.util.footer(this);
        var a = this;
        setTimeout(function() {
            a.setData({
                remind: ""
            });
        }, 3e3);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    tel: function(a) {
        wx.makePhoneCall({
            phoneNumber: this.data.showData.phone
        });
    },
    Imgshow: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.src;
        wx.previewImage({
            current: t,
            urls: this.data.urls
        });
    },
    Getadd: function(a) {
        wx.openLocation({
            latitude: parseFloat(this.data.showData.lat),
            longitude: parseFloat(this.data.showData.lng),
            name: this.data.showData.companyname,
            address: this.data.showData.address,
            scale: 18
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/about",
            data: {},
            cachetime: "30",
            success: function(a) {
                t.setData({
                    showData: a.data.data,
                    ImagesList: a.data.data.pics
                }), setTimeout(function() {
                    t.setData({
                        video: a.data.data.videourl
                    });
                }, 3e3), setTimeout(function() {
                    wx.stopPullDownRefresh();
                }, 1500);
            }
        });
    },
    onShareAppMessage: function(a) {
        return "button" === a.from && console.log(a.target), {
            title: this.data.showData.companyname,
            path: "mii_businessshows/pages/index/index",
            success: function(a) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "分享失败",
                    icon: "loading",
                    duration: 2e3
                });
            }
        };
    },
    goindex: function() {
        wx.redirectTo({
            url: "/mii_estore/pages/index/index"
        });
    }
});