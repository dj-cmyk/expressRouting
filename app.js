const express = require('express');
const ExpressError = require("./expressError")

const app = express();

app.use(express.json());


// **** ROUTES ****
app.get('/mean', (req, res, next) => {
    try {
        let {nums} = req.query
        let numArray = strTonum(nums)
        
        let value = mean(numArray)
        return res.json({
            operation: "mean",
            value: value,
        });
    } catch (err) {
        return next(err);
    } 
})

app.get('/median', (req, res, next) => {
    try {
        let {nums} = req.query
        let numArray = strTonum(nums)
    
        let value = median(numArray)
        return res.json({
            operation: "median",
            value: value,
        });
    } catch (err) {
        return next(err);
    } 
})

app.get('/mode', (req, res, next) => {
    try {
        let {nums} = req.query
        let numArray = strTonum(nums)
    
        let value = mode(numArray)
        return res.json({
            operation: "mode",
            value: value,
        });
    } catch (err) {
        return next(err);
    } 
})




// further study
app.get('/all', (req, res, next) => {
    try {
        let {nums} = req.query
        let numArray = strTonum(nums)

        let mean1 = mean(numArray)
        let median1 = median(numArray)
        let mode1 = mode(numArray)
        return res.json({
            operation: "all",
            mean: mean1,
            median: median1,
            mode: mode1,
        });
    } catch (err) {
        return next(err);
    } 
})

// **** HELPER FUNCTIONS ****
// strToNum converts the string array to numbers and checks if all items in array meet requirements
function strTonum(arr){
    if (!arr){
        throw new ExpressError('at least one number is required', 400)
    }
    let strNumsArr = arr.split(',')
    let numsArr = []
    for (let num of strNumsArr){
        let parsedNum = parseInt(num)
        if (isNaN(parsedNum)){
            throw new ExpressError(`${num} is not a number`, 400)
        } else {
            numsArr.push(parseInt(num))
        }
    }
    return numsArr
}

// **** MATH FUNCTIONS ****
function mean(numArray){
    let mean = 0
    for (let num of numArray){
        mean = mean + num
    }
    mean = mean / numArray.length
    console.log(mean)
    return mean
}

function median(numArray){
    let median = 0
    numArray.sort((a, b) => a - b);
    let length = numArray.length
    if (length % 2 === 1) {
        median = numArray[((length/2) - 0.5)]
    } else {
        let sum = numArray[length/2] + numArray[(length/2)-1]
        median = sum/2
    }
    return median
}

function mode(numArray){
    let mode = {}
    let max = 0
    let count = 0
    
    for (let i = 0; i < numArray.length; i++) {
        const item = numArray[i];
        if (mode[item]) {
            mode[item]++
        } else {
            mode[item] = 1
        }

        if (count < mode[item]) {
            max = item
            count = mode[item]
        }
    }
    return max
}



// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
  // generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
});


app.listen(3000, () => {
    console.log('app on port 3000');
})


module.exports = {
    mean: mean,
    median: median,
    mode: mode,
    strTonum: strTonum,
  };
