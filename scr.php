<?php
header('Content-Type: application/javascript');

/* */
if((strpos($_SERVER["SERVER_NAME"],'localhost')!==FALSE)
    || (strpos($_SERVER["SERVER_NAME"],'192.168.0.200')!==FALSE)){
    define('DATABASE_HOST','localhost');
    define('DATABASE_USER','16maps_locU3ve4');
    define('DATABASE_PASSWORD','Y.fl[/@:DcLt');
    define('DATABASE_NAME','16maps_local');
}else{
    define('DATABASE_HOST','10.0.16.16:4066');
    define('DATABASE_USER','Qyabhio9');
    define('DATABASE_PASSWORD','FRg7kpmbSzOX');
    define('DATABASE_NAME','jackq201m_mysql_galddzuv');
}


function db_connectDatabase(&$dbCon){
    $dbCon=mysql_connect(DATABASE_HOST,DATABASE_USER, DATABASE_PASSWORD);
    if (!$dbCon) return -1;
    mysql_select_db(DATABASE_NAME, $dbCon);
    return 0;
}

function db_closeDatabase(&$dbCon){
    mysql_close($dbCon);
}

function db_querySQL($SQLQuery,&$result){
    $databaseConnection;
    if (db_connectDatabase($databaseConnection)===-1) return -1;
    $result=mysql_query($SQLQuery,$databaseConnection);
    db_closeDatabase($databaseConnection);
    if(!$result) return -1;
    return 0;
}

function viewlog_getIP(){
    if(!empty($_SERVER["HTTP_CLIENT_IP"])){
        $cip = $_SERVER["HTTP_CLIENT_IP"];
    }elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
        $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    }elseif(!empty($_SERVER["REMOTE_ADDR"])){
        $cip = $_SERVER["REMOTE_ADDR"];
    }else{
        $cip = "ERROR!";
    }
    if(strpos($cip,',')===FALSE) return $cip;
    return substr($cip,0,strpos($cip,','));
}

function viewlog_getPageURL() {
    $pageURL = 'http';
    if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
        $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } else {
        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}


$referer;
if(!isset($_REQUEST['r'])||empty($_REQUEST['r'])){
    echo('var ___i___ = {"script":false};');
    exit;
}else{
    $referer=$_REQUEST['r'];
    $referer=base64_decode(urldecode($referer));
}

$userAgent=isset($_SERVER['HTTP_USER_AGENT'])?$_SERVER['HTTP_USER_AGENT']:'NULL';

$system;
$lower_UA=strtolower($userAgent);
if(strpos($lower_UA,'windows nt 6.1')!==FALSE){
    $system = 'Windows 7';
}elseif(strpos($lower_UA,'windows nt 6.0')!==FALSE){
    $system = 'Windows Vista';
}elseif(strpos($lower_UA,'windows nt 6.2')!==FALSE){
    $system = 'Windows 8';
}elseif(strpos($lower_UA,'windows nt 6.3')!==FALSE){
    $system = 'Windows 8.1';
}elseif(strpos($lower_UA,'windows nt 5.1')!==FALSE){
    $system = 'Windows XP';
}elseif(strpos($lower_UA,'windows nt 5.0')!==FALSE){
    $system = 'Windows 2000';
}elseif(strpos($lower_UA,'windows phone 8.1')!==FALSE){
    $system = 'Windows Phone 8.1';
}elseif(strpos($lower_UA,'windows phone 8.0')!==FALSE){
    $system = 'Windows Phone 8.0';
}elseif(strpos($lower_UA,'windows phone 7.8')!==FALSE){
    $system = 'Windows Phone 7.8';
}elseif(strpos($lower_UA,'windows phone')!==FALSE){
    $system = 'Windows Phone(unknow version)';
}elseif(strpos($lower_UA,'windows nt')!==FALSE){
    $system = 'Windows (unknow version)';
}elseif(strpos($lower_UA,'android 4.4')!==FALSE){
    $system = 'Android 4.4';
}elseif(strpos($lower_UA,'android 4.3')!==FALSE){
    $system = 'Android 4.3';
}elseif(strpos($lower_UA,'android 4.2')!==FALSE){
    $system = 'Android 4.2';
}elseif(strpos($lower_UA,'android 4.1')!==FALSE){
    $system = 'Android 4.1';
}elseif(strpos($lower_UA,'android 4.0')!==FALSE){
    $system = 'Android 4.0';
}elseif(strpos($lower_UA,'android 4')!==FALSE){
    $system = 'Android 4.x';
}elseif(strpos($lower_UA,'android 2.3')!==FALSE){
    $system = 'Android 2.3';
}elseif(strpos($lower_UA,'android 2')!==FALSE){
    $system = 'Android 2.x';
}elseif(strpos($lower_UA,'android')!==FALSE){
    $system = 'Android';
}elseif(strpos($lower_UA,'cpu iphone os 7')!==FALSE){
    $system = 'iOS 7 (iPhone)';
}elseif(strpos($lower_UA,'cpu iphone os 6')!==FALSE){
    $system = 'iOS 6 (iPhone)';
}elseif(strpos($lower_UA,'cpu iphone os 5')!==FALSE){
    $system = 'iOS 5 (iPhone)';
}elseif(strpos($lower_UA,'cpu iphone os')!==FALSE){
    $system = 'iOS x (iPhone)';
}elseif(strpos($lower_UA,'cpu os 7')!==FALSE){
    $system = 'iOS 7 (iPad)';
}elseif(strpos($lower_UA,'cpu os 6')!==FALSE){
    $system = 'iOS 6 (iPad)';
}elseif(strpos($lower_UA,'cpu os 5')!==FALSE){
    $system = 'iOS 5 (iPad)';
}elseif(strpos($lower_UA,'ipad')!==FALSE){
    $system = 'iOS x (iPad)';
}elseif(strpos($lower_UA,'ubuntu')!==FALSE){
    $system = 'Ubuntu';
}elseif(strpos($lower_UA,'mobile')!==FALSE){
    $system = 'unknown Mobile System';
}else{
    $system = 'unknow';
}

