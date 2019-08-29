<?php


namespace App;


use Errors\InternalError;
use PDO;
use Views\LayoutView;

class App
{
    private $defaultController = "\\Controllers\\" . "DefaultController";
    private $defaultAction = "index";
    /** @var PDO */
    private $db;
    /** @var Route */
    private $route;
    /** @var LayoutView */
    private $layout;
    /**
     * @var Request
     */
    private $request;

    public function __construct(string $uri, array $config)
    {
        $this->route = new Route($uri);
        $this->request = new Request();
        $this->layout = new LayoutView();
        session_start();

        if(!isset($_SESSION['login'])) {
            $_SESSION['login'] = "guest";
            $_SESSION['isAdmin'] = false;
        }
        try {
            $this->db = new PDO("mysql:host={$config["db"]["host"]};dbname={$config["db"]["dbname"]};charset=utf8", $config["db"]["username"], $config["db"]["password"]);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_TO_STRING);
            $this->db->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }catch (\PDOException $ex){
            throw new \Exception("DB not Initialised");
        }
    }


    public function launch()
    {

        $result = "";
        $controller = null;
        $controllerName = $this->route->getControllerName() === null ? $this->defaultController : "\\Controllers\\" . ucfirst($this->route->getControllerName());
        try {
            if (class_exists($controllerName)) {
                $controller = new $controllerName($this->db, $this->request);
            } else {
                print "error on class : ";
                var_export($this->route);
            }

            $actionName = $this->route->getActionName() === null ? $this->defaultAction : ucfirst($this->route->getActionName());
            if (method_exists($controller, $actionName)) {
                $result = $controller->$actionName();
            } else {
                print "error on method :" . $actionName;
            }


            if ($this->request->getIsAjaxRequest()) {
                // Set the status
                $statusHeader = 'HTTP/1.1 ' . 200 . ' ' . $this->getStatusCodeMessage(200);
                header($statusHeader);
                // Set the content type
                header('Content-type: ' . 'application/json');
                if (is_array($result)) {
                    $content = json_encode($result, 268);
                } else {
                    $content = $result;
                }


            } else {
                $this->layout->setContent($result);
                $this->layout->setUsername($_SESSION["login"]);
                $content = $this->layout->render();
            }

            header('Content-length: ' . mb_strlen($content, 'utf8'));
            echo $content;
        }catch (InternalError $ex){
            $statusHeader = 'HTTP/1.1 ' . 500 . ' ' . $this->getStatusCodeMessage(500);
            header($statusHeader);
            echo $ex->getMessage();
        }
    }

    protected function getStatusCodeMessage($status)
    {
        $codes = array(
            100 => 'Continue',
            101 => 'Switching Protocols',
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            306 => '(Unused)',
            307 => 'Temporary Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported',
        );
        return (isset($codes[$status])) ? $codes[$status] : '';
    }
}