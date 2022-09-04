const fs = require('fs');

const router = require('express').Router();

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

router.post('/notes', (req, res) => {
    console.log('Saving your notes');
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        let allNotes = JSON.parse(data);

        const {title, text} = req.body;
        if (req.body){
            const newNote = {
                title,
                text,
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