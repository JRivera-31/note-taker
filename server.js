const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const notes = []

// Create Routes
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
    res.sendFile(path.join(__dirname, "db/db.json"))
})

// Save new notes to the db
app.post("/api/notes", (req, res) => {
    // Assign the note to variable
    let newNote = req.body

    newNote.id = Math.floor(Math.random())

    console.log(newNote.id)

    // Push it to the notes array
    notes.push(newNote)

    // Write the array to the db
    fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), err => {
        if (err) throw err

        console.log("Note has been written to the file..")
        
    })

    // Return the notes array
    res.send(notes)
   
})

// Delete notes from the db
app.delete("/api/notes/:notes", (req, res) => {
    const noteID = req.params.notes
    const removed = notes.splice(notes, noteID)
    res.json(removed)
})


// App Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  })