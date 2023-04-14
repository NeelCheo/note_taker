const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
notes.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
notes.post('/', (req, res) => {
  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = notes;