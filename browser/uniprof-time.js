//
// Browser part
// Profiling based on time
//

var u$r;
var u$k = [0];
var u$t = {};

var u$n = function() {
    return 0;
}

var u$start = function(time /* sec */ ) {
    u$t = {};
    u$k = [0];
    u$n = function() {
        return performance.now();
    }

    var startedAt = u$n();
    setTimeout(u$end, time * 1000, startedAt);
}

var u$end = function(startedAt) {
    var duration = u$n() - startedAt;
    u$n = function() {
        return 0;
    };

    console.log('==== Profiling results (50)');
    u$stats(50, duration);
}

var u$stats = function(limit, duration) {
    if (!limit) {
        limit = 50;
    }

    var keys = Object.keys(u$t);
    var values = Object.values(u$t);
    var sorted = keys.sort(function(a, b) {
        return u$t[b][0] - u$t[a][0];
    });
    var totalTime = 0;

    for (var i = 0; i < values.length; ++i) {
        totalTime += values[i][1];
    }

    if (!duration) {
        duration = totalTime;
    }

    console.log('TOP', limit, 'total time', totalTime, 'real time', duration);

    var accTime = 0;
    for (var i = 0; i < limit; ++i) {
        var key = sorted[i];
        var value = u$t[key];
        var total = value[0];
        var time = value[1];
        var count = value[2];
        accTime += time;
        console.log(key, 'self', time / duration * 100, '%', 'total', total / duration * 100, '%',
            'count', count);
    }
    console.log('Acc time: ', accTime, 'ms', accTime / duration * 100, '%');
}