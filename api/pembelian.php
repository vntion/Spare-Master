<?php
include "./CRUD.php";
if (isset($_SERVER["HTTP_ORIGIN"])) {
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
}
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"])) {
        header(
            "Access-Control-Allow-Headers:{$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]}"
        );
    }

    exit(0);
}
$CRUD = new CRUD();
$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case "GET":
        getPembelian($CRUD);
        break;

    case "POST":
        createPembelian($CRUD);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

// Get pembelian
function getPembelian($CRUD)
{
    $query =
        "SELECT isPaid, alamat, totalHarga, produkId, createdAt from pembelian";
    $res = $CRUD->read($query);
    $result = "";
    $count = mysqli_num_rows($res);
    if ($count > 0) {
        $getdata = [];
        while ($row = mysqli_fetch_assoc($res)) {
            $getdata[] = $row;
        }
        $result = ["status" => true, "data" => $getdata];
    } else {
        $result = ["status" => false, "data" => []];
    }
    echo json_encode($result);
}

// Create pembelian
function createPembelian($CRUD)
{
    $data = json_decode(file_get_contents("php://input"), true);
    $isPaid = $data["isPaid"] ?? null;
    $totalHarga = $data["totalHarga"] ?? null;
    $alamat = $data["alamat"] ?? null;
    $produkId = $data["produkId"] ?? null;
    $akunId = $data["akunId"] ?? null;
    if (
        is_null($isPaid) ||
        !$totalHarga ||
        !$alamat ||
        !$produkId ||
        !$akunId
    ) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid input data",
        ]);
        return;
    }
    $query = "INSERT INTO pembelian (isPaid, totalHarga, alamat,produkId,akunId) VALUES ('{$isPaid}', '{$totalHarga}', '{$alamat}','{$produkId}','{$akunId}')";
    try {
        $res = $CRUD->create($query);
    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Error: " . $e->getMessage(),
        ]);
        return;
    }
    $result = "";
    if ($res) {
        $result = ["status" => true, "message" => "Pembelian berhasil dibuat"];
    } else {
        $result = ["status" => false, "message" => "Something went wrong"];
    }
    echo json_encode($result);
}

?>
