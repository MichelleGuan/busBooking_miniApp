// templetes/footer.js
//初始化数据  
var app = getApp();
function tabbarinit() {
  if (app.globalData.lang == 'en') {
    return [
      {
        "current": 0,
        "pagePath": "/mii_ang/pages/service/service",
        "iconPath": "/images/icon/icon_shuttle_unselect@2x.png",
        "selectedIconPath": "/images/icon/icon_shuttle_selected@2x.png",
        "text": "shuttle",
      },
      {
        "current": 0,
        "pagePath": "/mii_ang/pages/myBooking/myBooking",
        "iconPath": "/images/icon/icon_my_ticket_unselect@2x.png",
        "selectedIconPath": "/images/icon/icon_my_ticket_selected@2x.png",
        "text": "my tickets"

      },
      {
        "current": 0,
        "pagePath": "/mii_ang/pages/info/info",
        "iconPath": "/images/icon/icon_info_unselect@2x.png",
        "selectedIconPath": "/images/icon/icon_info_selected@2x.png",
        "text": "Info"
      }
    ]}
    return[
      {
        "current": 0,
        "pagePath": "/mii_ang/pages/service/service",
        "iconPath": "/images/icon/icon_shuttle_unselect@2x.png",
        "selectedIconPath": "/images/icon/icon_shuttle_selected@2x.png",
        "text": "可选车次",
      },
      {
        "current": 0,
        "pagePath": "/mii_ang/pages/myBooking/myBooking",
        "iconPath": "/images/icon/icon_my_ticket_unselect@2x.png",
        "selectedIconPath": "/images/icon/icon_my_ticket_selected@2x.png",
        "text": "我的订单"

      },
      {
        "current": 0,
        "pagePath": "/mii_ang/pages/info/info",
        "iconPath": "/images/icon/icon_info_unselect@2x.png",
        "selectedIconPath": "/images/icon/icon_info_selected@2x.png",
        "text": "其他信息"
      }
    ]
  }
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
       var otabbar;
       var bindData = {};
       otabbar = tabbarinit();
       otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
       otabbar[id]['current'] = 1;
       bindData[bindName] = otabbar
       target.setData({ bindData });
}
module.exports = {
  tabbar: tabbarmain
}
