<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="baidu-site-verification" content="tKs9kOOFVn" />
    <link href="favicon.ico" type="image/x-icon" rel="icon">
    <link href="favicon.ico" type="image/x-icon" rel="shortcut icon">
    <title>Map of Sixteen</title>
    <script type="text/javascript" src="js/lib/jquery.js"></script>
    <script type="text/javascript" src="js/lib/raphael-min.js"></script>
    <script type="text/javascript" src="js/res/chinamapconfig.js"></script>
    <script type="text/javascript" src="js/res/worldmapconfig.js"></script>
    <script type="text/javascript" src="js/map.js"></script>
    <link rel="stylesheet" href="/style/style.css" />
</head>
<body>
    <div class="ctrl-box" id="ctrl-box">
        <div class="ctrl-title">
            <span class="ctrl-open" id="ctrl-toggle">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 200 200" xml:space="preserve">
                <path d="M100,10c-49.706,0-90,40.294-90,90s40.294,90,90,90s90-40.294,90-90S149.706,10,100,10z M100,175
	                    c-41.421,0-75-33.579-75-75c0-41.421,33.579-75,75-75c41.421,0,75,33.579,75,75C175,141.421,141.421,175,100,175z" />
                <polygon points="30,80 60,80 100.216,120 140,80 170,80 100,150 " />
                </svg>
            </span>
            Map of Sixteen
        </div>
        <div class="ctrl-list">
            <div class="ctrl-listctrl">
                <span id="ctrl-nation-button">全国</span>
                &gt;
                <span id="ctrl-province-button">山西</span>
                &gt;
                <span id="ctrl-school-button">某某某某某大学</span>
            </div>
            <div class="ctrl-list-province-box-off" id="ctrl-province">
                <div class="ctrl-list-list">
                    <div class="ctrl-list-item">北京</div>
                    <div class="ctrl-list-item">天津</div>
                    <div class="ctrl-list-item">上海</div>
                    <div class="ctrl-list-item">重庆</div>
                    <div class="ctrl-list-item">北京</div>
                    <div class="ctrl-list-item">天津</div>
                    <div class="ctrl-list-item">上海</div>
                    <div class="ctrl-list-item">重庆</div>
                    <div class="ctrl-list-item">北京</div>
                    <div class="ctrl-list-item">天津</div>
                    <div class="ctrl-list-item">上海</div>
                    <div class="ctrl-list-item">重庆</div>
                    <div class="ctrl-list-item">北京</div>
                    <div class="ctrl-list-item">天津</div>
                    <div class="ctrl-list-item">上海</div>
                    <div class="ctrl-list-item">重庆</div>
                    <div class="ctrl-list-item">北京</div>
                    <div class="ctrl-list-item">天津</div>
                    <div class="ctrl-list-item">上海</div>
                    <div class="ctrl-list-item">重庆</div>
                </div>
            </div>
            <div class="ctrl-list-school-box-off">
                <div class="ctrl-list-list">
                    <div class="ctrl-list-item">北京大学</div>
                    <div class="ctrl-list-item">北京航空航天大学</div>
                    <div class="ctrl-list-item">北京师范大学</div>
                    <div class="ctrl-list-item">北京理工大学</div>
                    <div class="ctrl-list-item">北京交通大学</div>
                    <div class="ctrl-list-item">北京邮电大学</div>
                    <div class="ctrl-list-item">北京林业大学</div>
                    <div class="ctrl-list-item">北京外国语大学</div>
                    <div class="ctrl-list-item">北京化工大学</div>
                </div>
            </div>
            <div class="ctrl-namelist">
                <div class="ctrl-nameitem">
                    <div class="name-photo-default"></div>
                    <div class="name-name">某某某</div>
                    <div class="name-school">某某某某某大学</div>
                    <div class="name-major">某某某某系</div>
                    <div class="name-linkbox">
                        <span class="name-button">地图定位</span>
                        <span class="name-button">详细资料</span>
                        <span class="name-button">联系方式</span>
                    </div>
                </div>
                <div class="ctrl-nameitem">
                    <div class="name-photo-default"></div>
                    <div class="name-name">某某某</div>
                    <div class="name-school">某某某某某大学</div>
                    <div class="name-major">某某某某系</div>
                    <div class="name-linkbox">
                        <span class="name-button">地图定位</span>
                        <span class="name-button">详细资料</span>
                        <span class="name-button">联系方式</span>
                    </div>
                </div>
                <div class="ctrl-nameitem">
                    <div class="name-photo-default"></div>
                    <div class="name-name">某某某</div>
                    <div class="name-school">某某某某某大学</div>
                    <div class="name-major">某某某某系</div>
                    <div class="name-linkbox">
                        <span class="name-button">地图定位</span>
                        <span class="name-button">详细资料</span>
                        <span class="name-button">联系方式</span>
                    </div>
                </div>
                <div class="ctrl-nameitem">
                    <div class="name-photo-default"></div>
                    <div class="name-name">某某某</div>
                    <div class="name-school">某某某某某大学</div>
                    <div class="name-major">某某某某系</div>
                    <div class="name-linkbox">
                        <span class="name-button">地图定位</span>
                        <span class="name-button">详细资料</span>
                        <span class="name-button">联系方式</span>
                    </div>
                </div>
                <div class="ctrl-nameitem">
                    <div class="name-photo-default"></div>
                    <div class="name-name">某某某</div>
                    <div class="name-school">某某某某某大学</div>
                    <div class="name-major">某某某某系</div>
                    <div class="name-linkbox">
                        <span class="name-button">地图定位</span>
                        <span class="name-button">详细资料</span>
                        <span class="name-button">联系方式</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="ctrl-about">&copy;2014 Jack Q | Last Modified: 2014-07-30</div>
    </div>
    <div class="maps-box-wrapper">
        <div class="maps-box" id="maps-box">
            <div class="maps-china" id="maps-china"></div>
            <div class="maps-point" id="maps-points">
                <div class="maps-tag"></div>
            </div>

        </div>
    </div>
    <div class="info-box"></div>
    <div class="tips-box"></div>

    <script>
        window.onload = function () {
            //Variables
            var sta = {
                'ctrl': false,
                'mapRatio': 1.0,
                'mapData': {
                    //    heilongjiang: {'stateInitColor':1, 'stateHoverColor':2, 'stateSelectedColor':3, 'baifenbi':0.5},//黑龙江
                    //    jilin: '吉林',
                    //    liaoning: '辽宁',
                    //    hebei: '河北',
                    //    shandong: '山东',
                    //    jiangsu: '江苏',
                    //    zhejiang: '浙江',
                    //    anhui: '安徽',
                    //    henan: '河南',
                    //    shanxi: '山西',
                    //    shaanxi: '陕西',
                    //    gansu: '甘肃',
                    //    hubei: '湖北',
                    //    jiangxi: '江西',
                    //    fujian: '福建',
                    //    hunan: '湖南',
                    //    guizhou: '贵州',
                    //    sichuan: '四川',
                    //    yunnan: '云南',
                    //    qinghai: '青海',
                    //    hainan: '海南',
                    //    shanghai: '上海',
                    //    chongqing: '重庆',
                    //    tianjin: '天津',
                    //    beijing: '北京',
                    //    ningxia: '宁夏',
                    //    neimongol: '内蒙古',
                    //    guangxi: '广西',
                    //    xinjiang: '新疆',
                    //    xizang: '西藏',
                    //    guangdong: '广东',
                    //    hongkong: '香港',
                    //    taiwan: '台湾',
                    //    macau: '澳门'
                },
                'pointData': {

                }
            };
            var $_ctrl = $( "div#ctrl-box" ),
                $_ctrl_toggle = $( "span#ctrl-toggle" ),
                $_ctrl_province = $( 'div#ctrl-province' ),
                $_maps_box = $( 'div#maps-box' ),
                $_maps = $( 'div#maps-china' ),
                $_points = $( 'div#maps-point' ),
                $_window = $( window );

            //Functions
            function maps_draw() {
                var ratio = 19.0 / 16.0;//Map Ratio: 19:16
                var width = $_window.width(), height = $_window.height(), mapWidth, mapHeight, mapLeft, mapTop;
                if ( height * ratio >= width ) {
                    //Width Restriction
                    mapHeight = width / ratio;
                    mapWidth = width;
                    mapLeft = 0;
                    mapTop = ( height - mapHeight ) / 2;
                } else {
                    //Height Restriction
                    mapHeight = height;
                    mapWidth = height * ratio;
                    mapTop = 0;
                    mapLeft = ( width - mapWidth ) / 2;
                }
                $_maps_box.css( {
                    'width': mapWidth,
                    'height': mapHeight,
                    'top': mapTop,
                    'left': mapLeft,
                    'stateData':sta.mapData
                } );
                sta.mapRatio = mapWidth / 570.0;
                $_maps.SVGMap( {
                    mapName: 'china',
                    mapWidth: mapWidth,
                    mapHeight: mapHeight,
                } );
            }
            function point_draw() {

            }
            function redraw() {
                maps_draw();
                point_draw();
            }
            //Initialize Map
            maps_draw();
            //Add Events Processor
            $_window.resize( redraw );
            $_ctrl_toggle.click( function () {
                if ( sta['ctrl'] ) {
                    $_ctrl_toggle.removeClass( 'ctrl-open-on' );
                    $_ctrl.removeClass( 'ctrl-box-on' );
                    sta['ctrl'] = false;
                } else {
                    $_ctrl_toggle.addClass( 'ctrl-open-on' );
                    $_ctrl.addClass( 'ctrl-box-on' );
                    sta['ctrl'] = true;
                }
            } );
        }
    </script>
</body>
</html>