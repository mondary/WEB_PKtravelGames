<?php
header('Content-Type: application/octet-stream');
header('Cache-Control: no-cache');
readfile('games.db');
