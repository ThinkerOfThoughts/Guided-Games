var config = {
    apiKey: "AIzaSyD1lj9odK753YVBGQECer5DplzZ6AYiNM8",
    authDomain: "guided-games.firebaseapp.com",
    databaseURL: "https://guided-games.firebaseio.com",
    projectId: "guided-games",
    storageBucket: "guided-games.appspot.com",
    messagingSenderId: "887475943898"
  };
 try{
	firebase.initializeApp(config);
	}
catch (err) {
	// we skip the "already exists" message which is
	// not an actual error when we're hot-reloading
	if (!/already exists/.test(err.message)) {
	console.error('Firebase initialization error', err.stack)
	}
}