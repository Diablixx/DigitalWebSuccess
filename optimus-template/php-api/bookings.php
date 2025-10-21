<?php
require_once 'config.php';

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

// POST /bookings.php - Create new booking
if ($method === 'POST') {
    $input = getJSONInput();

    // Validate required fields
    $required = ['stage_id', 'civilite', 'nom', 'prenom', 'date_naissance', 'adresse', 'code_postal', 'ville', 'email', 'email_confirmation', 'telephone_mobile'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            sendResponse(['error' => "Missing required field: $field"], 400);
        }
    }

    // Generate booking reference
    $year = date('Y');
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM stage_bookings WHERE booking_reference LIKE 'BK-$year-%'");
    $count = $stmt->fetch()['count'];
    $bookingRef = sprintf('BK-%s-%06d', $year, $count + 1);

    // Generate UUID for ID
    $id = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );

    // Insert booking
    $sql = "INSERT INTO stage_bookings (
        id, stage_id, booking_reference, civilite, nom, prenom, date_naissance,
        adresse, code_postal, ville, email, email_confirmation, telephone_mobile,
        guarantee_serenite, cgv_accepted
    ) VALUES (
        :id, :stage_id, :booking_reference, :civilite, :nom, :prenom, :date_naissance,
        :adresse, :code_postal, :ville, :email, :email_confirmation, :telephone_mobile,
        :guarantee_serenite, :cgv_accepted
    )";

    $params = [
        ':id' => $id,
        ':stage_id' => $input['stage_id'],
        ':booking_reference' => $bookingRef,
        ':civilite' => $input['civilite'],
        ':nom' => $input['nom'],
        ':prenom' => $input['prenom'],
        ':date_naissance' => $input['date_naissance'],
        ':adresse' => $input['adresse'],
        ':code_postal' => $input['code_postal'],
        ':ville' => $input['ville'],
        ':email' => $input['email'],
        ':email_confirmation' => $input['email_confirmation'],
        ':telephone_mobile' => $input['telephone_mobile'],
        ':guarantee_serenite' => isset($input['guarantee_serenite']) ? 1 : 0,
        ':cgv_accepted' => 1
    ];

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        sendResponse([
            'data' => [
                'id' => $id,
                'booking_reference' => $bookingRef
            ]
        ], 201);
    } catch(PDOException $e) {
        sendResponse(['error' => 'Failed to create booking', 'message' => $e->getMessage()], 500);
    }
}

// GET /bookings.php?ref=xxx - Fetch booking by reference
if ($method === 'GET' && isset($_GET['ref'])) {
    $stmt = $pdo->prepare("
        SELECT b.*, s.city, s.full_address, s.date_start, s.date_end, s.price
        FROM stage_bookings b
        JOIN stages_recuperation_points s ON b.stage_id = s.id
        WHERE b.booking_reference = :ref
    ");
    $stmt->execute([':ref' => $_GET['ref']]);
    $booking = $stmt->fetch();

    if ($booking) {
        sendResponse(['data' => $booking]);
    } else {
        sendResponse(['error' => 'Booking not found'], 404);
    }
}

sendResponse(['error' => 'Invalid request'], 400);
?>
