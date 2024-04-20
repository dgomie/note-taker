const notes = require('express').Router();
const fs = require('fs');
const { title } = require('process');
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.promises.readFile('./db/db.json')
      .then((data) => res.json(JSON.parse(data)))
      .catch((err) => res.status(500).json({ error: err.toString() }));
  });

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };

    // Convert the data to a string so we can save it
    const reviewString = JSON.stringify(newNote);

    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      let savedData = JSON.parse(data);
      savedData.push(newNote)

      const newData = JSON.stringify(savedData)
      
      fs.writeFile(`./db/db.json`, newData, (err) =>
      err
        ? console.error(err)
        : console.log(
            `New note has been written to JSON file`
          )
        );
    })
    }
});

module.exports = notes;
