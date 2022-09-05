// Required dependencies
const fs = require('fs');
const router = require('express').Router();

// route to get all of the notes within the db.json database
router.get('/notes', (req, res) => {
    console.log('Start adding your notes');
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }else {
            return res.json(JSON.parse(data));
        }
    })
});

// route to add new notes within the db.json database
router.post('/notes', (req, res) => {
    console.log('Saving your notes');
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        let allNotes = JSON.parse(data);

// save a new note request to an object that is pushed to the notes array within the db.json file with a randomized id
        const {title, text} = req.body;
        if (req.body){
            const newNote = {
                title,
                text,
                //assigns a random number as a string to the id property of the new note. This is used later in the delete route
                id: Math.floor((1 + Math.random()) * 100).toString()
            };
            console.log(newNote.id);

            allNotes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(allNotes),(err) => {
                if (err) {
                    console.log(err);
                }else {
                    res.json(allNotes);
                }
            })
        } 
    })
});

//this retreives a note by the id then filters it out from the db.json file so that it is no longer part of the database
router.delete('/notes/:id', (req, res) => {
    // console.log(req);
    if(req) {
        console.log('deleting your note')
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        let allNotes = JSON.parse(data);
        console.log(allNotes)
    allNotes = allNotes.filter(note => (note.id !== req.params.id));
        console.log(allNotes);
        
    fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) => {
        if (err) {
            console.log(err);
        }else {
            console.log('Your note has been deleted');
            res.json(allNotes);
        }
    })
    })
})

module.exports = router;