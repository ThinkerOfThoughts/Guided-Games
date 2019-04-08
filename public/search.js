/* 
 *handles basic and advanced searches
 */
var socket = io.connect('http://localhost:3000');
var config = {
    apiKey: "AIzaSyD1lj9odK753YVBGQECer5DplzZ6AYiNM8",
    authDomain: "guided-games.firebaseapp.com",
    databaseURL: "https://guided-games.firebaseio.com",
    projectId: "guided-games",
    storageBucket: "guided-games.appspot.com",
    messagingSenderId: "887475943898"
};
firebase.initializeApp(config);

//default basic search, can have username or nothing, in the event of nothing it returns everything
function basic_search(username = 0)
{
    //username is what you think it is
    return advanced_search(username);
}

//advance search, requires username, can use usertype
function advanced_search(username, usertype = 0, )
{
    //usertype is an integer, 0 for all users, 1 for mentees, 2 for mentors
    if(username === 0)
    {
          console.log(snapshot.val());
    }
    
    
    
}