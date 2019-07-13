var myJson = {
    "name": "Dome",
    "job": "CTO",
    "courses" : [
        "angular","nodejs"
    ]
}

var myJavascripObject = {
    name: "Dome",
    job: "CTO",
    major: "api",
    getName: function(){
        detail = "I'm JavaScript Object" 
        console.log(detail)
    }
}
//! === JavaScript Object value can be any datatype including a function (CANNOT do with JSON)

console.log('data is {JSON Object} ==', myJson);
console.log('data is {JavaScript Object} ==', myJavascripObject);

myJavascripObject.getName();

myName = myJson.name;
console.log('Access the name ==',myName)

//TODO ==> convert === JS value -> JSON string 
var myInfo = JSON.stringify(myJson);

console.log('after stringify data:{Object} ==', myInfo);

myName = myInfo.name;
console.log('Access the name ==', myName)
console.log('DO - JSON parse')

//TODO ==> convert === JSON string -> JS object
var afterParse = JSON.parse(myInfo);

console.log('after parse data:{JSON}', afterParse)
myNewName = afterParse.name;
console.log('Access the name ==', myNewName)