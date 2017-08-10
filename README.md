# Uniprof

Universal javascript profiler for any platform

## Building

From repository:
```
git clone https://github.com/caiiiycuk/uniprof.git
cd uniprof
npm install -g
```

# Using

See screencast

## Using symbols map

uniprof support symbols map by passing symbols file:

```
shortname1:fullname1
shortname2:fullname2
...
```

## How To Test

```
node test/test-all.js
```

## Limitations

Correct profiling functions with try/catch blocks is not supported