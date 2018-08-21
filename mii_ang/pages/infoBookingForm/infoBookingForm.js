// mii_ang/pages/infoBookingForm/infoBookingForm.js
var app = getApp();

Page({
	data : {
		agree : false,
		firstname : '',
		lastname : '',
		phone : '',
		email : '',
		pageConstant : {},

		// values from previous page
		type : '',
		bookingdate : '',
		pickuptime : '',
		returntime : '',
		adult : 0,
		child : 0,
		routeline : '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad : function(options) {
		var o = this;
		o.setData({
			pageConstant : app.globalData.lang == 'en' ? app.globalData.language.en : app.globalData.language.cn
		});
		wx.setNavigationBarTitle({
			title : this.data.pageConstant.booking_confirmation_nav,
		});

		//type=return
		//bookingdate=01/08/2018
		//pickuptime=10:15
		//returntime=12:15
		//adult=3
		//child=1
		//routeline=1
		this.setData({
			type : options.type,
			bookingdate : options.bookingdate,
			pickuptime : options.pickuptime,
			returntime : options.returntime,
			adult : options.adult,
			child : options.child,
			routeline : options.routeline
		});

	},

	formSubmit : function(e) {
		var regEn = /^[A-Za-z]+$/;
		var regEmail = /^.*@.*$/;
		var regPhone = /^\d+$/;
		var a = this;
		//console.log('form发生了submit事件，携带数据为：', e.detail.value);
		if (this.data.agree == false) {
			wx.showModal({
				title : a.data.pageConstant.formB_infoT1,
				content : a.data.pageConstant.formB_infoC1,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000',
				success : function(res) {},
				fail : function(res) {},
				complete : function(res) {},
			})
		} else if (this.data.firstname.trim() == '') {
			console.log(this.data);
			wx.showModal({
				title : a.data.pageConstant.submit_warning_title,
				content : a.data.pageConstant.submit_warning_firstname_empty,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000'
			})
		}

		/*    else if (regEn.test(this.data.firstname) != true) {
		      wx.showModal({
		        title: a.data.pageConstant.submit_warning_title,
		        content: a.data.pageConstant.submit_warning_firstname_invalid,
		        showCancel: false,
		        confirmText: a.data.pageConstant.confirm,
		        confirmColor: '#000000'
		      })
		    }*/

		else if (this.data.lastname.trim() == '') {
			console.log(this.data);
			wx.showModal({
				title : a.data.pageConstant.submit_warning_title,
				content : a.data.pageConstant.submit_warning_lastname_empty,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000'
			})
		}

		/*      else if (regEn.test(this.data.lastname) != true) {
		        wx.showModal({
		          title: a.data.pageConstant.submit_warning_title,
		          content: a.data.pageConstant.submit_warning_lastname_invalid,
		          showCancel: false,
		          confirmText: a.data.pageConstant.confirm,
		          confirmColor: '#000000'
		        })
		      }*/

		else if (this.data.phone.trim() == '') {
			console.log(this.data);
			wx.showModal({
				title : a.data.pageConstant.submit_warning_title,
				content : a.data.pageConstant.submit_warning_phone_empty,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000'
			})
		} else if (regPhone.test(this.data.phone) != true) {
			wx.showModal({
				title : a.data.pageConstant.submit_warning_title,
				content : a.data.pageConstant.submit_warning_phone_invalid,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000'
			})
		} else if (this.data.email.trim() == '') {
			console.log(this.data);
			wx.showModal({
				title : a.data.pageConstant.submit_warning_title,
				content : a.data.pageConstant.submit_warning_email_empty,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000'
			})
		} else if (regEmail.test(this.data.email) != true) {
			wx.showModal({
				title : a.data.pageConstant.submit_warning_title,
				content : a.data.pageConstant.submit_warning_email_invalid,
				showCancel : false,
				confirmText : a.data.pageConstant.confirm,
				confirmColor : '#000000'
			})
		} else {
			app.util.request({
				url : "entry/wxapp/addtocart",
				data : {
					uniacid : app.siteInfo.uniacid,
					type : this.data.type, // 'one way' or 'return'
					bookingdate : this.data.bookingdate, // 日期: format: 07/08/2018或者为空，onload的时候调用是空
					//bookingtime: null, // 时间: format: 19:30 或者为空，onload的时候调用是空
          
					pickuptime : this.data.pickuptime,
					returntime : this.data.returntime,
					bookingseats_adults : this.data.adult,  // 成人人数数量
					bookingseats_kids : this.data.child,    // 儿童人数数量
					pickupaddress : this.data.routeline,    // 接客地址
					dropaddress : this.data.routeline,      // 下客地址
					email : this.data.email,
					firstname : this.data.firstname,
					lastname : this.data.lastname,
					phone : this.data.phone,
          routeline: this.data.routeline,
				},
				cachetime : "30",
				success : function(data) {
          console.log(data);
          var routelines = JSON.stringify(data.data.data.routelines);
          console.log(data.data.data);
					wx.navigateTo({
						url : '/mii_ang/pages/detail/detail?' +
              'ordersn=' + data.data.data.bookingsn + '&' + 
							'uniacid=' + app.siteInfo.uniacid + '&' + 
							'type=' + this.data.type +  '&' + // 'one way' or 'return'
							'bookingdate=' + this.data.bookingdate +  '&' + // 日期=' + format=' + 07/08/2018或者为空，onload的时候调用是空
							'pickuptime=' + this.data.pickuptime + '&' + 
							'returntime=' + this.data.returntime + '&' + 
              'bookingseats_adults=' + this.data.bookingseats_adults +  '&' + // 成人人数数量
              'bookingseats_kids=' + this.data.bookingseats_kids +  '&' + // 儿童人数数量
							'pickupaddress=' + this.data.routeline +  '&' + // 接客地址
							'routelines=' + routelines +  '&' + // 接客地址
							
							'dropaddress=' + this.data.routeline +  '&' + // 下客地址
							'email=' + this.data.email + '&' + 
							'firstname=' + this.data.firstname + '&' + 
							'lastname=' + this.data.lastname + '&' + 
							'phone=' + this.data.phone
					})
					//console.log(t.data);
				}
			})
		}

		wx.setStorage({
			key : "keyB",
			data : e.detail.value
		})
	},

	/**
	 * 页面的初始数据
	 */


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady : function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow : function() {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide : function() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload : function() {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh : function() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom : function() {},

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
	switch1Change : function(e) {
		console.log('switch1 发生 change 事件，携带值为', e.detail.value);
		if (e.detail.value == false) {
			this.setData({
				agree : 'false',
			})
		} else {
			this.setData({
				agree : 'true',
			})
		}
	},
	firstname : function(e) {
		this.setData({
			firstname : e.detail.value,
		})
	},
	lastname : function(e) {
		this.setData({
			lastname : e.detail.value,
		})
	},
	phone : function(e) {
		this.setData({
			phone : e.detail.value,
		})
	},
	email : function(e) {
		this.setData({
			email : e.detail.value,
		})
	},
	onShareAppMessage : function(t) {
		var a = this;
		return "button" === t.from && console.log(t.target), {
				title : 'Chastone Shuttle Bus',
				path : "/pages/index/index",
				imageUrl : '/images/beautyShare.jpg',
				success : function(t) {},
				fail : function(t) {}
			};
	},
  terms: function(){
    wx.navigateTo({
      url: '/mii_ang/pages/terms/terms'
    })
  }
})