$ip=viewlog_getIP();

$pageURL =isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:'NULL'; 

$jsonResult=file_get_contents('http://ip.taobao.com/service/getIpInfo.php?ip='.$ip);

$arr=json_decode($jsonResult);
if($arr->code!=0){
    $geo_country = "";	//国家
    $geo_area =  "";	//区域
    $geo_region =  "";	//省份
    $geo_city =  "";	//城市
    $geo_county =  "";	//城市
    $geo_isp =  "";	    //运营商
}else{
    $geo_country = $arr->data->country;	//国家
    $geo_area =  $arr->data->area;	//区域
    $geo_region =  $arr->data->region;	//省份
    $geo_city =  $arr->data->city;	//城市
    $geo_county =  $arr->data->county;	//城市
    $geo_isp =  $arr->data->isp;	//运营商
}

//Prepair for tables
$query = "CREATE TABLE IF NOT EXISTS `16maps_viewLog`";
$query.=' (`id` INT NOT NULL AUTO_INCREMENT, ';	//ID
$query.='`time` TIMESTAMP NOT NULL, ';			//Time
$query.=' `ip` TEXT , ';						//IP
$query.=' `userAgent` TEXT , ';					//UA
$query.=' `system` TEXT , ';					//System
$query.=' `referer` TEXT , ';					//referer
$query.=' `pageURL` TEXT , ';					//pageURL
$query.=' `geo_country` TEXT , ';					//pageURL
$query.=' `geo_area` TEXT , ';					//pageURL
$query.=' `geo_region` TEXT , ';					//pageURL
$query.=' `geo_city` TEXT , ';					//pageURL
$query.=' `geo_county` TEXT , ';					//pageURL
$query.=' `geo_isp` TEXT , ';					//pageURL

$query.=" PRIMARY KEY (id))";


$result;
db_querySQL($query,$result);

$query="INSERT INTO `16maps_viewLog`";
$query.=" (`referer` , `userAgent` , `ip` , `pageURL` , `time` ,`system` ";
$query.=", `geo_country` , `geo_area` , `geo_region` , `geo_city` , `geo_county` , `geo_isp` ) VALUES ( ";
$query.=" \"$referer\" , \"$userAgent\" , \"$ip\" , \"$pageURL\" , NOW() , \"$system\" , ";
$query.="\"$geo_country\" , \"$geo_area\" , \"$geo_region\" , \"$geo_city\" , \"$geo_county\" , \"$geo_isp\" )";

$result;
db_querySQL($query,$result);
?>
function javascriptFunction(){
    return 0;
}