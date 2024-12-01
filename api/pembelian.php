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
        if(!empty($_GET["akun_id"])) {
            $akun_id = intval($_GET["akun_id"]);
            getPembelian($CRUD, $akun_id);
        } else {
            getPembelian($CRUD, null);
        }
        break;

    case "POST":
        createPembelian($CRUD);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

// Get pembelian
function getPembelian($CRUD, $akun_id)
{
    $query = "
    SELECT 
        pembelian.isPaid, 
        pembelian.alamat, 
        pembelian.totalHarga, 
        pembelian.jumlahProduk,
        produk.nama AS produk, 
        produk.gambar AS gambarProduk,
        akun.nama AS pembeli, 
        akun.email AS email, 
        pembelian.createdAt AS tanggalBeli
    FROM 
        pembelian
    JOIN 
        akun ON pembelian.akunId = akun.id
    JOIN 
        produk ON pembelian.produkId = produk.id
";

    if ($akun_id != null) {
        $query .= " WHERE pembelian.akunId = '{$akun_id}'";
    }

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
    $jumlahProduk = $data["jumlahProduk"] ?? 1;
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
    $query = "INSERT INTO pembelian (isPaid, totalHarga, alamat,jumlahProduk,produkId,akunId) VALUES ('{$isPaid}', '{$totalHarga}', '{$alamat}', '{$jumlahProduk}','{$produkId}','{$akunId}')";
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
