var _compData = {
    "toast.isHide": !1,
    "toast.content": ""
}, toastPannel = {
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
    }
};

function ToastPannel() {
    var t = getCurrentPages(), a = t[t.length - 1];
    return this.__page = a, Object.assign(a, toastPannel), a.toastPannel = this, a.setData(_compData), 
    this;
}

module.exports = {
    ToastPannel: ToastPannel
};