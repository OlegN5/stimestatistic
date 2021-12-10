const firebaseConfig = {
    apiKey: "AIzaSyBFtqYG8OVlI4E8VdBEMW9mLCBhfeUHHeI",
    authDomain: "stimeforone.firebaseapp.com",
    projectId: "stimeforone",
    storageBucket: "stimeforone.appspot.com",
    messagingSenderId: "302327929792",
    appId: "1:302327929792:web:7f6a874a88fc988fc28625",
    measurementId: "G-WF2R2WM1Y6"
  }
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  var db = firebase.firestore()


var chatid = "-1001476218810";
var tokenTel = "5097081300:AAGaq_J8zZiImhfZIR1U9XjnJjvH_vKYiTI";
var text = "Всем привет! <b>Я ваш бот</b> информатор! <b>stimestatistic</b>";

otpravka(tokenTel,text,chatid);

function otpravka(tokenTel,text,chatid){
  var z=$.ajax({  
  type: "POST",  
  url: "https://api.telegram.org/bot"+tokenTel+"/sendMessage?chat_id="+chatid,
  data: "parse_mode=HTML&text="+encodeURIComponent(text), 
  }); 
 };


document.getElementById('sname').addEventListener('change', function() {
    console.log("з/р поменялся")
    document.getElementById('statButton').disabled = false
   
    
})

function getTimeSmeny (dataTimeSmeny) {
            console.log('dataTimeSmeny2', dataTimeSmeny)
            console.log('new Date(dataTimeSmeny)', new Date(dataTimeSmeny))
            const dataNow = new Date(dataTimeSmeny)

            console.log("dataNow", dataNow)
            
            let smenaStart = dataNow

        console.log("dataNow.getHour", dataNow.getHours())

        if (dataNow.getHours()>= 9 && dataNow.getHours() < 21) {
            //Дневная смена

            smenaStart.setHours(9);
            smenaStart.setMinutes(0) 
            return smenaStart 
        } else if (dataNow.getHours() >= 21) {
            //Ночная смена

            smenaStart.setHours(21);
            smenaStart.setMinutes(0)
            return smenaStart 
        } else if (dataNow.getHours() < 9) { //<9
            //Ночная смена следующая дата( после 00:00) 

            smenaStart.setDate(dataNow.getDate()-1)
            smenaStart.setHours(21);
            smenaStart.setMinutes(0)
            return smenaStart 
        }

}

function tableCreate (my){
    tStart=my.timeStart
    tStop=my.timeStop
    duration = tStop.seconds - tStart.seconds
    

}


function sumStat (my) {
    tStart=my.timeStart
    tStop=my.timeStop
    duration = tStop.seconds - tStart.seconds
    console.log("my",my.name)
    if (my.name==="Саша") {
        durSa += duration
    } else if (my.name==="Костя") {
        durKo += duration
    } else if (my.name==="Марк") {
        durMa += duration
    } else if (my.name==="Сергей" || my.name==="Сергей Измайлов") {
        durSe += duration
    } else if (my.name==="Олег") {
        durOl += duration
    } else if (my.name==="Инна") {
        durIn += duration
    } else if (my.name==="Сергей Неретин") {
        durSn += duration
    }
    console.log("my",my.name)
    console.log("tStart", tStart.seconds)
    }

