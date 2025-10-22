<?php
require_once 'config.php';

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET /stages.php?action=cities - Fetch unique cities (check this FIRST)
if ($method === 'GET' && isset($_GET['action']) && $_GET['action'] === 'cities') {
    $stmt = $pdo->query("SELECT DISTINCT city FROM stages_recuperation_points ORDER BY city");
    $cities = $stmt->fetchAll(PDO::FETCH_COLUMN);
    sendResponse(['data' => $cities]);
    exit;
}

// GET /stages.php?id=xxx - Fetch single stage (check this SECOND)
if ($method === 'GET' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM stages_recuperation_points WHERE id = :id");
    $stmt->execute([':id' => $_GET['id']]);
    $stage = $stmt->fetch();

    if ($stage) {
        sendResponse(['data' => $stage]);
    } else {
        sendResponse(['error' => 'Stage not found'], 404);
    }
    exit;
}

// GET /stages.php - Fetch all stages with filters (default)
if ($method === 'GET') {
    $city = isset($_GET['city']) ? $_GET['city'] : null;
    $cities = isset($_GET['cities']) ? explode(',', $_GET['cities']) : [];
    $sortBy = isset($_GET['sortBy']) ? $_GET['sortBy'] : 'date_start';
    $sortOrder = isset($_GET['sortOrder']) ? $_GET['sortOrder'] : 'ASC';

    // Build query
    $sql = "SELECT * FROM stages_recuperation_points WHERE 1=1";
    $params = [];

    // Filter by single city
    if ($city) {
        $sql .= " AND UPPER(city) = UPPER(:city)";
        $params[':city'] = $city;
    }

    // Filter by multiple cities
    if (!empty($cities)) {
        $placeholders = [];
        foreach ($cities as $i => $c) {
            $key = ":city$i";
            $placeholders[] = $key;
            $params[$key] = strtoupper($c);
        }
        $sql .= " AND UPPER(city) IN (" . implode(',', $placeholders) . ")";
    }

    // Sorting
    $allowedSort = ['date_start', 'price', 'city'];
    if (in_array($sortBy, $allowedSort)) {
        $sql .= " ORDER BY $sortBy " . ($sortOrder === 'DESC' ? 'DESC' : 'ASC');
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $stages = $stmt->fetchAll();

    sendResponse(['data' => $stages]);
    exit;
}

sendResponse(['error' => 'Invalid request'], 400);
?>
