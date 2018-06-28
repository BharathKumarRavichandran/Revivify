<?php

$sql = "CREATE DATABASE IF NOT EXISTS Revivify;";
$conn->query($sql);

$sql = "USE Revivify;";
$conn->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS user(
		id INT(100) NOT NULL AUTO_INCREMENT,
		username VARCHAR(100) NOT NULL,
		email VARCHAR(320) NOT NULL,
		password VARCHAR(128) NOT NULL,
		Shelves VARCHAR(100) NOT NULL,
		Following VARCHAR(500) NOT NULL,
		Followers VARCHAR(500) NOT NULL,
		PRIMARY KEY (id,username)
		)";
$conn->query($sql);

?>