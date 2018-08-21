App({
    onLaunch: function() {
        console.log(this);
        // check update
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          console.log(res.hasUpdate)
        })
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '更新提示',
            content: '新版本下载失败',
            showCancel: false
          })
        })
    },
    onShow: function() {
        console.log(getCurrentPages());
    },
    onHide: function() {
        console.log(getCurrentPages());
    },
    onError: function(e) {
        console.log(e);
    },
    util: require("we7/resource/js/util.js"),
    tabBar: {
        color: "#666666",
        selectedColor: "#b58ada",
        borderStyle: "#d9d9d9",
        backgroundColor: "#fff",
    },
    globalData: {
        userInfo: null,
        webInfo: "",
        lang: "cn",
        language: {
          "en": {
            "from":"From",
            "to":"To",
            "chooseBus":"Where to",
            "bookingBtn":"BOOKING",
            "formA_title":"Departing...",
            "formA_1":"One-way or Round",
            "formA_2":"Number of Passengers",
            "formA_3":"Pickup/Return Time",
            "formA_1A":"One-way/Round*",
            "formA_1B":"Date*",
            "formA_2A":"PASSENGERS",
            "formA_2B":"CHILD",
            "formA_2C":"Total Passengers",
            "formA_2D":"Seats Remaining",
            "formA_3A":"Pick-up Time*",
            "formA_3B":"Return Time*",
            "formA_nav":"Departure From",
            "formA_infoT":"Passengers Error",
            "formA_infoC":"Please add passengers",
            "confirm":"CONFIRM",
            "next":"NEXT",
            "booking_confirmation_nav":"CONFIRMATION",

            "booking_confirmation_label":"Booking Confirmation",
            "contact_details_label":"Contact Details",
            "passanger_label": "Passanger*",
            "firstName_placeholder":"First Name*",
            "lastName_placeholder":"Last Name*",
            "mobile_placeholder": "Enter your phone/mobile number*",
            "email_placeholder":"E-mail*",
            "tips_label": "Your itinerary will be sent to this address.",
            "agree_first": "I agree to the travel's ",
            "agree_label": "terms and conditions.",

            "submit_warning_title":"Error Tips",
            
            "submit_warning_firstname_empty":"Please enter first name.",
            "submit_warning_firstname_invalid":"Please enter valid first name.",

            "submit_warning_lastname_empty":"Please enter last name.",
            "submit_warning_lastname_invalid":"Please enter valid last name.",
            
            "submit_warning_phone_empty":"Please enter telephone or mobilephone number.",
            "submit_warning_phone_invalid":"Please enter valid telephone or mobilephone number.",
            
            "submit_warning_email_empty":"Please enter email address.",
            "submit_warning_email_invalid":"Please enter valid email address.",
            
            
            "formB_agree":"I agree to the terms and conditions of travel.",
            "formB_infoT1":"Terms Error",
            "formB_infoC1":"Please agree terms and conditions",
            "formB_infoT2":"Form Error",
            "formB_infoC2":"Please finish this form",
            "formB_infoC3":"Please Enter Correct English Name",
            "formB_infoC4":"Please Enter Correct Email Adress",
            "formB_infoC5":"Please Enter Correct Phone/Mobile Number",
            "my_ticket":"My Tickets",
            "directions":"Directions?",
            "when":"When?",
            "details1":"Look Up Details",
            "details2":"Look Up Shuttle Timetables",
            "map":"MAP",
            "timetable": "TIMETABLES",


            "success_title": "Success!",
            "success_head": "Thank you for your booking. \n A copy of your travel confirmation will be Emailed to you at",
            "oneway":"One Way",
            "return": "Return",
            "terms_title": "Terms and Conditions",
            "terms_nav": "TERMS",
            "booking_nav": "BOOKING",
            "info_nav": "INFO",
            "ticket_nav": "TICKETS",
            "success_nav": "SUCCESS",
            "done": "DONE",
          },
          "cn": {
            "from":"从",
            "to":"至",
            "chooseBus":"可选车次",
            "bookingBtn":"预定座位",
            "formA_title":"即刻出发...",
            "formA_1":"单程/往返",
            "formA_2":"乘客人数",
            "formA_3":"去程与返程时间",
            "formA_1A":"单程/往返*",
            "formA_1B":"日期*",
            "formA_2A":"成人乘客",
            "formA_2B":"儿童乘客",
            "formA_2C":"乘客总人数",
            "formA_2D":"剩余座位数",
            "formA_3A":"去程时间*",
            "formA_3B":"返程时间*",
            "formA_nav":"出发自",
            "formA_infoT":"乘客信息有误",
            "formA_infoC":"请添加乘客信息",
            "confirm":"确认",
            "next":"下一步",
            "booking_confirmation_nav":"订单确认",

            "booking_confirmation_label": "订单信息确认",
            "contact_details_label": "乘客联系信息",
            "passanger_label": "乘客信息",
            "firstName_placeholder": "名字*",
            "lastName_placeholder": "姓氏*",
            "mobile_placeholder": "输入电话或者手机号码*",
            "email_placeholder": "E-mail*",
            "tips_label": "您的行程将会被发送到该邮箱地址.",
            "agree_label": "条例与规范.",
            "agree_first": "我同意本次行程的",
            "submit_warning_title":"错误提示",
            
            "submit_warning_firstname_empty":"请输入名字",
            "submit_warning_firstname_invalid":"异常的名字，请重新输入",

            "submit_warning_lastname_empty":"请输入姓名",
            "submit_warning_lastname_invalid":"异常的姓名，请重新输入",
            
            "submit_warning_phone_empty":"请输入电话号码",
            "submit_warning_phone_invalid":"异常的电话号码，请重新输入",
            
            "submit_warning_email_empty":"请输入邮箱地址",
            "submit_warning_email_invalid":"异常的邮箱地址，请重新输入",
            
            
            
            
            "formB_title":"订单信息确认",
            "formB_1":"乘客联系信息",
            "formB_1firstName":"名字*",
            "formB_1lastName":"姓氏*",
            "formB_1email":"邮箱地址*",
            "formB_1mobile":"电话号码*",
            "formB_agree":"我已经阅读过并且同意本次行程的条例与规范.",
            "formB_infoT1":"条例与规范",
            "formB_infoC1":"您需要同意我们的条例与规范才能进行下一步",
            "formB_infoT2":"表单问题",
            "formB_infoC2":"请您完成表单的填写",
            "formB_infoC3":"请您输入正确的英文名或汉语拼音",
            "formB_infoC4":"请您输入正确的邮箱地址",
            "formB_infoC5":"请您输入正确的电话号码",
            "my_ticket":"我的车票",
            "directions": "位置信息?",
            "when": "时间信息?",
            "details1": "查看地图详情",
            "details2": "查看车次时刻表",
            "map": "地 图",
            "timetable": "时刻表",
            "oneway": "单 程",
            "return": "往 返",
            "terms_title": "条例与规范",
            "terms_nav": "条例与规范",
            "success_title": "预定成功!",
            "success_head": "感谢您的订单. \n 一封电子确认邮件将会发送到: \n",
            "booking_nav":"预定行程",
            "info_nav": "更多信息",
            "ticket_nav": "我的行程",
            "success_nav": "预定成功",
            "done":"完成",
          }
        }
    },
    siteInfo: require("siteinfo.js")
});