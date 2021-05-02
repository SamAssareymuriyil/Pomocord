firebase.initializeApp(firebaseConfig);

let u, res

function login(){
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(function(result){
        res = result
        console.log("Success Google Account Linked")
    }).then(function(){
        user();
    })
    .catch(function(err){
        console.log(err)
        window.alert("Login Failed, please try again.")
    })
}

function user(){
    console.log(res)
    if (res.additionalUserInfo.isNewUser == true){
        setTimeout(function(){
        firebase.database().ref('uId').on('value', function(snapshot){
            u = snapshot.val().lastUID;
        })
        }, 700)
        setTimeout(function(){
            u++
            firebase.database().ref('user/'+res.additionalUserInfo.profile.id).set({
                uID: u
            });
            firebase.database().ref('info/'+u+'/discord').set({
                discord: "Enter a discord to get started with the Discord bot"
            })
            firebase.database().ref('info/'+u+'/subject').set({
                sub: "other"
            });
            firebase.database().ref('uId').set({
                lastUID: u
            });
            localStorage.setItem('guid', res.additionalUserInfo.profile.id);
            window.location.replace("./home.html")
        }, 1500)
    }
    if (res.additionalUserInfo.isNewUser == false){
        setTimeout(function(){
            localStorage.setItem('guid', res.additionalUserInfo.profile.id);
        }, 500)
        window.location.replace("./home.html")
    }
}

function logout(){
    firebase.auth().signOut()
    window.location.replace("./index.html")
}