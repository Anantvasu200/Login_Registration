const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mernbackend")
    .then(()=>{
        console.log("connection successful");
    })
    .catch((e) => {
        console.log("No connection");
    });

    // then and catch are used to handle the promise. If the promise is resolved then then is executed and if the promise is rejected then catch is executed.
    // try and catch are used to handle the exceptions. If the code inside try block throws an exception then catch block is executed.