<?php


namespace App;


class Route
{
    private $controllerName;
    private $actionName;
    /** @var string */
    private $queryString;


    /**
     * Router constructor.
     *
     * @param string $uri
     */
    public function __construct(string $uri)
    {

        $route = null;
        $queryPos = strpos($uri, '?');
        if($queryPos !== false){
            $route = substr($uri, 0, $queryPos);
        }
        $route = is_null($route) ? $uri : $route;
        $route = explode('/', $route);
        array_shift($route);
        if(isset($route[0]) and $route[0] !== "") {
            $this->controllerName = $route[0];
        }
        if(isset($route[1]) and $route[1] !== "") {
            $this->actionName = $route[1];
        }
        $this->queryString = "";
        if($queryPos !== false) {
            $this->queryString = substr($uri, $queryPos+1);
        }

    }

    public function getControllerName(): ?string
    {
        return $this->controllerName;
    }

    public function getActionName(): ?string
    {
        return $this->actionName;
    }

    public function getQueryString(): ?string
    {
        return $this->queryString;
    }


}
