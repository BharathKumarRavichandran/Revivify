<?php

//File that saves follow data in database
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
$currentUser = $_SESSION["username"];
$tablename = "user";

if($_SERVER['REQUEST_METHOD']=="GET"){

	$sql = "USE Revivify;";
	$conn->query($sql);

	$stmt = $conn->prepare("SELECT * FROM $tablename WHERE username = ?;");
	if(!$stmt){
		echo "Error preparing statement ".htmlspecialchars($conn->error);
	}
	$stmt->bind_param("s",$username);
	$stmt->execute();
	$result = $stmt->get_result();
	$stmt->close();	

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){
			echo $row["UsersActivity"];
		}
	}	

}

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE Revivify;";
	$conn->query($sql);

	if($_POST["purpose"]=="followBtnClick"){

		if($_POST["click"]=="Follow"){

			$currentUser.=",";
			$followUser = $_POST["followUsername"];

			$stmt = $conn->prepare("UPDATE $tablename SET Followers=concat(Followers,?) WHERE username = ?;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->bind_param("ss",$currentUser,$followUser);
			$stmt->execute();
			$stmt->close();	

			$activity = $username." started following ".$followUser.".,";

			$stmt = $conn->prepare("UPDATE $tablename SET UsersActivity=concat(UsersActivity,?) WHERE username = ?;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->bind_param("ss",$activity,$username);
			$stmt->execute();
			$stmt->close();

			$followUser.=",";

			$stmt = $conn->prepare("UPDATE $tablename SET Following=concat(Following,?) WHERE username = ?;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->bind_param("ss",$followUser,$username);
			$stmt->execute();
			$stmt->close();

		}
	
		else if($_POST["click"]=="Following"){

			$currentUser.=",";
			$followUser = $_POST["followUsername"];

			$stmt = $conn->prepare("UPDATE $tablename SET Followers= REPLACE(Followers,?,'') WHERE username = ?;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->bind_param("ss",$currentUser,$followUser);
			$stmt->execute();
			$stmt->close();	

			$activity = $username." started following ".$followUser.".,";

			$stmt = $conn->prepare("UPDATE $tablename SET UsersActivity = REPLACE(UsersActivity,?,'') WHERE username = ?;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->bind_param("ss",$activity,$username);
			$stmt->execute();
			$stmt->close();

			$followUser.=",";

			$stmt = $conn->prepare("UPDATE $tablename SET Following = REPLACE(Following,?,'') WHERE username = ?;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->bind_param("ss",$followUser,$username);
			$stmt->execute();
			$stmt->close();

		}

	}

}

?>