document.querySelector('#statButton').addEventListener('click', function() { 
        //document.getElementById('statButton').disabled = true
        durOl = 0 
        durSe = 0 
        durKo = 0 
        durSa = 0 
        durMa = 0 
        durIn = 0 
        durSn = 0 
        minSa = 0
        minKo = 0
        minMa = 0
        minSe = 0
        minOl = 0
        minIn = 0
        minSn = 0

        dataSmeny = document.getElementById('date').value
        timeSmeny = document.getElementById('daynight').value
        dataTimeSmeny = `${dataSmeny}T${timeSmeny}`
        console.log("dataTimeSmeny", dataTimeSmeny)
        let period = document.getElementById('period').value
        dataTimeSmenyDate = getTimeSmeny(dataTimeSmeny)
        endZapros = dataTimeSmenyDate
        endZapros.setHours(endZapros.getHours() + (Number(period)))
        console.log("endZapros", endZapros)

        


        // var d = new Date(2011, 1, 28);
        // d.setDate(d.getDate() + 2);



        db.collection(selectCollectionInBase()).where("timeStart", ">", getTimeSmeny(dataTimeSmeny))
        .where("timeStart", "<", endZapros)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //debugger
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.data())
                    sumStat (doc.data())
                    tableCreate (doc.data())
                });
                    minSa = Math.floor((durSa%3600)/60)
                    minKo = Math.floor((durKo%3600)/60)
                    minMa = Math.floor((durMa%3600)/60)
                    minSe = Math.floor((durSe%3600)/60)
                    minOl = Math.floor((durOl%3600)/60)
                    minIn = Math.floor((durIn%3600)/60)
                    minSn = Math.floor((durSn%3600)/60)

                if (Math.floor((durSa%3600)/60) < 10) {
                    minSa = `0${Math.floor((durSa%3600)/60)}`
                }
                if (Math.floor((durKo%3600)/60) < 10) {
                    minKo = `0${Math.floor((durKo%3600)/60)}`
                }
                if (Math.floor((durMa%3600)/60) < 10) {
                    minMa = `0${Math.floor((durMa%3600)/60)}`
                }
                if (Math.floor((durSe%3600)/60) < 10) {
                    minSe = `0${Math.floor((durSe%3600)/60)}`
                }
                if (Math.floor((durOl%3600)/60) < 10) {
                    minOl = `0${Math.floor((durOl%3600)/60)}`
                }
                if (Math.floor((durIn%3600)/60) < 10) {
                    minIn = `0${Math.floor((durIn%3600)/60)}`
                }
                if (Math.floor((durSn%3600)/60) < 10) {
                    minSn = `0${Math.floor((durSn%3600)/60)}`
                }

                durSaST = `${Math.floor(durSa/3600)}: ${minSa}`
                durKoST = `${Math.floor(durKo/3600)}: ${minKo}`
                durMaST = `${Math.floor(durMa/3600)}: ${minMa}`
                durSeST = `${Math.floor(durSe/3600)}: ${minSe}`
                durOlST = `${Math.floor(durOl/3600)}: ${minOl}`
                durInST = `${Math.floor(durIn/3600)}: ${minIn}`
                durSnST = `${Math.floor(durSn/3600)}: ${minSn}`

                document.getElementById('statistic').textContent = `ОБНОВЛЕНО: ${new Date()}`
                document.getElementById('sa').textContent = `Линкевич отработал: ${durSaST}`
                document.getElementById('ma').textContent = `Смирнов отработал: ${durMaST}`
                document.getElementById('ko').textContent = `Ясинский отработал: ${durKoST}`
                document.getElementById('ol').textContent = `Новиков отработал: ${durOlST}`
                document.getElementById('se').textContent = `Измайлов отработал: ${durSeST}`
                document.getElementById('in').textContent = `Непомнящая отработала: ${durInST}`
                document.getElementById('sn').textContent = `Неретин отработал: ${durSnST}`

                text = `${dataTimeSmeny} \n ${period}\n Л: ${durSaST} \n C: ${durMaST} \n Я: ${durKoST} \n Н: ${durOlST} \n И: ${durSeST} \n Не: ${durInST}`
                otpravka(tokenTel,text,chatid);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log('statistic')
        document.getElementById('statButton').disabled = false
})

document.querySelector('#statButton').addEventListener('dblclick', function() {
    alert('один раз ...')
})

//!!! не удалять - можно проверять разные запросы на чтение базы
// db.collection("users").where("name", "==", 'Олег')
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             //debugger
//             //debugger
//             console.log(doc.id, " => ", doc.data());     
//         });
    
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

function selectCollectionInBase() {
    document.URL == 'http://localhost:5000/' ?
    collection = 'test':
    collection = 'users'

    console.log(document.URL)
    console.log('firebase', collection)
    return collection
}


