const serverless = require('serverless-http');
const express = require('express');
const app = express();
const {
    addOrUpdateCharacter,
    getCharacters,
    deleteCharacter,
    getCharacterById,
} = require('./dynamo');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/characters', async (req, res) => {
    try {
        const characters = await getCharacters();
        res.json(characters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'ERROR' });
    }
});

app.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const character = await getCharacterById(id);
        res.json(character);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'ERROR' });
    }
});

app.post('/characters', async (req, res) => {
    const character = req.body;
    try {
        const newCharacter = await addOrUpdateCharacter(character);
        res.json(newCharacter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'ERROR' });
    }
});

app.put('/characters/:id', async (req, res) => {
    const character = req.body;
    const { id } = req.params;
    character.id = id;
    try {
        const newCharacter = await addOrUpdateCharacter(character);
        res.json(newCharacter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'ERROR' });
    }
});

app.delete('/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteCharacter(id));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'ERROR' });
    }
});

const port = process.env.PORT || 3000;
/*app.listen(port, () => {
    console.log(`listening on port port`);
});*/
module.exports.handler = serverless(app);