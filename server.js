// Require packages
const express = require("express")
const path = require("path")
const fs = require("fs")

// Create Server
const app = express()
// Dynamic porting
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// To store notes
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

// Display all notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"))
})

// Save new notes to the db
app.post("/api/notes", (req, res) => {
    // Assign the note to variable
    let newNote = req.body

    // Add id to note
    newNote.id = notes.length

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
app.delete("/api/notes/:id", (req, res) => {
    // Get the note ID
    const noteID = parseInt(req.params.id)
    console.log(noteID)

    // Remove selected note
    notes.splice(noteID, 1)

    // Reassign IDs
    for (let i = 0; i < notes.length; i++) {
        notes[i].id = i
    }

    // Write new array to the db
    fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), err => {
        if (err) throw err

        console.log("Note has been deleted..")
        
    })

    // Send array
    res.json(notes)
})


// App Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  })