var app = getApp(), t = require("../../template/Toast.js");

Page({

    data: {
        pageConstant: {},
        Pageinfo: {
            title: "",
            book_Tname: "",
            book_Taddress: "",
            book_Tservice: "",
            book_Tech: "",
            book_Tdate: "",
            book_Tcard: "",
            book_hideaddress: "",
            book_hidecard: ""
        },
        disabled: "false",
        sessionid: "",
        type: "one way",
        cardNum: "",
        Gcard: {
            isHide: !1,
            animationData: {},
            cardList: []
        },
        TimeSlot: {
            isHide: !1,
            animationData: {},
            Days: [],
            active: {
                week: "",
                Time: "",
                start: "",
                iSrestDay: ""
            }
        },
        usecardInfo: {
            cid: "",
            oid: "",
            typeid: ""
        },
        seletecardtitle: "",
        passengers: 1,
        child: 0,
        total: 1,
        remain: 49,
        date: "26/10/2018",
        date1: "2018-10-22",
        date2: "2018-10-26",
        pickuptime: '',
        returntime: '',
        arrayP: ['10:00', '12:00', '14:00'],
        objectarrayP: [
            {
                id: 0,
                name: '10:00'
            },
            {
                id: 1,
                name: '12:00'
            },
            {
                id: 2,
                name: '14:00'
            },
        ],
        indexP: 0,
        arrayD: ['12:00', '14:00', '16:00', '18:00'],
        objectarrayD: [
            {
                id: 0,
                name: '12:00'
            },
            {
                id: 1,
                name: '14:00'
            },
            {
                id: 2,
                name: '16:00'
            },
            {
                id: 3,
                name: '18:00'
            }
        ],
        indexD: 0,
        isOn: 'return',
        routeline: '',
        from: '',
        to: '',
    },

    onLoad: function (a) {
        var e = this, i = a.gid, s = a.tid;
        e.setData({
            pageConstant: app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
        });
        e.GetbookPageInfo(), null == i && null == s || (null != i && null == s ? e.GetgoodsInfo(i) : null == i && null != s && e.GetbookInfo(s),
            e.Getuser(), e.GetuserInfo()), app.util.footer(this), new t.ToastPannel();

    },
    onReady: function () { },
    onShow: function () { },
    onHide: function () { },
    onUnload: function () { },
    GetgoodsInfo: function (routeline) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/getbookinginfo",
            data: {
                uniacid: app.siteInfo.uniacid,
                bookingdate: e.data.date,// 日期: format: 07/08/2018或者为空，onload的时候调用是空
                bookingpickuptime: e.data.pickuptime,// 时间: format: 19:30 或者为空，onload的时候调用是空
                bookingreturntime: e.data.returntime,
                type: e.data.type,// 'one way' or 'return'
                routeline: routeline// 路线可选2 路线可选1            
            },
            cachetime: "30",
            success: function (t) {
                console.log(t.data);
                e.setData({
                    arrayP: t.data.data.pickuptime,
                    objectarrayP: t.data.data.pickuptime,
                    arrayD: t.data.data.returntime,
                    objectarrayD: t.data.data.returntime,
                    remain: t.data.data.leftseats - 1,
                    pickuptime: t.data.data.pickuptime[0],
                    returntime: t.data.data.returntime[0],
                    routeline: routeline,
                    date1:e.GetDateStr(1),
                    date2:e.GetDateStr(6),
                    date:e.Getnewdate(e.GetDateStr(1))
                });
                if (e.data.routeline == "2") {
                    e.setData({
                        from: "Federation Square",
                        to: "Chadstone Shopping Centre"
                    });
                }
                if (e.data.routeline == "1") {
                    e.setData({
                        to: "Federation Square",
                        from: "Chadstone Shopping Centre",
                        isOn:'oneway'
                    });
                }
            }
        });
    },
    GetDateStr: function(AddDayCount) {   
        var dd = new Date();  
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
        var y = dd.getFullYear();   
        var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
        var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
        return y+"-"+m+"-"+d;   
     },
    Getnewdate: function (str) {
        var convertToArray = str.split("-");
        var year = convertToArray[0];
        convertToArray[0] = convertToArray[2];
        convertToArray[1] = convertToArray[1];
        convertToArray[2] = year;
        return convertToArray.join("/");
    },
    Getuser: function () {
        var a = this;
        wx.login({
            success: function (t) {
                app.util.request({
                    url: "entry/wxapp/user",
                    data: {
                        code: t.code
                    },
                    cachetime: "30",
                    success: function (t) {
                        a.setData({
                            openid: t.data.openid,
                            toopenid: t.data.toopenid,
                            uname: t.data.uName,
                            phone: t.data.uPhone
                        });
                    }
                });
            }
        });
    },
    sendmsg: function (t, a) {
        var e = t, i = a;
        app.util.request({
            url: "entry/wxapp/sendMessage",
            data: {
                formid: e,
                oid: i
            },
            cachetime: "0",
            success: function (t) {
                console.log(t);
            }
        });
    },
    GetuserInfo: function (t) {
        var a = this;
        app.util.getUserInfo(function (t) {
            a.setData({
                sessionid: t.sessionid
            });
        });
    },
    changegoodsCardstatus: function () {
        this.setData({
            "usecardInfo.cid": "",
            "usecardInfo.oid": "",
            "usecardInfo.typeid": "",
            selectcardtitle: ""
        });
    },
    cancelTimeSlot: function () {
        var t = this, a = wx.createAnimation({
            duration: 300,
            timingFunction: "ease-out"
        });
        (t.animation = a).translateY(0).step(), t.setData({
            "TimeSlot.animationData": t.animation.export()
        }), setTimeout(function () {
            t.setData({
                "TimeSlot.isHide": !1
            });
        }, 300);
    },
    GetbookPageInfo: function () {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getbookpageinfo",
            data: {},
            cachetime: "30",
            success: function (t) {
                wx.setNavigationBarTitle({
                  title: a.data.pageConstant.booking_nav,
                }), a.setData({
                    Pageinfo: t.data
                });
            }
        });
    },
    changeFilter: function (t) {
        var a = t.currentTarget.dataset.index, e = t.currentTarget.dataset.date, i = t.currentTarget.dataset.rest;
        this.setData({
            "TimeSlot.active": {
                week: t.target.id,
                Time: this.data.TimeSlot.Days[a].TimeSlot,
                date: e,
                iSrestDay: i
            }
        });
    },
    submit: function (e) {
        if (this.data.passengers == 0 & this.data.child == 0) {
            wx.showModal({
                title: this.data.pageConstant.formA_infoT,
                content: this.data.pageConstant.formA_infoC,
                showCancel: false,
                confirmText: this.data.pageConstant.confirm,
                confirmColor: '#000000',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
        else {
            wx.navigateTo({
                url: encodeURI(e.currentTarget.dataset.url),
            });
            console.log(e.currentTarget.dataset.url)
        }
    },
    bindPickerPChange: function (e) {
        var a = this;
        console.log('pickerP发送选择改变，携带值为', this.data.arrayP[e.detail.value])
        a.setData({
            indexP: e.detail.value,
            pickuptime: a.data.arrayP[e.detail.value]
        })
    },
    bindPickerDChange: function (e) {
        var a = this;
        console.log('pickerD发送选择改变，携带值为', this.data.arrayD[e.detail.value])
        a.setData({
            indexD: e.detail.value,
            returntime: a.data.arrayD[e.detail.value]
        })
    },
    bindDateChange: function (e) {
        var bookingdate = this.Getnewdate(e.detail.value)
        console.log('picker发送选择改变，携带值为', bookingdate)
        this.setData({
            date: bookingdate
        })
    },
    reduceP: function () {
        var newP = this.data.passengers - 1;
        var total = this.data.passengers + this.data.child - 1;
        var remain = 50 - total;
        if (newP >= 0) {
            this.setData({
                passengers: newP,
                total: total,
                remain: remain
            })
        }
    },
    plusP: function () {
        var newP = this.data.passengers + 1;
        var total = this.data.passengers + this.data.child + 1;
        var remain = 50 - total;
        if (total <= 50) {
            this.setData({
                passengers: newP,
                total: total,
                remain: remain
            })
        }
    },
    reduceC: function () {
        var newC = this.data.child - 1;
        var total = this.data.passengers + this.data.child - 1;
        var remain = 50 - total;
        if (newC >= 0) {
            this.setData({
                child: newC,
                total: total,
                remain: remain
            })
        }
    },
    plusC: function () {
        var newC = this.data.child + 1;
        var total = this.data.passengers + this.data.child + 1;
        var remain = 50 - total;
        if (total <= 50) {
            this.setData({
                child: newC,
                total: total,
                remain: remain
            })
        }
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
    chooseSingle: function (t) {
        this.setData({
            type: 'one way',
            isOn: 'oneway'
        })
        console.log(this.data.type);
    },
    chooseReturn: function (t) {
        this.setData({
            type: 'return',
            isOn: 'return'
        })
        console.log(this.data.type);
    },
});