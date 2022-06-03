const express = require('express');
const chirpstore = require('../chirpstore');
const chirpsStore = require('../chirpstore');
let router = express.Router();

router.get('/:id', (req, res) => {
    let id = req.params.id;
    res.send(chirpsStore.GetChirp(id));
});

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    chirpstore.DeleteChirp(id);
});

router.get('/', (req, res)=> {
    // res.send(chirpsStore.GetChirps())
    const pizza = chirpsStore.GetChirps();
    const nicerData = [];

    Object.keys(pizza).forEach(key => {
        if(key === "nextid") return;

        const newChirp = {
            id: key,
            user: pizza[key].user,
            text: pizza[key].text
        };
        nicerData.push(newChirp);
    });
    res.json(nicerData);
    console.log(nicerData);
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

module.exports = router;