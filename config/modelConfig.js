const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/basic1');

mongoose.connect(process.env.URL, {
    useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
    console.log("mongoose Connection Error", err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});