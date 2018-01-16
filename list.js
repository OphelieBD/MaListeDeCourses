$(document).ready(function(){ //dès que la page est chargée, fait la requête ajax pour récupérer les articles déjà présents dans BDD
	setInterval(function(){
		afficherListeAjax();
	}, 1000);
});

function afficherListeAjax()
{
	$.ajax({
        url: 'controller.php',
        dataType: 'text',
        data: { 
		  	action: "liste" 
		},
		success: afficherListe
    });   
}

$("#input1").on("change paste keyup", function() { //rend le bouton validation 1 cliquable dès qu'on écrit dans l'input associé
   $("#boutonValidation").removeAttr('disabled');
});

$("#form").submit(function(e){ //Dès qu'on ajoute un article, on fait requête ajax pour l'enregistrer en BDD
	var dato = $(this).serialize();
	$("#input1").val(''); // vide les input
	$("#input2").val('');
	$("#boutonValidation").attr('disabled', 'disabled'); //remet le bouton disable
	e.preventDefault(); // Annulation de l'envoi des données via le formulaire (car on le fait via ajax)
	$.ajax({
	    type : "POST",
	    url: 'controller.php',
	    dataType: 'json',
	    data: dato,
	    success : function() {
	        $("#confirmationEnvoi").html("Bien enregistré"); // message de validation
	        $("#confirmationEnvoi").delay(3000).fadeOut(1000, 'linear');
	    },
	    error: function() {
	        $("#confirmationEnvoi").html("Erreur d'appel Ajax");
	    }
	});
});


function afficherListe(data) //affiche la liste des articles présents en base de données
{
	var donneesRecues = JSON.parse(data);
	console.log(donneesRecues);
	$("#article").empty();
	$("#quantite").empty();
	for (var i = 0; i < donneesRecues.length; i++) 
	{
		var articlerecu = donneesRecues[i]['article'];
		var quantiterecue = donneesRecues[i]['quantite'];
		var id = donneesRecues[i]['id'];
		$('#article').append('<li><i onclick="suppressionLigne(' + id + ')" class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;&nbsp;'+ quantiterecue + ' ' + articlerecu +'</li>');
	}
}

function suppressionLigne(idArticleActuel){ //fonction permettant via l'appel ajax d'envoyer au php l'id de la ligne à supprimer
	$.ajax({
		url: 'controller.php',
		type: 'POST',
		data: {
			action: "supprimerArticle",
			idArticle: idArticleActuel
		}
	});
}
