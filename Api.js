//This JavaScript code is using the Express.js framework to create a simple web server 
//importing required modulesconst express = require("express")
const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.9", express.static("C:/Users/OMKAR/Desktop/New folder/HACKATHON/codemirror-5.65.9"))
app.use("/codemirror-5.65.9", express.static(__dirname + "/codemirror-5.65.9"))
//This code sets up a route for the root URL ("/").
app.get("/", function (req, res) {
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("C:/Users/OMKAR/Desktop/New folder/HACKATHON/index.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code  // requesting code from api
    var input = req.body.input  // requesting input from api
    var lang = req.body.lang  // requesting which language from api
    try {
        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++",options:{timeout:10000} }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                        //res is the response object
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++",options:{timeout:10000} }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {  // send response only if data has any output
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })  // incase there is no output
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if(lang == "Python"){
            if (!input) {
                varData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {  // send response only if data has any output
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" }) // incase there is no object
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {  // send response only if data has any output
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })  // incase there is no object
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})

app.listen(8080)