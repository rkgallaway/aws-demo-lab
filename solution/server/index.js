'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios')
const os = require('os');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000
const hostname = os.hostname();
let pokemonList = [];
let products = [];

const getPokemon = async () => {
    try {
        const pokemonResults = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=3');
        pokemonList = pokemonResults.data.results;
    } catch (error) {
        console.log(error);
    }
}

const getProducts = async () => {
    // this is just a possible example. use your own api details
    try {
        const productResults = await axios.get(process.env.API_GATEWAY_URL);
        products = JSON.parse(productResults.data.body);
    } catch (error) {
        console.log(error);
    }
}

app.get('/', async (req, res, next) => {

    getPokemon();
    getProducts();

    const data = {
        Service: 'Demo EC2 Server',
        Hostname: hostname,
        data: {
            pokemonList,
            products,
        },
    }

    res.status(200).send(data);
});

app.listen(PORT, () => console.log('Listening on port: ', PORT));