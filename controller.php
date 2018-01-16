<?php 
	
	include_once('SQL.php');

	$quantite = 1; //Je déclare la variable quantité comme étant 1 par défaut, si jamais le input quantité n'est pas rempli

	if (isset($_GET['action'])) //Si utilisation de $_GET
	{
		switch ($_GET['action']) 
		{
			case 'liste':
				affichageListe();
			break;
		}
	}

	if (isset($_POST['action'])) //Si utilisation de $_POST
	{
		switch ($_POST['action']) 
		{
			case 'insererEnBDD': 
				if (isset($_POST['article'])) 
				{
					if ($_POST['quantite'] != NULL)
					{
						$quantite = $_POST['quantite'];
					}
					ajoutenbdd($_POST['article'], $quantite);
				}
			break;

			case 'supprimerArticle':
				if (isset($_POST['idArticle']))
				{
					suppressionLigne($_POST['idArticle']);
				}
			break;
		}
	}

	function affichageListe() //Renvoie la liste des articles & quantités présents dans la BDD
	{
		$resultatListe = SQLSelect("SELECT * FROM liste");
		echo json_encode($resultatListe);	
	}

	function ajoutenbdd($article, $quantite) //Ajoute l'article et la quantité correspondante en BDD, avec en paramètre tache ($_POST['article']) et $quantite
	{
		$envoiarticle = SQLInsertWithParams(
			"INSERT INTO liste(article, quantite) VALUES (:article, :quantite)", 
			array("article"=>$article, "quantite"=>$quantite)
		);
		echo json_encode($envoiarticle);
	}

	function suppressionLigne($id) //Supprime un article dans la BDD
	{
		$supprimeArticle = SQLEdit("DELETE FROM liste WHERE id = $id");
	}

?>