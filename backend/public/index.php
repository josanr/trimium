<?php

use App\App;

require_once __DIR__ ."/../vendor/autoload.php";
require_once __DIR__ ."/../config/main.php";
$uri = $_SERVER['REQUEST_URI'];

require __DIR__.'/../src/App/App.php';

$app = new App($uri, $config);

$app->launch();
