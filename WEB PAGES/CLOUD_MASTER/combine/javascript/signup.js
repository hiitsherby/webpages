// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDlQowLs-i2RO_qz7V0V1TZpEvSLW4yOZM",
    authDomain: "tinibuild-7c657.firebaseapp.com",
    databaseURL: "https://tinibuild-7c657.firebaseio.com",
    projectId: "tinibuild-7c657",
    storageBucket: "tinibuild-7c657.appspot.com",
    messagingSenderId: "910257525749"
  };

firebase.initializeApp(config);
var google_provider = new firebase.auth.GoogleAuthProvider();


//initialize firebase components
const auth = firebase.auth();

// jQuery
$(document).ready(function() {

  $(document).on('click', '#register-btn', register); //註冊
  $(document).on('click', '#googleLog', googleLog); //Google登入

});

function register(){
  let fname = document.getElementById('first-name').value;
  let lname = document.getElementById('last-name').value;
  var email = document.getElementById('register-email').value;
  var password = document.getElementById('register-password').value;
  var con_email = document.getElementById('confirm-email').value;
  let full_name = fname + ' ' + lname;
  console.log(full_name, email, password);
  if(fname === ''){
    showError('Please type in your first name');
  } else if(lname === ''){
    showError('Please type in your last name');
  } else if(email == con_email){
    $('#error_msg').hide();

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      database.ref('users/' + auth.currentUser.uid).push({
        name: full_name,
        email: auth.currentUser.email
      });
    })
  .catch(error => {
    console.log(error);
  });}else{
    $('#error_msg').show();
  }
};


function googleLog() {
  auth.signInWithPopup(google_provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    database.ref('users/' + user.uid).push({
      name: user.displayName,
      email: user.email
    });

    window.location.assign("/");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}
