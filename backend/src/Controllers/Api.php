<?php


namespace Controllers;


use Services\ProfileRepo;

class Api extends Base
{
    public function profile(){
        $uri = explode("/", $this->request->getUri());
        $id = array_pop($uri);
        if(empty($id)){
            $id = array_pop($uri);
        }
        if(!is_numeric($id)){
            return "error";
        }
        $profileRepo = new ProfileRepo($this->db);
        $profile = $profileRepo->getById($id);
        return json_encode([
            "id" => $profile->getId(),
            "name" => $profile->getName()
        ], 268);
    }
}