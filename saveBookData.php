<?php

//File that updates user's appointment data in database from appointment.js
if(!isset($_SESSION)){ 
    session_start(); 
} 

if(!isset($_SESSION["username"])){
	header('Location: login.php');
	exit();
}

include_once("connect.php");
$_SESSION['message']="";

$username = $_SESSION["username"];
$tablename = $username."books";

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE Revivify;";
	$conn->query($sql);

	if($_POST["purpose"]=="aClickAdd"){

		$volumeId = $_POST['volumeId'];
		$title = $_POST['title'];
		$author = $_POST['author'];
		$imgLink = $_POST['imgLink'];
		$status = $_POST['status'];

		$sql = "SELECT * FROM $tablename WHERE VolumeId = '$volumeId';";
		$result = $conn->query($sql);	

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				$sql = "UPDATE $tablename SET Status='$status' WHERE VolumeId = '$volumeId';";
				$conn->query($sql);					

			}
		}	

		else{

			$sql = "INSERT INTO $tablename(VolumeId,Title,Author,ImgLink,Status) "."VALUES ('$volumeId','$title','$author','$imgLink','$status');";
			$result = $conn->query($sql);

			if (!$result){
				trigger_error('Invalid query: ' . $conn->error);
			}

		}		

	}

	if($_POST["purpose"]=="adClickAdd"){


	}
		
}

?>