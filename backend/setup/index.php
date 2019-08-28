<?php

use App\App;

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../src/config/main.php";
try {
    $dbName = $config["db"]["dbname"];
    echo "Connect to DB host.\n";
    $db = new PDO("mysql:host={$config["db"]["host"]};charset=utf8", $config["db"]["username"], $config["db"]["password"]);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_TO_STRING);
    $db->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $stmt = $db->prepare("SHOW DATABASES");
    $stmt->execute([]);
    $dbExists = false;
    echo "Check DB existence.\n";
    foreach ($stmt as $dbItem) {
        if ($dbItem["database"] == $dbName) {
            $dbExists = true;
        }
    }

    if (!$dbExists) {
        echo "DB does not exist, create.\n";
        $db->exec("CREATE DATABASE {$dbName};");
    }

    echo "Create new table if NOT exists already.\n";

    $sql = "
        CREATE TABLE IF NOT EXISTS {$dbName}.users
        (
            active             CHAR(1)      NOT NULL,
            name               VARCHAR(256) NOT NULL,
            last_name          VARCHAR(256) NOT NULL,
            email              VARCHAR(256) NOT NULL,
            xml_id             VARCHAR(128) NOT NULL,
            personal_gender    CHAR(1)      NOT NULL,
            personal_birthdate DATE         NOT NULL,
            work_position      TEXT         NOT NULL,
            region             VARCHAR(256) NOT NULL,
            city               VARCHAR(256) NOT NULL
        ) ENGINE = InnoDB
          CHARACTER SET utf8
          COLLATE utf8_bin;";
    $db->exec($sql);


    echo "Start data import.\n";
    $db->beginTransaction();

    $sql = "INSERT INTO {$dbName}.users(active, name, last_name, email, xml_id, personal_gender, personal_birthdate,
                  work_position, region, city)
            VALUES (
                    :active, 
                    :name,
                    :last_name,
                    :email,
                    :xml_id,
                    :personal_gender,
                    :personal_birthdate,
                    :work_position,
                    :region,
                    :city
                    )";

    $stmt = $db->prepare($sql);


    $file = file(__DIR__ . "/../../import.csv", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($file as $id => $line){
        if($id === 0){
            continue;
        }
        $lineArr = explode(";", $line);
        echo "Add line #{$id}.\n";

        $stmt->execute([
            "active" => $lineArr[0],
            "name" => $lineArr[1],
            "last_name" => $lineArr[2],
            "email" => $lineArr[3],
            "xml_id" => $lineArr[4],
            "personal_gender" => $lineArr[5],
            "personal_birthdate" => (new DateTime($lineArr[6]))->format("Y-m-d"),
            "work_position" => $lineArr[7],
            "region" => $lineArr[8],
            "city" => $lineArr[9],
        ]);

    }

    $db->commit();
}catch (PDOException $ex){
    echo "Exceptional situation on db work: " . $ex->getMessage()."\n";
}