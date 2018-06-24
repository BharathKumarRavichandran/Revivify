<?php

//File that get shelf names in database
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
$tablename = "user";

if($_SERVER['REQUEST_METHOD']=="GET"){

	$sql = "USE Revivify;";
	$conn->query($sql);

	$sql = "SELECT * FROM $tablename WHERE username = '$username';";
	$result = $conn->query($sql);

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){

			echo $row["Shelves"];
		}
	}
		
}

?>