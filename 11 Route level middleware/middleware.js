// 👉 Create Middleware

module.exports = reqFilter = (req, res, next) => {
    // If user not entered any age
    if(!req.query.age){
        res.send("Please provide your age")
    }
    // If user below 18 years
    else if(req.query.age < 18){
        res.send("You cannot access this site")
    }
    else{
        next();
    }
}