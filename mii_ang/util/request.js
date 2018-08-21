Object.defineProperty(exports, "__esModule", {
    value: !0
});

var app = getApp();

function request(t, n, s, u) {
    return n || (n = {}), n.m || (n.m = "mii_ang"), u || (u = "0"), s || (s = "POST"), 
    new Promise(function(e, a) {
        app.util.request({
            url: "entry/wxapp/" + t,
            data: n,
            method: s,
            cachetime: u,
            success: function(t) {
                1 == t.data.status && e(t.data), a(t.data);
            },
            fail: function(t) {
                console.log(t), a(t.data && t.data.msg ? t.data.msg : t.errmsg);
            },
            complete: function() {}
        });
    });
}

function iget(t, e, a) {
    return request(t, e, "GET", a);
}

function ipost(t, e, a) {
    return request(t, e, "POST", a);
}

exports.default = {
    get: iget,
    post: ipost
};