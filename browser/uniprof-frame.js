//
// Browser part
// Profiling based on frames
//

var u$r;
var u$k = [0];
var u$t = {};
var u$frame_opened;
var u$frame_index = 0;
var u$frame_last = -1;

var u$n = function() {
    return 0
}

var u$frames = function(count) {
    u$n = function() {
        return performance.now();
    }
    u$frame_index = 0;
    u$frame_last = count;
}

var u$frame_open = function() {
    if (u$frame_index === u$frame_last) {
        return;
    }

    u$t = {};
    u$k = [0];
    u$frame_opened = u$n();
    u$frame_index += 1;
}

var u$frame_close = function() {
    if (u$frame_index > u$frame_last) {
        return;
    }

    var duration = u$n() - u$frame_opened;
    console.log('==== Frame ', u$frame_index);
    u$stats(50, duration);
    if (u$frame_index === u$frame_last) {
        u$n = function() {
            return 0
        };
        u$frame_last = -1;
    }
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
    console.log('Acc time: ', accTime, 'ms', accTime / duration * 100, '%')
}