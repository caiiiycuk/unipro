function a() {
    u$k.push(0);
    var u$f = "a", u$l = u$t[u$f] = u$t[u$f] || [ 0, 0, 0 ], u$e = u$n(), u$d;
    var a = 0;
    var b = 2;
    if (b == 0) {
        function z(a) {
            u$k.push(0);
            var u$f = "z", u$l = u$t[u$f] = u$t[u$f] || [ 0, 0, 0 ], u$e = u$n(), u$d;
            if (a == 7) {
                u$r = 2;
                u$d = u$n() - u$e;
                u$k[u$k.length - 2] += u$d;
                u$l[0] += u$d;
                u$l[1] += u$d - u$k.pop();
                u$l[2] += 1;
                return u$r;
            }
            {
                u$r = 4;
                u$d = u$n() - u$e;
                u$k[u$k.length - 2] += u$d;
                u$l[0] += u$d;
                u$l[1] += u$d - u$k.pop();
                u$l[2] += 1;
                return u$r;
            }
        }
        {
            u$r = z(a);
            u$d = u$n() - u$e;
            u$k[u$k.length - 2] += u$d;
            u$l[0] += u$d;
            u$l[1] += u$d - u$k.pop();
            u$l[2] += 1;
            return u$r;
        }
    } else {
        {
            u$r = b;
            u$d = u$n() - u$e;
            u$k[u$k.length - 2] += u$d;
            u$l[0] += u$d;
            u$l[1] += u$d - u$k.pop();
            u$l[2] += 1;
            return u$r;
        }
    }
    u$d = u$n() - u$e;
    u$k[u$k.length - 2] += u$d;
    u$l[0] += u$d;
    u$l[1] += u$d - u$k.pop();
    u$l[2] += 1;
}