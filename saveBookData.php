<?php

//File that saves book data in database
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
		$likeStatus = "no";

		$sql = "SELECT * FROM $tablename WHERE VolumeId = '$volumeId';";
		$result = $conn->query($sql);	

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				$sql = "UPDATE $tablename SET Status='$status' WHERE VolumeId = '$volumeId';";
				$conn->query($sql);					

			}
		}	

		else{

			$sql = "INSERT INTO $tablename(VolumeId,Title,Author,ImgLink,Liked,Status) "."VALUES ('$volumeId','$title','$author','$imgLink','$likeStatus','$status');";
			$result = $conn->query($sql);

			if (!$result){
				trigger_error('Invalid query: ' . $conn->error);
			}

		}		

	}

	else if($_POST["purpose"]=="adClickAdd"){

		$volumeId = $_POST['volumeId'];
		$title = $_POST['title'];
		$author = $_POST['author'];
		$imgLink = $_POST['imgLink'];
		$column = $_POST['columnName'];

		$sql = "SELECT * FROM $tablename WHERE VolumeId = '$volumeId';";
		$result = $conn->query($sql);	

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				if($row[$column]=="yes"){
					$status = "no";
				}

				else{
					$status = "yes";
				}

				$sql = "UPDATE $tablename SET $column ='$status' WHERE VolumeId = '$volumeId';";
				$conn->query($sql);					

			}
		}

		else{

				$likeStatus = "no";

				$sql = "INSERT INTO $tablename(VolumeId,Title,Author,ImgLink,Liked,Status) "."VALUES ('$volumeId','$title','$author','$imgLink','$likeStatus','$status');";
				$result = $conn->query($sql);

				if (!$result){
					trigger_error('Invalid query: ' . $conn->error);
				}

		}		

	}


	else if($_POST["purpose"]=="addShelf"){

		$shelfName = $_POST["shelfName"];

		$sql = "ALTER TABLE $tablename ADD $shelfName VARCHAR(500);";
		$conn->query($sql);

		$shelfName.="%";

		$sql = "UPDATE user SET Shelves=concat(Shelves,'$shelfName') WHERE username = '$username';";
		$conn->query($sql);

	}

	else if($_POST["purpose"]=="likeUpdate"){

		$volumeId = $_POST['volumeId'];
		$title = $_POST['title'];
		$author = $_POST['author'];
		$imgLink = $_POST['imgLink'];
		$likeStatus = $_POST['likeStatus'];
		$column = $_POST['columnName'];

		$sql = "SELECT * FROM $tablename WHERE VolumeId = '$volumeId';";
		$result = $conn->query($sql);	

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				if($row[$column]=="yes"){
					$likeStatus = "no";
				}

				else{
					$likeStatus = "yes";
				}

				$sql = "UPDATE $tablename SET $column ='$likeStatus' WHERE VolumeId = '$volumeId';";
				$conn->query($sql);					

			}
		}

		else{

			$sql = "INSERT INTO $tablename(VolumeId,Title,Author,ImgLink,Liked) "."VALUES ('$volumeId','$title','$author','$imgLink','$likeStatus');";
			$result = $conn->query($sql);

			if (!$result){
				trigger_error('Invalid query: ' . $conn->error);
			}

		}		

	}
		
}

?>