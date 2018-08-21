var postfix = "_deadtime";

function put(e, t, r) {
    wx.setStorageSync(e, t);
    var a = parseInt(r);
    if (0 < a) {
        var o = Date.parse(new Date());
        o = o / 1e3 + a, wx.setStorageSync(e + postfix, o + "");
    } else wx.removeStorageSync(e + postfix);
}

function get(e, t) {
    var r = parseInt(wx.getStorageSync(e + postfix));
    if (r && parseInt(r) < Date.parse(new Date()) / 1e3) return t || void 0;
    var a = wx.getStorageSync(e);
    return a || t;
}

function remove(e) {
    wx.removeStorageSync(e), wx.removeStorageSync(e + postfix);
}

function clear() {
    wx.clearStorageSync();
}

module.exports = {
    put: put,
    get: get,
    remove: remove,
    clear: clear
};