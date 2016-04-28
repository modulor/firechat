(function(){	

	var USER_CLIENT = 'modulor';

	var STREAMING_NAME = 'concierto-en-vivo';

	var GROUP = 'chat-general';

	// firebase connection

	var ref = new Firebase('https://dazzling-heat-3260.firebaseio.com/chats/'+USER_CLIENT+'/'+STREAMING_NAME);

	if(GROUP != '')

		var ref = ref.child(GROUP);

	function sendMessage(){

		if(message != "")
			ref.push({
				email: $("#email").val(),
				message: $("#message").val()
			});			

		$("#message").val('');

	}	

	$('#message').keypress(function (e) {	
		if (e.keyCode == 13)
			sendMessage();
	});

	$("#btnSend").click(function(){
		sendMessage();
	});

	// message added

	ref.on('child_added', function(snap){
		var chat = snap.val();
		var content = ' <div><p class="text-muted"><i class="fa fa-user"></i> ' + chat.email + '</p> <p>' + chat.message + '</p>';
		$("#chatMessages").append(content);
	});

	// message deleted
	ref.on("child_removed", function(snap) {
		var deletedPost = snap.val();
		$("#messageDeleted").text("mensaje borrado: '" + deletedPost.message + "'");
	});

})();