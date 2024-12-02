<?php
include "./CRUD.php";

if (isset($_SERVER["HTTP_ORIGIN"])) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
}
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])) {
        header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    }
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"])) {
        header(
            "Access-Control-Allow-Headers: {$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]}"
        );
    }
    exit(0);
}

$CRUD = new CRUD();
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case "GET":
        if (!empty($_GET["akun_id"])) {
            $akun_id = intval($_GET["akun_id"]);
            getCart($akun_id, $CRUD);
        } else {
            echo json_encode(["status" => false, "message" => "akun_id required"]);
        }
        break;

    case "POST":
        addToCart($CRUD);
        break;

    case "DELETE":
        if (!empty($_GET["akun_id"])) {
            $akun_id = intval($_GET["akun_id"]);
            if (!empty($_GET["cart_id"])) {
                $cart_id = intval($_GET["cart_id"]);
                deleteCart($akun_id, $cart_id, $CRUD);
            } else {
                deleteAllCart($akun_id, $CRUD);
            }
        } else {
            echo json_encode(["status" => false, "message" => "akun_id required"]);
        }
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

// Get cart data
function getCart($akun_id, $CRUD)
{
    $query = "SELECT c.id, c.produkId, p.nama, p.harga, p.gambar,c.quantity, c.alamat, c.createdAt
              FROM cart c
              JOIN produk p ON c.produkId = p.id
              WHERE c.akunId = '{$akun_id}'";
    
    $res = $CRUD->read($query);
    if ($res->num_rows > 0) {
        $data = [];
        while ($row = $res->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(["status" => true, "data" => $data]);
    } else {
        echo json_encode(["status" => false, "data" => []]);
    }
}

// Add to cart
function addToCart($CRUD)
{
    $data = json_decode(file_get_contents("php://input"), true);
    $akunId = $data["akunId"] ?? null;
    $produkId = $data["produkId"] ?? null;
    $quantity = $data["quantity"] ?? 1;
    $alamat = $data["alamat"] ?? null;

    if (!$akunId || !$produkId || !$alamat) {
        echo json_encode(["status" => false, "message" => "Invalid input data"]);
        return;
    }

    $query = "INSERT INTO cart (akunId, produkId, quantity, alamat) VALUES ('{$akunId}', '{$produkId}', '{$quantity}', '{$alamat}')";
    $res = $CRUD->create($query);

    if ($res) {
        echo json_encode(["status" => true, "message" => "Cart added successfully"]);
    } else {
        echo json_encode(["status" => false, "message" => "Failed to add to cart"]);
    }
}

// Delete a single cart item
function deleteCart($akun_id, $cart_id, $CRUD)
{
    $query = "DELETE FROM cart WHERE akunId = '{$akun_id}' AND id = '{$cart_id}'";
    $res = $CRUD->delete($query);

    if ($res) {
        echo json_encode(["status" => true, "message" => "Cart item deleted"]);
    } else {
        echo json_encode(["status" => false, "message" => "Failed to delete cart item"]);
    }
}

// Delete all cart items for a user
function deleteAllCart($akun_id, $CRUD)
{
    $query = "DELETE FROM cart WHERE akunId = '{$akun_id}'";
    $res = $CRUD->delete($query);

    if ($res) {
        echo json_encode(["status" => true, "message" => "All cart items deleted"]);
    } else {
        echo json_encode(["status" => false, "message" => "Failed to delete all cart items"]);
    }
}

// Close database
$CRUD->close();
?>
