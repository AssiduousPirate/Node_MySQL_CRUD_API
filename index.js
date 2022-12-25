const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use("/", require("./apis"))

app.listen(PORT, function(err){
	if (err) console.log(err)
		console.log(`Server has started on the port ${PORT}.`)
})