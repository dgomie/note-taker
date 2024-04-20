const notes = require('express').Router();
const fs = require('fs')
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.promises.readFile('./db/db.json')
      .then((data) => res.json(JSON.parse(data)))
      .catch((err) => res.status(500).json({ error: err.toString() }));
  });

// POST Route for a new UX/UI tip
// tips.post('/', (req, res) => {
//   console.log(req.body);

//   const { username, topic, tip } = req.body;

//   if (req.body) {
//     const newTip = {
//       username,
//       tip,
//       topic,
//       tip_id: uuidv4(),
//     };

//     readAndAppend(newTip, './db/tips.json');
//     res.json(`Tip added successfully`);
//   } else {
//     res.error('Error in adding tip');
//   }
// });

module.exports = notes;
