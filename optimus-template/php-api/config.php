<?php
// MySQL Database Configuration
define('DB_HOST', 'localhost'); // o2switch MySQL is always localhost
define('DB_NAME', 'maab3521_optimus-stages');
define('DB_USER', 'maab3521_stages-user');
define('DB_PASS', 'Vratouy1214!');

// CORS headers for Vercel/Next.js access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Create database connection
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        return $pdo;
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed', 'message' => $e->getMessage()]);
        exit();
    }
}

// Helper function to send JSON response
function sendResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

// Helper function to get JSON input
function getJSONInput() {
    return json_decode(file_get_contents('php://input'), true);
}
?>
