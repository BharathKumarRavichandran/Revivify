<?php

session_start();
include_once('connect.php');
$_SESSION['message']="";

if($_SERVER["REQUEST_METHOD"]=="POST"){

	$username = trim($_POST['username']);
	$username = stripslashes($username);
	$username = htmlspecialchars($username);
	$username = $conn->real_escape_string($username);

	$password = md5($_POST['password']);

	include_once("createDb.php");

	$sql = "SELECT * FROM user WHERE username='".$username."';";
	$result = $conn->query($sql);

	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){

			if($row["password"]==$password){
				$_SESSION["username"] = $username;
				$_SESSION["email"] = $row["email"];
				include("createDataTable.php");
				header("location: home.php");  
			}
			else{
				$_SESSION['message'] = "Sorry, Wrong Password!";
			}
		}
	}	
	else{
		$_SESSION['message'] = "Username doesn't exist!";
	}	
}

?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Login | Revivify</title>
	<link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>
	<style type="text/css">
		
	html,body{
			margin: 0;
			padding: 0;
			font-family: 'Sofia';
		}

		.title{
			text-align: center;
			font-family: 'Sofia';
			letter-spacing: 0.4em;
			font-size: 4em;
			padding: 5px;
		}

		#loginTitle{
			text-align: center;
			font-family: 'Sofia';
			letter-spacing: 0.4em;
			font-size: 2.5em;
			padding: 5px;
			padding-bottom: 0px;
		}

		#errMsg{
			margin-top: -10px;
			letter-spacing: 0.1em;
			font-size: 1.1em;
			margin-left: 43.2vw;
			width: 14vw;
			padding: 3px;
			border-radius: 4px;
		}

		#usernameIn{
			height: 20px;
			border-radius: 3px;
			margin: 10px;
			font-family: 'Trubuchet MS';
			letter-spacing: 0.1em;
			font-size: 1.3em;
			margin-left: 42.6vw;
		}

		#passIn{
			height: 20px;
			border-radius: 3px;
			margin: 10px;
			font-family: 'Trubuchet MS';
			letter-spacing: 0.1em;
			font-size: 1.3em;
			margin-left: 42.6vw;
		}

		#submitIn{
			margin-top: 1%;
			border-radius: 3px;
			font-family: 'Sofia';
			letter-spacing: 0.3em;
			font-size: 1.1em;
			margin-left: 46.6vw;
			min-width: 7vw;
		}

		.options{
			margin-top: 10vh;
		}

		.text{
        	font-family: 'Sofia';
        	font-size: 1.2em;
        	margin-left: 40vw;
        }

        #signupb{
			border-radius: 3px;
			font-family: 'Sofia';
			letter-spacing: 0.3em;
			font-size: 1em;
			min-width: 7vw;
        }

		#foot{
			margin-top: 12vh;
			text-align: center;
			font-size: 1.3em;
			letter-spacing: 4px;
		}

		#heart{
			color: red;
		}

		#nameLink{
			text-decoration: none;
			color: orange;
		}

	</style>
</head>
<body>
	<a onclick="#"><h1 class="title">Revivify</h1></a>
    <h2 id="loginTitle">Login</h2>
	<form class="formClass" action="login.php" method="post" autocomplete="off">
	    <div id="errMsg"><?= $_SESSION['message'] ?></div>
	    <div><input id="usernameIn" type="text" placeholder="Username" name="username" required /></div>
		<div><input id="passIn" type="password" placeholder="Password" name="password" required /></div>
	    <div><input id="submitIn" type="submit" value="Login" name="login"/></div>
    </form>
    <div class="options">
    	<span class="text">New User? Register here!</span>
    	<span><button id="signupb" onclick="register()">Sign Up</button></span>
    </div>
    <footer>
		<p id="foot">Made with <span id="heart">&hearts;</span> by <a id="nameLink" href="https://BharathKumarRavichandran.github.io">Bharath Kumar Ravichandran</a></p>
	</footer>
<script>

	function register(){
		window.location = "register.php";
	}

</script>	
</body>
</html>