var marked = require('../package/lib/marked');
var text = "INDEX(string, pattern[, start)` : searches for the first occurrence of pattern in string, starting from start: `INDEX(\"123123\", \"23\", 3)` == `5`\n" +
    "`INSERT(new, old[, start][, length][, pad])` : inserts the new string into the old string after the specified position (default is 0), new string is truncated or padded (default is \" \") to the specified length, if start is beyond the end of old old will be padded\n" +
    "`LASTPOS(pattern, string[, start])` : searches backwards for the last occurrence of pattern in string, starting from start: `LASTPOS(\"123123\", \"23\", 4)` == `2`\n" +
    "`LINES(file)` : returns the number of lines typed ahead at the interactive stream: `push(\"a line\"); push(\"second line\"); lines(STDIN); /* == 2 */`\n" +
    "`MAX(number, number[, number,...])` : obvious\n" +
    "`MIN(number, number[, number,...])` : obvious\n" +
    "`OPEN(filehandle, filename[, \"APPEND\"|\"READ\"|\"WRITE\"])` : opens file, returns boolean for success: `OPEN(\"MyCon\", \"CON:160/50/320/100/MyCon/CDS\")` == `1`\n" +
    "`OVERLAY(new, old[, start][, length][, pad])` : overlays new string onto old one at start for length chars padding with pad if necessary: `OVERLAY(\"4\", \"123\", 5, 5)` == `\"123-4----\"`\n";


console.time('Time taken');
marked(text);
console.timeEnd('Time taken');

console.time('Time taken with 46 extra characters');
marked(text+"`POS(pattern, string[, start])` : same as index");
console.timeEnd('Time taken with 46 extra characters');