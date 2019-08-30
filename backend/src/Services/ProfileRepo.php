<?php


namespace Services;


use Models\Profile;
use PDO;
use PDOStatement;

class ProfileRepo
{
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /** @var PDOStatement */
    private $selectStmt;

    public function getById(int $id): Profile{
        if(!$this->selectStmt){
            $sql = "
                select
                    *
                FROM
                 users
                where id = :id
            ";

            $this->selectStmt = $this->db->prepare($sql);
        }

        $this->selectStmt->execute([
            "id" => $id
        ]);

        $item = $this->selectStmt->fetch();
        return new Profile(
            (int)$item["id"],
            $item["active"],
            $item["name"],
            $item["last_name"],
            $item["email"],
            $item["xml_id"],
            $item["personal_gender"],
            $item["personal_birthdate"],
            $item["work_position"],
            $item["region"],
            $item["city"]
        );
    }
}