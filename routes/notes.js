const notes = require("express").Router();
const fs = require("fs");
const { title } = require("process");
const uuid = require("../helpers/uuid");
// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  fs.promises
    .readFile("./db/db.json")
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

// POST Route for a new UX/UI note
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      id: uuid(),
      title,
      text,
    };

    // Convert the data to a string so we can save it
    const reviewString = JSON.stringify(newNote);

    fs.readFile(`./db/db.json`, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      let savedData = JSON.parse(data);
      savedData.push(newNote);

      const newData = JSON.stringify(savedData);

      fs.writeFile(`./db/db.json`, newData, (err) =>
        err
          ? console.error(err)
          : console.log(`New note has been written to JSON file`)
      );
      res.json({ message: `Note has been added` });
    });
  }
});

notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  const noteId = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.toString() });
    }

    let savedData = JSON.parse(data);
    savedData = savedData.filter((note) => note.id !== noteId);

    fs.writeFile("./db/db.json", JSON.stringify(savedData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.toString() });
      }

      console.log(`Note with id ${noteId} has been deleted from JSON file`);
      res.json({ message: `Note with id ${noteId} has been deleted` });
    });
  });
});

module.exports = notes;
