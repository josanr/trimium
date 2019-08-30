<?php


namespace Controllers;


use DateTime;
use Errors\InternalError;
use Exception;
use PDOException;

class Setup extends Base
{
    public function Index()
    {

        $view = new \Views\Setup();
        return $view->render();
    }


    public function File()
    {
        $filedata = $this->request->getJSON("fileData");
        $file = explode("\n", base64_decode($filedata));

        try {
            $sql = "
                CREATE TABLE IF NOT EXISTS users
                (
                    id                 INT NOT NULL AUTO_INCREMENT,
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
            $this->db->exec($sql);

            $this->db->beginTransaction();

            $sql = "INSERT INTO users(active, name, last_name, email, xml_id, personal_gender, personal_birthdate,
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

            $stmt = $this->db->prepare($sql);

            $count = 0;
            foreach ($file as $id => $line) {
                if ($id === 0) {
                    continue;
                }
                $lineArr = explode(";", $line);
                if(count($lineArr) < 9){
                    continue;
                }
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
                $count++;
            }

            $this->db->commit();
            return json_encode([
                "content" => $count
            ]);
        }catch (PDOException $ex){
            throw new InternalError($ex->getMessage());
        }catch (Exception $ex){
            throw new InternalError($ex->getMessage());
        }
    }
}
