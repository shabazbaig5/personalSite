// const axios = require('axios');

// var clicked = function(){

//     console.log('clicked');
//     // document.querySelector('.btmBox').classList.toggle('show');

// }


var disThing = document.querySelector(".showThings");

console.log(disThing);

disThing.onclick = () => {
    axios.get('/contact/hobbies')
        .then((res)=>{
            let hobbies = res.data;
            // console.log((res.data));
            // let hobbyDisp = documnet.querySelector('.hobbyDisp');
            let populated = document.querySelector('.hobbyDisp div')
            // populated.classList.add('populated');


            if(populated.classList.contains('populated')){
                hobbies.forEach(element => {
                    let eachHobby = document.createElement('p');
                    let pText = document.createTextNode(element.hobby);
                    eachHobby.appendChild(pText);
                    populated.appendChild(eachHobby);
                    // populated.appendChild(eachHobby);
                });
            }
            else{
                console.log('already printed');
                
            }

            
            // hobbyDisp.appendChild(eachHobby);
            populated.classList.remove('populated');
        })
         .catch((err) => {
            console.error(err);
         })
} 



