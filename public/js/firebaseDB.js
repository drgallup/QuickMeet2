// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
apiKey: "AIzaSyBetNrKXVXpI6OrSjOpwVIm_HQSZ0p64tw",
authDomain: "quickmeet2-c69c9.firebaseapp.com",
databaseURL: "https://quickmeet2-c69c9.firebaseio.com",
storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('tables/').set(dataJSON);
}
var userId = firebase.auth().currentUser.uid;


function readUserData(){
    return firebase.database().ref('tables/').once('value').then(function(snapshot) {
    var username = snapshot.val()   ;
    console.log(username);        
    });
}










