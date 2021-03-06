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
    } else if (my.name==="Сергей") {
        durSe += duration
    } else if (my.name==="Олег") {
        durOl += duration
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
    
        dataSmeny = document.getElementById('date').value
        timeSmeny = document.getElementById('daynight').value
        dataTimeSmeny = `${dataSmeny}T${timeSmeny}`
        console.log("dataTimeSmeny", dataTimeSmeny)

        db.collection(selectCollectionInBase()).where("timeStart", ">", getTimeSmeny(dataTimeSmeny))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //debugger
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.data())
                    sumStat (doc.data())
                });
                durSaST = `${Math.floor(durSa/3600)}: ${Math.floor((durSa%3600)/60)}`
                durKoST = `${Math.floor(durKo/3600)}: ${Math.floor((durKo%3600)/60)}`
                durMaST = `${Math.floor(durMa/3600)}: ${Math.floor((durMa%3600)/60)}`
                durSeST = `${Math.floor(durSe/3600)}: ${Math.floor((durSe%3600)/60)}`
                durOlST = `${Math.floor(durOl/3600)}: ${Math.floor((durOl%3600)/60)}`
                document.getElementById('statistic').textContent = `ОБНОВЛЕНО: ${new Date()}`
                document.getElementById('sa').textContent = `Саша за смену отработал: ${durSaST}`
                document.getElementById('ma').textContent = `Марк за смену отработал: ${durMaST}`
                document.getElementById('ko').textContent = `Костя за смену отработал: ${durKoST}`
                document.getElementById('ol').textContent = `Олег за смену отработал: ${durOlST}`
                document.getElementById('se').textContent = `Серега за смену отработал: ${durSeST}`
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


function readMyName() {
    sname = document.getElementById('sname').value

    if (sname == 1) {
        return 'Олег'
    } else if (sname == 2) {
        return 'Марк'
    } else if (sname == 3) {
        return 'Саша'
    } else if (sname == 4) {
        return 'Костя'
    } else if (sname == 5) {
        return 'Сергей'
    } else {
        return 'Кто сегодня звукорежиссер?'
    }
}

function MyNameToValue(myName) {
    if (myName === 'Олег') {
        return 1
    } else if (myName === 'Марк') {
        return 2
    } else if (myName === 'Саша') {
        return 3
    } else if (myName === 'Костя') {
        return 4
    } else if (myName === 'Сергей') {
        return 5
    } else if (myName === 'Кто сегодня звукорежиссер?') {
        return 0
    }

     
}

