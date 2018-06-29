<?php

//File that gets other's public activity data from database
if(!isset($_SESSION)){ 
    session_start(); 
} 

if(!isset($_SESSION["username"])){
	header('Location: login.php');
	exit();
}

if(!isset($_SESSION["viewUser"])){
	header('Location: home.php');
	exit();
}

include_once("connect.php");
$_SESSION['message']="";

$username = $_SESSION["username"];
$viewUser = $_SESSION['viewUser'];
$tablename = "user";

if($_SERVER['REQUEST_METHOD']=="POST"){

	$sql = "USE Revivify;";
	$conn->query($sql);

	if($_POST["purpose"]=="Following"){

		$activityVisibility = "public";

		$stmt = $conn->prepare("SELECT * FROM $tablename WHERE username = ? AND ActivityVisibility = ?;");
		if(!$stmt){
			echo "Error preparing statement ".htmlspecialchars($conn->error);
		}
		$stmt->bind_param("ss",$viewUser,$activityVisibility);
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();	

		if($result->num_rows>0){
			while($row = $result->fetch_assoc()){

				echo $row["UsersActivity"];
				
			}
		}	

	}

	else if($_POST["purpose"]=="Books"){

		$activityVisibility = "public";

		$stmt = $conn->prepare("SELECT * FROM $tablename WHERE username = ? AND ActivityVisibility = ?;");
		if(!$stmt){
			echo "Error preparing statement ".htmlspecialchars($conn->error);
		}
		$stmt->bind_param("ss",$viewUser,$activityVisibility);
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();	

		if($result->num_rows>0){
		
			$tablename = $viewUser."books";

			$stmt = $conn->prepare("SELECT * FROM $tablename;");
			if(!$stmt){
				echo "Error preparing statement ".htmlspecialchars($conn->error);
			}
			$stmt->execute();
			$result2 = $stmt->get_result();
			$stmt->close();	

			$bookData = array();

			if($result2->num_rows>0){
				while($row = $result2->fetch_assoc()){

					$r = array('VolumeId'=>$row["VolumeId"],'Title'=>$row["Title"],'Author'=>$row["Author"],'ImgLink'=>$row["ImgLink"],'Activity'=>$row["Activity"]);
					array_push($bookData,$r);	
				}
			}	
			echo json_encode($bookData);	

		}	

	}	

}

?>