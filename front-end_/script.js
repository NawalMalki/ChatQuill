$(document).ready(function () {

	//Widget Code
	var bot = '<div class="chatCont" id="chatCont">' +

		'<div class="close">' +
		'<i class="fa fa-times" aria-hidden="true"></i>' +
		'</div>' +
		
		'<div id="result_div" class="resultDiv"></div>' +
		'<div class="chatForm" id="chat-div">' +
		'<div class="spinner">' +
		'<div class="bounce1"></div>' +
		'<div class="bounce2"></div>' +
		'<div class="bounce3"></div>' +
		'</div>' +
		'<input type="text" id="chat-input" autocomplete="off" placeholder="Start Typing here..."' + 'class="form-control bot-txt"/>' +
		'</div>' +
		'</div><!--chatCont end-->' +

		'<div class="profile_div">' +
		'<div class="row">' +
		'<div class="col-hgt col-sm-offset-2">' +
		'<p class="begin">begin</p>' +
		'</div><!--col-hgt end-->' +
		'<div class="col-hgt">' +
		'<div class="chat-txt">' +
		'' +
		'</div>' +
		'</div><!--col-hgt end-->' +
		'</div><!--row end-->' +
		'</div><!--profile_div end-->';

	$("mybot").html(bot);

	// ------------------------------------------ Toggle chatbot -----------------------------------------------
	$('.profile_div').click(function () {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
		document.getElementById('chat-input').focus();
	});

	$('.close').click(function () {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
	});




	// on input/text enter--------------------------------------------------------------------------------------
	$('#chat-input').on('keyup keypress', function (e) {
		var keyCode = e.keyCode || e.which;
		var text = $("#chat-input").val();
		if (keyCode === 13) {
			if (text == "" || $.trim(text) == '') {
				e.preventDefault();
				return false;
			} else {
				$("#chat-input").blur();
				setUserResponse(text);
				send(text);
				e.preventDefault();
				return false;
			}
		}
	});

	//------------------------------------ Set bot response in result_div -------------------------------------
	function setBotResponse(val) {
		setTimeout(function () {

			if ($.trim(val) == '' || val == 'error') { //if there is no response from bot or there is some error
				val = 'Sorry I wasn\'t able to understand your Query. Let\' try something else!'
				var BotResponse = '<p class="botResult">' + val + '</p><div class="clearfix"></div>';
				$(BotResponse).appendTo('#result_div');
			} else {

				//if we get message from the bot succesfully
				var msg = "";
				
			    msg = '<p class="botResult">' + val + '</p><div class="clearfix"></div>';
				
				BotResponse = msg;
				$(BotResponse).appendTo('#result_div');
			}
			scrollToBottomOfResults();
			hideSpinner();
		}, 500);
	}


	//------------------------------------------- Call the RASA API--------------------------------------
	function send(text) {
		$.ajax({
			url: 'http://localhost:5005/webhooks/rest/webhook', // Mettez à jour l'URL pour pointer vers votre serveur Rasa
			type: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				"message": text
			}),
			success: function (data, textStatus, xhr) {
				console.log(data[0].text);
				setBotResponse(data[0].text); // Appelle la fonction pour afficher la réponse du chatbot
			},
			error: function (xhr, textStatus, errorThrown) {
				console.log('Erreur lors de l\'opération');
				setBotResponse('error'); // Affiche un message d'erreur si nécessaire
			}
		});
	}
	

	


	


	//------------------------------------- Set user response in result_div ------------------------------------
	function setUserResponse(val) {
		var UserResponse = '<p class="userEnteredText">' + val + '</p><div class="clearfix"></div>';
		$(UserResponse).appendTo('#result_div');
		$("#chat-input").val('');
		scrollToBottomOfResults();
		showSpinner();
		$('.suggestion').remove();
	}


	//---------------------------------- Scroll to the bottom of the results div -------------------------------
	function scrollToBottomOfResults() {
		var terminalResultsDiv = document.getElementById('result_div');
		terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
	}


	//---------------------------------------- Spinner ---------------------------------------------------
	function showSpinner() {
		$('.spinner').show();
	}

	function hideSpinner() {
		$('.spinner').hide();
	}

});