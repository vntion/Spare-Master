<?php
include "./CRUD.php";
if (isset($_SERVER["HTTP_ORIGIN"])) {
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH,DELETE, OPTIONS");
}
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH,DELETE, OPTIONS");
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
        if (!empty($_GET["password"]) && !empty($_GET["email"])) {
            $password = $_GET["password"];
            $email = $_GET["email"];
            getAkun($password, $email, $CRUD);
        } else {
            getAkun(null, null, $CRUD);
        }

        break;

    case "POST":
        createAkun($CRUD);
        break;

    case "PATCH":
        $akun_id = intval($_GET["akun_id"]);
        updateAkun($akun_id, $CRUD);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

// Update akun
function updateAkun($akun_id, $CRUD) {
    // Ambil data dari input (misalnya menggunakan $_POST)
    $data = json_decode(file_get_contents("php://input"), true);
    $nama = $data["nama"] ?? null;
    $password = $data["password"] ?? null;
    $profil = $data["profile"] ?? null;

    // Cek apakah ada data yang perlu diperbarui
    $updateQuery = "UPDATE akun SET ";
    $updateFields = [];

    if ($nama) {
        $updateFields[] = "nama = '$nama'";
    }
    if ($profil) {
        $updateFields[] = "profile = '$profil'";
    }
    if ($password) {
        $updateFields[] = "password = '$password'";
    }

    if (count($updateFields) > 0) {
        $updateQuery .= implode(", ", $updateFields);
        $updateQuery .= " WHERE id = $akun_id";

        $updateResult = $CRUD->update($updateQuery);

        if ($updateResult) {
            $response = ["status" => true, "message" => "Akun berhasil diperbarui."];
        } else {
            $response = ["status" => false, "message" => "Gagal memperbarui akun."];
        }
    } else {
        $response = ["status" => false, "message" => "Tidak ada data yang diubah."];
    }

    echo json_encode($response);
}



// Get akun
function getAkun($password, $email, $CRUD)
{
    $query = "SELECT id, nama, email, password, role, profile FROM akun";

    if ($password && $email) {
        $query .= " WHERE password='{$password}' AND email='{$email}'";
    } else {
        $query .= " WHERE role != 'admin'";
    }

    $res = $CRUD->read($query);
    $result = "";
    if (mysqli_num_rows($res) > 0) {
        $data = [];
        while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
        }
        $result = ["status" => true, "data" => $data];
    } else {
        $result = ["status" => false, "data" => []];
    }
    echo json_encode($result);
}

// Create akun
function createAkun($CRUD)
{
    $data = json_decode(file_get_contents("php://input"), true);
    $nama = $data["nama"] ?? null;
    $password = $data["password"] ?? null;
    $email = $data["email"] ?? null;
    $role = $data["role"] ?? null;
    $profile = $data["profile"] ?? null;

    if (!$nama || !$email || !$role || !$password || !$profile) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid input data",
        ]);
        return;
    }

    $queryInsert = "INSERT INTO akun (nama, password, email, role, profile) VALUES ('{$nama}', '{$password}', '{$email}', '{$role}', '{$profile}')";
    
    try {
        $res = $CRUD->create($queryInsert);
        if ($res) {
            $queryLastId = "SELECT LAST_INSERT_ID() AS id";
            $result = $CRUD->read($queryLastId);

            if ($row = $result->fetch_assoc()) {
                $id = $row["id"];
                echo json_encode([
                    "status" => true,
                    "message" => "Akun berhasil dibuat",
                    "data" => [
                        "id" => $id,
                        "nama" => $nama,
                        "email" => $email,
                        "role" => $role,
                        "profile" => $profile,
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
                "message" => "Gagal menyimpan akun",
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Email {$email} sudah ada",
        ]);
    }
}


?>
