const express = require("express")
const path = require("path")

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

//Create Routes
// ============================
// Home page route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// Note page route 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// Display notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

// App Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  })