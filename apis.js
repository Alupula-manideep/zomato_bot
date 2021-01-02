const axios = require('axios');
require('dotenv').config()
const {
    response
} = require('express');

let url = 'http://localhost:3000'

let base_url = process.env.base_url

function callGetApi(url, headers) {
    return new Promise(function (resolve, reject) {
        axios.get(url, {
                headers: headers
            })
            .then(function (res) {
                if (res.status == 200) {
                    resolve(res.data)

                } else {
                    resolve(false);
                }
            }).catch(error => {
                console.log(error);
                resolve("error");
            })
    });
}


function callPostApi(url, data, headers) {
    return new Promise(function (resolve, reject) {
        axios.post(url, data, {
                headers: headers
            })
            .then(function (res) {
                if (res.status == 200) {
                    resolve(res.data)

                } else {
                    resolve(false);
                }
            }).catch(error => {
                console.log(error);
                resolve("error");
            })
    });
}



exports.getVeg = async function getVeg() {
    const response = await callGetApi(url + '/veg')

    return response
}



exports.getNonVeg = async function getNonVeg() {
    const response = await callGetApi(url + '/nonveg')
    return response
}


exports.getSweets = async function getSweets() {
    const response = await callGetApi(url + '/sweets`')
    return response
}

exports.getChocolate = async function getChocolate(){
    const response = await callGetApi(url+'/chocolate')
    return response
}

exports.getJuice = async function getJuice(){
    const response = await callGetApi(url+'/juice')
    return response
}
exports.getLocationId = async function getLocatiionId(city){
    const response = await callGetApi(base_url +'/location?query='+ city)
    return response

}

exports.postChat = async function postChat(user,chat){

    let data = {
        username: user,
        chat: chat
    }
    const response = await callPostApi(url + '/chathistory',data)

    return response


}


  // exports updateChat = async function postChat(user,chat){
    //   let data ={
      //     username: user,
       //  }  
  // }