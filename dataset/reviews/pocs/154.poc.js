var sanitizeHtml = require('sanitize-html');

var dirty = '!<textarea>&lt;/textarea&gt;&lt;svg/onload=prompt`xs`&gt;</textarea>!';
var clean = sanitizeHtml(dirty, {
    allowedTags: [ 'textarea' ]
});

console.log(clean);

// !<textarea></textarea><svg/onload=prompt`xs`></textarea>!