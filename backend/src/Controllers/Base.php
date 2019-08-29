<?php


namespace Controllers;


use App\Request;
use PDO;

class Base
{
    /** @var PDO */
    protected $db;
    /** @var Request */
    protected $request;

    public function __construct(PDO $db, Request $request)
    {
        $this->db = $db;
        $this->request = $request;
    }


    public function Index(){
        return "Default controller Default action";
    }
}
