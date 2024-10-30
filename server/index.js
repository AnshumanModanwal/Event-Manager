const express = require("express");
const app = express();
const cors = require("cors");

const database = require("./config/database")

const route = require("./routes/route")

app.use(express.json());

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

database.connect();

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Welcome my friend.."
    })
})
app.use("/api/v1/",route)

database.connect();

require("dotenv").config();
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
