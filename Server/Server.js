const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const controllerNotes = require('./controllerNotes.js');
const server = express();
const URL = '/api/notes';
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.patch(URL, controllerNotes.complete);
server.delete(URL+'/:id', controllerNotes.deleteNote);
server.put(URL, controllerNotes.updateNote);
server.post(URL, controllerNotes.addNote);

server.get(URL, controllerNotes.getAllNotes);
server.get(URL+'/:id', controllerNotes.getNote);

server.listen(5000);