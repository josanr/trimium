<?php


namespace App;


class Request
{
    public function __construct()
    {

    }

    public function getIsAjaxRequest(): bool
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';
    }

    public function getPost(string $name, $defaultValue = null): string
    {
        return isset($_POST[$name]) ? $_POST[$name] : $defaultValue;
    }

    public function getJSON(string $name, $defaultValue = null)
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        return isset($data[$name]) ? $data[$name] : $defaultValue;
    }

    public function getUri()
    {
        return $_SERVER['REQUEST_URI'];
    }

}
