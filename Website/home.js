firebase.initializeApp(firebaseConfig);

const disc = document.getElementById("disc");
const newTask = document.getElementById("newTask");
const subject = document.getElementById("subject");
let guid;
let uid;
let status = 0;
let tasks = document.createElement('div');
localArray = [];

newTask.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add").click();
    }
});

disc.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("dic").click();
    }
});

function start(){
    guid = localStorage.getItem("guid");
    firebase.database().ref('user/'+guid).on('value', function(snapshot){
        uid = snapshot.val().uID;
    });
    setTimeout(function(){
        firebase.database().ref('info/'+uid+'/tasks/localArray').on('value', function(snapshot){
            localArray = snapshot.val()
        });
        firebase.database().ref('info/'+uid+'/discord/discord').on('value', function(snapshot){
            disc.value = snapshot.val()
        });
        firebase.database().ref('info/'+uid+'/subject/sub').on('value', function(snapshot){
            subject.value = snapshot.val()
        });
        getQuote();
    },2000);
    setTimeout(function(){
        if (localArray == null){
            localArray = ["Add a task to get started"]
            firebase.database().ref('info/'+uid+'/tasks').set({
                localArray
            })
            task();
        }
        else{
            task();
        }
    },2250);
}

function task(){
    document.getElementById("tsk").innerHTML = '';
    tasks = document.createElement('div');
    localArray.forEach(func);
    document.getElementById("tsk").appendChild(tasks);
    getQuote();
}

function func(value,index){
    tasks.innerHTML = tasks.innerHTML +`
    <div class="list-items" id="${index}"><button class="list-button" id="but${index}" onclick="del(${index})">x</button>${value}</div>`
}

function del(loc){
    if(localArray.length == 1){
        localArray.push("Great work all done!")
    }
    localArray.splice(loc,1)
    task()
    firebase.database().ref('info/'+uid+'/tasks').set({
        localArray
    })
}

function addTask(){
    localArray.push(newTask.value)
    if (localArray.length >= 2 && localArray[0] =="Great work all done!" || localArray[0] =="Add a task to get started"){
        localArray.splice(0,1)
    }
    task()
    firebase.database().ref('info/'+uid+'/tasks').set({
        localArray
    })
    newTask.value = ''
}

function upDisc(){
    let discord = disc.value;
    firebase.database().ref('info/'+uid+'/discord').set({
        discord
    })
    console.log(discord)
}

function subChange(){
    let sub = subject.value;
    firebase.database().ref('info/'+uid+'/subject').set({
        sub
    });
    console.log(sub)
}

function logout(){
    firebase.database().ref('info/'+uid+'/stat').set({
        status: 0
    })
    firebase.auth().signOut()
    window.location.replace("./index.html")
}

const quotes = [
    ["It always seems impossible until it’s done.","Nelson Mandela"],
    ["Motivation is what sets you in motion, habit is what keeps you going.","Jim Ryun"],
    ["Study the past if you want to intuit the future.","Confucius"],
    ["If you do not like how things are, change them.","Jim Rohn"],
    ["Do not let what you cannot do interfere with what you can do.","John R. Wooden"],
    ["Good fortune favors the daring.","Virgil"],
    ["You can always be better.","Tiger Woods"],
    ["There is no substitute for hard work.","Thomas Edison"],
    ["I have failed again and again throughout my life. That’s why I’ve been successful.","Michael Jordan"],
    ["Without studying the soul sick.","Seneca"],
    ["The man who is a teacher of patience is a master of everything else.","George Saville"],
    ["A book is like a garden that can be carried in your pocket.","Chinese Proverb"],
    ["If we did all the things we are capable of, we would be amazed.","Thomas Edison"],
    ["The more I work, the more luck I seem to have.","Thomas Jefferson"],
    ["Quality is never an accident, it is always the result of an effort of intelligence.","John Ruskin"],
    ["Change your thoughts and you will change your world.","Norman Vincent Peale"],
    ["Your talents and abilities will improve over time, but for that you have to start.","Martin Luther King"],
    ["True education is about getting the best out of oneself.","Mahatma Gandhi"],
    ["Our patience will get more things than our strength.","Edmund Burke"],
    ["Books are dangerous. The best ones should be labeled with 'This could change your life'.","Helen Exley"],
    ["Your most important education is not happening in a class.","Jim Rohn"],
    ["Youth is the time to study wisdom; the old age, that of practicing it.","Jean Jacques Rousseau"],
    ["If you do not go to the end, why start?","Joe Namath"],
    ["Learning without thinking is useless. Think without learning, dangerous.","Confucius"],
    ["The champions keep playing until they do well.","Billie Jean King"],
    ["Use all your efforts, even when the possibilities play against you.","Arnold Palmer"],
    ["The wonderful thing about learning something is that nobody can take it from us.","BB King"],
    ["Quality is not an act, but a habit.","Aristotle"],
    ["Set tough goals and do not stop until you get there.","Bo Jackson"],
    ["The man well prepared for the struggle has achieved half a triumph.","Miguel de Cervantes"],
    ["In life, you can be two things; a smart fella, or a fart smella.","Samarth Patel"],
    ["If you run into a wall and pretend it doesn't exist, you'll never make progress. The wall will never change, so you're the one who has to change.","Hideaki Sorachi"],
]

function getQuote(){
    let loc = Math.floor((Math.random() * 32) + 0);
    temp = quotes[loc]
    document.getElementById("quote").innerHTML = temp[0]
    document.getElementById("author").innerHTML = temp[1]
}

function pushStat(current){
    firebase.database().ref('info/'+uid+'/stat').set({
        status: current
    })
}
function startTime(){
    status++
    pushStat(status)
    document.getElementById("but").disabled = true;
    if (status % 2 != 0 && status < 9){
        document.getElementById("status").innerHTML = "Study Session, Do your work!";
        timer(1500000)
        setTimeout(function(){
            startTime()
        },1500000)
    }
    else if (status % 2 == 0 && status < 9 && status != 8){
        document.getElementById("status").innerHTML = "Study Session, Do your work!";
        timer(300000)
        setTimeout(function(){
            startTime()
        },300000)
    }
    else if (status == 8){
        document.getElementById("status").innerHTML = "Study Session, Do your work!";
        timer(1800000)
        setTimeout(function(){
            startTime()
        },1800000)
    }
    if (status == 9){
        document.getElementById("status").innerHTML = "Start Another Study Session!";
        status = 0
        document.getElementById("minutes").innerHTML = "Good Work all done!";
        document.getElementById("but").disabled = false;
    }
}
function timer(ms){
    let rn = (new Date().getTime())+ms;
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = rn - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (seconds < 10){
            document.getElementById("minutes").innerHTML = minutes + ":0" + seconds;
        }
        else{
            document.getElementById("minutes").innerHTML = minutes + ":" + seconds;
        }
        if (distance < 0){
            clearInterval(x);
        }
    }, 1000);
}