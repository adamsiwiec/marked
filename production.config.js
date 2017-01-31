module.exports = {
  apps : [{
    name       : "marked",
    script     : "./bin/www",
    instances  : 4,
    exec_mode  : "cluster"
  }]
}
