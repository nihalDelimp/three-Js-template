import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'

let j = {a : 1 , b : 1 };
const root = ReactDOM.createRoot(document.getElementsByClassName("webgl")[0]);


//resolution based on screen size 
//repeat  in json file not implemented LARGE => repeat , REQULAR => non-repeat 
//use poweroftwo texture or resize in backend  for better performance  i.e ["8", "16", "32", "64", "128", "256", "512", "1024", "2048"]
//may be slow performace in firefox  and edge due to non-poweroftwo  

let i = [512, 768,1536, 2048]
//[256 * 4, 256 * 6, 256 * 8]
const needle = Math.max(window.innerWidth, window.innerHeight);
const numbers = i //[1, 10, 7, 2, 4, 9];
numbers.sort((a, b) => {
    return Math.abs(needle - a) - Math.abs(needle - b);
})
let max = numbers[0];
// alert(max); 
 
(async() => {

    let t = await fetch(`assets/content/${max}.json`)
        .then(r => r.json())
        .then(e => {
console.log(e,"Nihallleee")
            root.render(<App {...e}/>);

         })
})()