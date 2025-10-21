<?php
// Upload this file to your o2switch server via cPanel File Manager
// Then access it via: https://digitalwebsuccess.com/test-mysql-php.php

$host = 'localhost'; // On shared hosting, MySQL is usually localhost
$db = 'maab3521_optimus-stages';
$user = 'maab3521_stages-user';
$pass = 'Vratouy1214!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    echo "✅ MySQL connection successful!\n\n";

    $stmt = $pdo->query("SELECT COUNT(*) as count FROM stages_recuperation_points");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Stages count: " . $result['count'] . "\n";

    $stmt2 = $pdo->query("SELECT COUNT(*) as count FROM stage_bookings");
    $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
    echo "Bookings count: " . $result2['count'] . "\n";

} catch(PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
?>
