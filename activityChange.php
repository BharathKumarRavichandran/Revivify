<?php

//File that changes user's activity visibility
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

	$stmt = $conn->prepare("SELECT ActivityVisibility from $tablename WHERE username = ?;");
	if(!$stmt){
		echo "Error preparing statement ".htmlspecialchars($conn->error);
	}
	$stmt->bind_param("s",$username);
	$stmt->execute();
	$result = $stmt->get_result();
	$stmt->close();

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){
			echo $row["ActivityVisibility"];	
		}
	}

}

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE Revivify;";
	$conn->query($sql);

	$activityVisibility = $_POST["activityVisibility"];

	$stmt = $conn->prepare("UPDATE $tablename SET ActivityVisibility = ? WHERE username = ?;");
	if(!$stmt){
		echo "Error preparing statement ".htmlspecialchars($conn->error);
	}
	$stmt->bind_param("ss",$activityVisibility,$username);
	$stmt->execute();
	$stmt->close();
		
}

?>