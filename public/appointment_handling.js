//function for accepting invitations
function accept_request(row_number)
{
	var request_name = document.getElementById("pend_request" + row_number).rows[2].cells[0].innerHTML;
	firebase.database().ref('pending_requests/').orderByChild('objective').equalTo(request_name).once("child_added", function(snapshot){
		var day = snapshot.child("day").val();
		var month = snapshot.child("month").val();
		var year = snapshot.child("year").val();
		var hour = snapshot.child("hour").val();
		var minute = snapshot.child("minute").val();
		var sender = snapshot.child("sending").val();
		var receiver = snapshot.child("receiving").val();
		var removal = "pending_requests/" + snapshot.key;
		
		let accepted_requests = firebase.database().ref('accepted_requests');
		var newKey = accepted_requests.push().key;
		let newData = {
			day:day,
			month:month,
			year:year,
			hour:hour,
			minute:minute,
			sending:sender,
			receiving:receiver,
			objective: request_name,
		};
		
		firebase.database().ref('accepted_requests/' + newKey).update(newData, function(error){
			if(error){
				alert(error);
			}
			else
			{
				alert('Request has been accepted!');
				firebase.database().ref(removal).remove();
				window.location.href = './index.html';
			}
		});
	});
}

//function for declining invitations
function refuse_request(row_number)
{
	var request_name = document.getElementById("pend_request" + row_number).rows[2].cells[0].innerHTML;

	//declined invitation is deleted
	firebase.database().ref('pending_requests/').orderByChild("objective").equalTo(request_name).once("child_added", function(snapshot){
		firebase.database().ref("pending_requests/" + snapshot.key).remove();
		window.location.href = ("index.html");
	});
}


//following functions are for rating other players
function accepted_rating(r_counter)
{
}


function received_Rating(s_counter)
{
}


















