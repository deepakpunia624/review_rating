const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/basic1');

mongoose.connect("mongodb://127.0.0.1:27017/review_rating", {
    useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
    console.log("mongoose Connection Error", err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});