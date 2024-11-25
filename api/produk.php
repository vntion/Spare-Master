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
        if (!empty($_GET["produk_id"])) {
            $produk_id = intval($_GET["produk_id"]);
            getProducts($produk_id, null, $CRUD);
        } elseif (!empty($_GET["search"])) {
            $search = $_GET["search"];
            getProducts(0, $search, $CRUD);
        } else {
            getProducts(0, null, $CRUD);
        }
        break;

    case "POST":
        createProduk($CRUD);
        break;

    case "PUT":
        $produk_id = intval($_GET["produk_id"]);
        updateProduk($produk_id, $CRUD);
        break;

    case "DELETE":
        $produk_id = intval($_GET["produk_id"]);
        deleteProduk($produk_id, $CRUD);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

// Get produk
function getProducts($produk_id, $search, $CRUD)
{
    $query = "SELECT id, nama, deskripsi, harga, gambar FROM produk";
    if ($produk_id != 0) {
        $query .= " WHERE id='{$produk_id}'";
    }

    if ($search != null) {
        $query .= " WHERE nama LIKE '%{$search}%'";
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

// Create produk
function createProduk($CRUD)
{
    $data = json_decode(file_get_contents("php://input"), true);
    $nama = $data["nama"] ?? null;
    $deskripsi = $data["deskripsi"] ?? null;
    $harga = $data["harga"] ?? null;
    $gambar = $data["gambar"] ?? null;

    if (!$nama || !$deskripsi || !$harga || !$gambar) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid input data",
        ]);
        return;
    }

    $queryInsert = "INSERT INTO produk (nama, deskripsi, harga, gambar) VALUES ('{$nama}', '{$deskripsi}', '{$harga}', '{$gambar}')";

    try {
        $res = $CRUD->create($queryInsert);
        if ($res) {
            $queryLastId = "SELECT LAST_INSERT_ID() AS id";
            $result = $CRUD->read($queryLastId);

            if ($row = $result->fetch_assoc()) {
                $id = $row["id"];
                echo json_encode([
                    "status" => true,
                    "message" => "Produk berhasil dibuat",
                    "data" => [
                        "id" => $id,
                        "nama" => $nama,
                        "deskripsi" => $deskripsi,
                        "harga" => $harga,
                        "gambar" => $gambar,
                    ]
                ]);
            } else {
                echo json_encode([
                    "status" => false,
                    "message" => "Gagal mengambil ID terakhir",
                ]);
            }
        } else {
            echo json_encode([
                "status" => false,
                "message" => "Gagal menyimpan produk",
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Produk {$nama} sudah ada",
        ]);
    }
}


// Update produk
function updateProduk($produk_id, $CRUD)
{
    $data = json_decode(file_get_contents("php://input"), true);
    $nama = $data["nama"] ?? null;
    $deskripsi = $data["deskripsi"] ?? null;
    $harga = $data["harga"] ?? null;
    $gambar = $data["gambar"] ?? null;
    if (!$nama || !$deskripsi || !$harga || !$gambar) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid input data",
        ]);
        return;
    }
    $query = "UPDATE produk SET nama='{$nama}', deskripsi='{$deskripsi}', harga='{$harga}', gambar='{$gambar}' WHERE id='{$produk_id}'";
    $res = $CRUD->update($query);
    $result = "";
    if ($res) {
        $result = ["status" => true, "message" => "Produk berhasil diupdate"];
    } else {
        $result = ["status" => false, "message" => "Something went wrong"];
    }
    echo json_encode($result);
}

// Delete produk
function deleteProduk($produk_id, $CRUD)
{
    $query = "DELETE FROM produk WHERE id='{$produk_id}'";
    $res = $CRUD->delete($query);
    $result = "";
    if ($res) {
        $result = [
            "status" => true,
            "message" => "Product deleted Succefully...",
        ];
    } else {
        $result = [
            "status" => false,
            "message" => "Something went wrong...",
        ];
    }
    echo json_encode($result);
}

// Close database
$CRUD->close();

?>
