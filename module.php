<?php

use chums\ui\CSSOptions;
use chums\ui\JSOptions;
use chums\ui\WebUI2;
use chums\user\Groups;

require_once("autoload.inc.php");

$ui = new WebUI2([
    'requiredRoles' => [Groups::SALES, GROUPS::REP, Groups::CUSTOMER],
    'title' => 'Sales History Graph',
    'contentFile' => 'body.php',
    'bodyClassName' => 'container-fluid',
    'requireLogin' => true,
]);
$ui
    ->addViteManifest()
    ->renderIframeModule();
