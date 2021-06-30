const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'ASIASIUWYCEFZEJXCPGK',
    secretAccessKey: 'PjCEtTILs4YGBY4UcUkl84lv7s06BvWKgbAYr7M5',
    sessionToken: 'FwoGZXIvYXdzENH//////////wEaDLi7KYYy0RtmcVkTBiLCAVIimFLlVAeKHFNmWg3uNA8096Od0Vinrxc258x0U2zs4KjkFbZMUEhNP1TLeDS8tYkbqSE7GKeCAv+K2M6XgUOBU485wKlpANvdxyiRDChrzXqbLIkAqiqlcy7iIxF+HQvlCWWUg4cuKP9HJiqqu450LDQCX6aZf4/rp3Ysq7Q9CjOwAEHOKp5jbGJaEqblX7C1LbU5MrbBcbEcBsE4iR72iYL+owP387GxicXllpGhf1qQkk/Nn187iwgB68SGE4bcKI/e7oYGMi0pVAd2vWxEmwXy20EvpXPTvLTE8JBf/NCTcN4Up6xKsXbWg3v+wp6O/ukMF+E=',
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'prueba-api';
const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const characters = await dynamoClient.scan(params).promise();
    return characters;

};

const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character,
    };
    return await dynamoClient.put(params).promise();
};

const deleteCharacter = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};
const info = {
    "id": "0",
    "name": "Harry Potterr",
    "species":"human",
    "gender":"male",
    "house":"Gryffindor",
    "dateOfBirth":"31-07-1980",
    "yearOfBirth":1980,
    "ancestry":"half-blood",
    "eyeColour":"green",
    "hairColour":"black"
    ,"wand":{
        "wood":"holly"
        ,"core":"phoenix feather",
        "length":11
    },"patronus":"stag"
    ,"hogwartsStudent":true,
    "hogwartsStaff":false,
    "actor":"Daniel Radcliffe",
    "alive":true,
    "image":"http://hp-api.herokuapp.com/images/harry.jpg"
}
addOrUpdateCharacter(info);
//getCharacters();
module.exports = {
    dynamoClient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacter,
};