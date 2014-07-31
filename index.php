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
    <script type="text/javascript" src="js/res/chinaMapConfig.js"></script>
    <script type="text/javascript" src="js/res/worldMapConfig.js"></script>
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
            Map of Sixteen<span style="font-size:0.3em;position:relative;bottom:15px;">BETA</span>
        </div>
        <div class="ctrl-list">
            <div class="ctrl-listctrl">
                <span class="ctrl-button" id="ctrl-nation-button">全国</span>
                <span>&gt;</span>
                <span class="ctrl-button" id="ctrl-province-button">选择省份</span>
                <span id="ctrl-gt" style="display:none;">&gt;</span>
                <span class="ctrl-button" id="ctrl-school-button" style="display:none;">选择院校</span>
            </div>
            <div class="ctrl-list-province-box" id="ctrl-province">
                <div class="ctrl-list-list">
                </div>
            </div>
            <div class="ctrl-list-school-box" id="ctrl-school">
                <div class="ctrl-list-list" id="ctrl-schoolList">
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
            <div class="ctrl-namelist" id="ctrl-namelist">
            </div>
        </div>
        <div class="ctrl-about" id="ctrl-about">&copy;2014 Jack Q | Last Modified: 2014-07-31</div>
    </div>
    <div class="maps-box-wrapper">
        <div class="maps-box" id="maps-box">
            <div class="maps-china" id="maps-china"></div>
            <div class="maps-point" id="maps-points">
            </div>
        </div>
    </div>
    <div class="info-box" id="info-box">
        <div class="info-wrapper">
            <div id="info-close" class="info-close">x</div>
            <div class="info-banner">
                <div class="info-picture">
                    <img width="800" height="150" alt="BANNER" src="img/banner-default.jpg" />
                </div>
                <div class="info-name" id="info-name"></div>
                <div class="info-nav">
                    <span id="info-link-1" class="info-link info-link-on">联系方式</span>
                    <span id="info-link-2" class="info-link">详细信息</span>
                    <span id="info-link-3" class="info-link">个人页面</span>
                </div>
            </div>
            <div class="info-page-wrapper" id="info-page">
                <div class="info-page ">
                    <div class="info-cont-box">
                        <div class="info-cont-item" id="info-qq-box">
                            <img class="info-cont-icon" width="100" height="100" src="img/qq-icon.png" />
                            <div class="info-cont-cont">
                                <div class="info-cont-type">QQ</div>
                                <div class="info-cont-val" id="info-qq"></div>
                            </div>
                        </div>
                        <div class="info-cont-item" id="info-mail-box">
                            <img class="info-cont-icon" width="100" height="100" src="img/mail-icon.png" />
                            <div class="info-cont-cont">
                                <div class="info-cont-type">电子邮箱</div>
                                <div class="info-cont-val-long" id="info-mail"></div>
                            </div>
                        </div>
                        <div class="info-cont-item" id="info-phone-box">
                            <img class="info-cont-icon" width="100" height="100" src="img/phone-icon.png" />
                            <div class="info-cont-cont">
                                <div class="info-cont-type">电话</div>
                                <div class="info-cont-val" id="info-phone"></div>
                            </div>
                        </div>
                        <div class="info-cont-item" id="info-phone2-box">
                            <img class="info-cont-icon" width="100" height="100" src="img/phone2-icon.png" />
                            <div class="info-cont-cont">
                                <div class="info-cont-type">电话 2 </div>
                                <div class="info-cont-val" id="info-phone2"></div>
                            </div>
                        </div>
                        <div class="info-cont-item" id="info-address-box">
                            <img class="info-cont-icon" width="100" height="100" src="img/address-icon.png" />
                            <div class="info-cont-cont">
                                <div class="info-cont-type">地址</div>
                                <div class="info-cont-val-long" id="info-address"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info-page">
                    <div class="info-det-box">
                        <div class="info-page-tip">
                            Under Construction !
                        </div>
                    </div>
                </div>
                <div class="info-page">
                    <div class="info-page-box">
                        <div class="info-page-tip">
                            Under Construction !
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="about-box about-box-on" id="about-box">
        <div class="about-page">

            <div class="about-title">
                <div class="about-close" id="about-close">x</div>
                关于本页面
            </div>
            <div class="about-content">

                此页面当前属于测试版，功能尚未完善，同时可能会有漏洞，请大家在QQ群内进行反馈或发邮件至<a href="mailto:QiaoBo@outlook.com?subject=Feedback%20of%2016MAPS%20">QiaoBo@outlook.com</a>。
                <br />
                若有需要添加、更新或修正信息，请在QQ群内反馈或发邮件至<a href="mailto:QiaoBo@outlook.com?subject=Feedback%20of%2016MAPS%20">QiaoBo@outlook.com</a>;
                <br />
                若有任何关于此页面的建议，欢迎大家反馈。
                <br />
                <br />
                此页面运用 HTML5 + CSS3 技术实现，在早期浏览器内可能出现显示混乱的现象，请升级浏览器至最新版本。
                <br />
                浏览器最低要求：Internet Explorer 10，Firefox 4，Safari 5，Chrome 9或其它与之兼容浏览器。
            </div>
        </div>
    </div>
    <script>
        window.onload = function () {
            //Variables
            var sta = {
                'ctrl': false,
                'province': false,
                'school': false,
                'infoBox': false,
                'aboutBox': true,//TODO : Toggle this to false at release
                'infoTab': 1,// 1 - Contact Method; 2 - Detailed Information; 3 - Personal Page
                'mapRatio': 1.0,
                'personData': [

                    { id: 13, name: "高靖男", province: "beijing", city: "北京", school: "首都经贸大学", phone: "13994305596", qq: "549431978", coordinate_x: 414, coordinate_y: 182 },
                    { id: 37, name: "张亦之", province: "beijing", city: "北京", school: "北京邮电（宏福）", qq: "739383613", coordinate_x: 413, coordinate_y: 188 },
                    { id: 1, name: "张彩云", province: "guangdong", city: "珠海", school: "暨南大学", phone: "13403428612", qq: "2084498307", coordinate_x: 408, coordinate_y: 411 },
                    { id: 29, name: "赵明", province: "guangdong", city: "广州", school: "广东工业大学", phone: "13613525998", qq: "927257754", coordinate_x: 411, coordinate_y: 398 },
                    { id: 41, name: "韩蕾", province: "henan", city: "郑州", school: "郑州大学", qq: "1279456545", coordinate_x: 399, coordinate_y: 255 },
                    { id: 11, name: "田思琦", province: "hubei", city: "武汉", school: "中南财经政法", phone: "13663421203", qq: "907683817", coordinate_x: 408, coordinate_y: 305 },
                    { id: 21, name: "高伟", province: "hubei", city: "武汉", school: "武汉工程大学", phone: "18735080770", qq: "936992306", coordinate_x: 408, coordinate_y: 305 },
                    { id: 14, name: "龚琪", province: "hunan", city: "长沙", school: "中南大学", phone: "13293526449", qq: "1183498100", coordinate_x: 394, coordinate_y: 333 },
                    { id: 23, name: "任福全", province: "hunan", city: "长沙", school: "国防科技大学", qq: "908347726", coordinate_x: 394, coordinate_y: 333 },
                    { id: 3, name: "刘伟", province: "jiangsu", city: "徐州", school: "中国矿大", phone: "13935256023", qq: "704533758", coordinate_x: 442, coordinate_y: 254 },
                    { id: 4, name: "崔越", province: "jiangsu", city: "徐州", school: "中国矿大", phone: "13383529796", qq: "1051879865", coordinate_x: 442, coordinate_y: 254 },
                    { id: 19, name: "李伯轩", province: "jiangsu", city: "南京", school: "南京大学", qq: "2425631404", coordinate_x: 470, coordinate_y: 282 },
                    { id: 27, name: "李玲玲", province: "jiangsu", city: "无锡", school: "江南大学", qq: "815117902", coordinate_x: 474, coordinate_y: 281 },
                    { id: 36, name: "范江", province: "jiangsu", city: "镇江", school: "江苏大学", phone: "15203423712", qq: "948302112", coordinate_x: 468, coordinate_y: 275 },
                    { id: 39, name: "赵晶", province: "jiangsu", city: "南京", school: "南京农业大学", phone: "18168057521", qq: "544415419", coordinate_x: 469, coordinate_y: 282 },
                    { id: 5, name: "李海", province: "jilin", city: "长春", school: "吉林大学", phone: "18234250560", qq: "1019928979", coordinate_x: 491, coordinate_y: 116 },
                    { id: 6, name: "许圣华", province: "jilin", city: "长春", school: "吉林大学", qq: "1786404107", coordinate_x: 491, coordinate_y: 116 },
                    { id: 15, name: "王圣元", province: "jilin", city: "长春", school: "长春理工大学", phone: "18235227290", coordinate_x: 491, coordinate_y: 116 },
                    { id: 33, name: "马晓瑞", province: "liaoning", city: "大连", school: "大连大学", qq: "254360957", coordinate_x: 470, coordinate_y: 183 },
                    { id: 16, name: "乔波", province: "shaanxi", city: "西安", school: "西安交通大学", email: "QiaoBo@outlook.com", qq: "1335288659", coordinate_x: 349, coordinate_y: 261 },
                    { id: 31, name: "温靖轩", province: "shaanxi", city: "西安", school: "西安电子科技", phone: "13623528001", qq: "853310132", coordinate_x: 349, coordinate_y: 260 },
                    { id: 2, name: "张众", province: "shandong", city: "济南", school: "山东大学", phone: "15536211954", qq: "1143982814", coordinate_x: 430, coordinate_y: 221 },
                    { id: 9, name: "张文娜", province: "shandong", city: "威海", school: "哈工大（威海）", phone: "18335252440", qq: "2470737208", coordinate_x: 477, coordinate_y: 208 },
                    { id: 52, name: "程鑫", province: "shandong", city: "威海", school: "哈工大（威海）", qq: "1209315715", coordinate_x: 478, coordinate_y: 208 },
                    { id: 20, name: "王玉香", province: "shanghai", city: "上海", school: "上海大学", phone: "18835256569", qq: "362862041", coordinate_x: 486, coordinate_y: 287 },
                    { id: 22, name: "张蕾", province: "shanghai", city: "上海", school: "华东理工大学", phone: "18735084168", qq: "569755502", coordinate_x: 486, coordinate_y: 287 },
                    { id: 12, name: "张益民", province: "shanxi", city: "太原", school: "太原理工", phone: "13403643158", qq: "964580448", coordinate_x: 380, coordinate_y: 217 },
                    { id: 28, name: "冯忠祥", province: "shanxi", city: "太原", school: "山西财经大学", phone: "15110719296", qq: "791134035", coordinate_x: 380, coordinate_y: 217 },
                    { id: 32, name: "李鹏", province: "shanxi", city: "太原", school: "山西大学", phone: "13546004515", qq: "1638510549", coordinate_x: 379, coordinate_y: 217 },
                    { id: 7, name: "胡鹏冲", province: "sichuan", city: "成都", school: "四川大学", phone: "18734625786", qq: "269049631", coordinate_x: 307, coordinate_y: 305 },
                    { id: 8, name: "乔亚男", province: "sichuan", city: "成都", school: "四川大学", phone: "13834129072", qq: "1196521782", coordinate_x: 307, coordinate_y: 305 },
                    { id: 38, name: "赵剑喆", province: "sichuan", city: "成都", school: "电子科技大学", qq: "458113051", coordinate_x: 305, coordinate_y: 306 },
                    { id: 47, name: "王亚楠", province: "taiyuan", city: "太原", school: "太原理工", qq: "2464136912", coordinate_x: 380, coordinate_y: 217 },
                    { id: 17, name: "王鹤媛", province: "tianjin", city: "天津", school: "南开大学", phone: "15296625164", qq: "2952203838", coordinate_x: 425, coordinate_y: 194 },
                    { id: 18, name: "王佳颉", province: "tianjin", city: "天津", school: "南开大学", qq: "954628981", coordinate_x: 425, coordinate_y: 194 },
                    { id: 25, name: "杨亚琼", province: "tianjin", city: "天津", school: "天津商业大学", qq: "13753229437", coordinate_x: 425, coordinate_y: 194 },
                    { id: 10, name: "董宁", province: "zhejiang", city: "杭州", school: "浙江理工", phone: "13994338807", qq: "380245935", coordinate_x: 475, coordinate_y: 301 },


                ],
                'provinceList': [
                    //['heilongjiang', '黑龙江', ['哈尔滨工业大学']],
                    ['jilin', '吉林', []],
                    ['liaoning', '辽宁', []],
                    //['hebei', '河北', []],
                    ['shandong', '山东', []],
                    ['jiangsu', '江苏', []],
                    ['zhejiang', '浙江', []],
                    //['anhui', '安徽', []],
                    ['henan', '河南', []],
                    ['shanxi', '山西', []],
                    ['shaanxi', '陕西', []],
                    //['gansu', '甘肃', []],
                    ['hubei', '湖北', []],
                    //['jiangxi', '江西', []],
                    //['fujian', '福建', []],
                    ['hunan', '湖南', []],
                    //['guizhou', '贵州', []],
                    ['sichuan', '四川', []],
                    //['yunnan', '云南', []],
                    //['qinghai', '青海', []],
                    //['hainan', '海南', []],
                    ['shanghai', '上海', []],
                    //['chongqing', '重庆', []],
                    ['tianjin', '天津', []],
                    ['beijing', '北京', []],
                    //['ningxia', '宁夏', []],
                    //['neimongol', '内蒙古', []],
                    //['guangxi', '广西', []],
                    //['xinjiang', '新疆', []],
                    ['guangdong', '广东', []],
                    //['macau', '澳门', []],
                    //['hongkong', '香港', []],
                    //['taiwan', '台湾', []],
                    //['xizang, '西藏', []],
                ],
                'pointDrawType': {
                    type: 'all',//all province person
                    info: 0 //all:N/A, province:index of province,person:id of person
                },
                'personFitleType': {
                    type: 'all',//all province school
                    info: 0,//for school case, the value shuold be the name of school
                },
                'provinceSelected': '',
                'mapExternal': {},
            };
            var $_ctrl = $( "div#ctrl-box" ),
                $_ctrl_toggle = $( "span#ctrl-toggle" ),
                $_ctrl_province = $( 'div#ctrl-province' ),
                $_maps_box = $( 'div#maps-box' ),
                $_maps = $( 'div#maps-china' ),
                $_points = $( 'div#maps-points' ),
                $_window = $( window ),
                $_ctrl_nameList = $( 'div#ctrl-namelist' ),
                $_ctrl_province = $( 'div#ctrl-province' ),
                $_ctrl_school = $( 'div#ctrl-ctrl-school' ),
                $_ctrl_province_btn = $( 'span#ctrl-province-button' ),
                $_ctrl_school_btn = $( 'span#ctrl-school-button' ),
                $_info_box = $( 'div#info-box' );

            //Functions
            function personPage_show( id, type ) {
                if ( type == 1 ) {
                    //Detailed Information
                    infoBox_fill( id );
                    infoBox_show( 1 );
                } else if ( type == 2 ) {
                    //Contact Methods
                    infoBox_fill( id );
                    infoBox_show( 2 );
                }
            }
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
                    'stateData': sta.mapData
                } );
                sta.mapRatio = mapWidth / 570.0;
                $_maps.SVGMap( {
                    mapName: 'china',
                    mapWidth: mapWidth,
                    mapHeight: mapHeight,
                    external: sta.mapExternal
                } );
                province_highlight();
            }
            function province_highlight() {
                //Initial Color : AAD5FF
                //Highlight Color feb41c
                var provinceAll = [
                    'heilongjiang',
                    'jilin',
                    'liaoning',
                    'hebei',
                    'shandong',
                    'jiangsu',
                    'zhejiang',
                    'anhui',
                    'henan',
                    'shanxi',
                    'shaanxi',
                    'gansu',
                    'hubei',
                    'jiangxi',
                    'fujian',
                    'hunan',
                    'guizhou',
                    'sichuan',
                    'yunnan',
                    'qinghai',
                    'hainan',
                    'shanghai',
                    'chongqing',
                    'tianjin',
                    'beijing',
                    'ningxia',
                    'neimongol',
                    'guangxi',
                    'xinjiang',
                    'xizang',
                    'guangdong',
                    'hongkong',
                    'taiwan',
                    'macau'
                ]
                for ( var i = 0; i < provinceAll.length; i++ ) {
                    sta.mapExternal[provinceAll[i]].attr( { fill: '#AAD5FF' } );
                }
                if ( sta.provinceSelected == "" ) {
                    return;
                }
                sta.mapExternal[sta.provinceSelected].attr( { fill: '#FEB41C' } );


            }
            function point_draw() {
                $_points.empty();
                function __point_draw( x, y, index ) {
                    var j = '<div class="maps-tag" data-id="' + index + '"><div class="maps-infoBox">';
                    j += sta.personData[index].name + '<br />' + '</div></div>';
                    j = $( j ).css( { 'top': y * sta.mapRatio - 30 + 'px', 'left': x * sta.mapRatio - 10 + 'px' } );
                    $_points.append( j );
                    j.click(( function ( i ) { return ( function () { personPage_show( i, 1 ); } ); } )( index ) );
                }
                if ( sta.pointDrawType.type == "all" ) {
                    for ( var i = 0; i < sta.personData.length; i++ ) {
                        var j = sta.personData[i];
                        if ( j.coordinate_x && j.coordinate_y ) {
                            __point_draw( j.coordinate_x, j.coordinate_y, i );
                        }
                    }
                } else if ( sta.pointDrawType.type == "province" ) {
                    for ( var i = 0; i < sta.personData.length; i++ ) {
                        var j = sta.personData[i];
                        if ( j.province == sta.provinceList[sta.pointDrawType.info][0] ) {
                            if ( j.coordinate_x && j.coordinate_y ) {
                                __point_draw( j.coordinate_x, j.coordinate_y, i );
                            }
                        }
                    }
                } else if ( sta.pointDrawType.type == "person" ) {
                    var i = sta.pointDrawType.info;
                    var j = sta.personData[i];
                    if ( j.coordinate_x && j.coordinate_y ) {
                        __point_draw( j.coordinate_x, j.coordinate_y, i );
                    }
                }
            }
            function redraw() {
                maps_draw();
                point_draw();
            }
            function province_select( i ) {
                $_ctrl_province_btn.text( sta.provinceList[i][1] );
                $_ctrl_province.removeClass( 'ctrl-list-province-box-on' );
                sta.province = false;

                sta.pointDrawType.type = 'province';
                sta.pointDrawType.info = i;
                point_draw();

                sta.personFitleType.type = 'province';
                sta.personFitleType.info = i;
                person_fitle();

                sta.provinceSelected = sta.provinceList[i][0];
                province_highlight();
            }
            function person_fitle() {
                if ( sta.pointDrawType.type == 'all' ) {
                    for ( var i = 0; i < sta.personData.length; i++ ) {
                        sta.personData[i].node.removeClass( 'ctrl-nameitem-off' );
                    }
                } else if ( sta.pointDrawType.type == 'province' ) {
                    for ( var i = 0; i < sta.personData.length; i++ ) {
                        if ( sta.personData[i].province == sta.provinceList[sta.personFitleType.info][0] ) {
                            sta.personData[i].node.removeClass( 'ctrl-nameitem-off' );
                        } else {
                            sta.personData[i].node.addClass( 'ctrl-nameitem-off' );
                        }
                    }

                } else if ( sta.pointDrawType.type == 'school' ) {
                    for ( var i = 0; i < sta.personData.length; i++ ) {
                        if ( sta.personData[i].school == sta.personFitleType.info ) {
                            sta.personData[i].node.removeClass( 'ctrl-nameitem-off' );
                        } else {
                            sta.personData[i].node.addClass( 'ctrl-nameitem-off' );
                        }
                    }
                }
            }
            function infoTab_change() {
                switch ( sta.infoTab ) {
                    case 3:
                        $( 'span#info-link-1' ).removeClass( 'info-link-on' );
                        $( 'span#info-link-2' ).removeClass( 'info-link-on' );
                        $( 'span#info-link-3' ).addClass( 'info-link-on' );
                        $( 'div#info-page' ).css( 'left', '-200%' );
                        break;
                    case 2:
                        $( 'span#info-link-1' ).removeClass( 'info-link-on' );
                        $( 'span#info-link-2' ).addClass( 'info-link-on' );
                        $( 'span#info-link-3' ).removeClass( 'info-link-on' );
                        $( 'div#info-page' ).css( 'left', '-100%' );
                        break;
                    case 1: default:
                        $( 'span#info-link-1' ).addClass( 'info-link-on' );
                        $( 'span#info-link-2' ).removeClass( 'info-link-on' );
                        $( 'span#info-link-3' ).removeClass( 'info-link-on' );
                        $( 'div#info-page' ).css( 'left', '0' );
                        sta.infoTab = 1;
                }
            }
            function infoBox_fill( id ) {
                var j = sta.personData[id];
                //Fill Name
                $( '#info-name' ).text( j.name );

                //Fill Contact Method
                if ( j.qq ) { $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); $( '#info-qq' ).text( j.qq ); } else { $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); }
                if ( j.email ) { $( '#info-mail-box' ).removeClass( 'info-cont-item-off' ); $( '#info-mail' ).text( j.email ); } else { $( '#info-mail-box' ).addClass( 'info-cont-item-off' ); }
                if ( j.phone ) { $( '#info-phone-box' ).removeClass( 'info-cont-item-off' ); $( '#info-phone' ).text( j.phone ); } else { $( '#info-phone-box' ).addClass( 'info-cont-item-off' ); }
                if ( j.phone2 ) { $( '#info-phone2-box' ).removeClass( 'info-cont-item-off' ); $( '#info-phone2' ).text( j.phone2 ); } else { $( '#info-phone2-box' ).addClass( 'info-cont-item-off' ); }
                if ( j.address ) { $( '#info-address-box' ).removeClass( 'info-cont-item-off' ); $( '#info-address' ).text( j.address ); } else { $( '#info-address-box' ).addClass( 'info-cont-item-off' ); }
                //if ( j.qq ) { $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); $( '#info-qq' ).text( j.qq ); } else { $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); }
                //TODO: Fill Detailed Information and Fill Personal Page
            }
            function infoBox_show( infoTab ) {
                if ( infoTab != undefined && infoTab != sta.infoTab ) {
                    sta.infoTab = infoTab;
                    infoTab_change();
                }
                if ( sta.infoBox == false ) {
                    $_info_box.addClass( 'info-box-on' );
                    sta.infoBox = true;
                }
            }

            window.__jq_person_call = function ( func, id ) {
                switch ( func ) {
                    case 'MAP':
                        sta.pointDrawType.type = 'person';
                        sta.pointDrawType.info = id;
                        point_draw();
                        break;
                    case 'DET':
                        personPage_show( id, 2 );
                        break;
                    case 'COT':
                        personPage_show( id, 1 );
                        break;
                }
            }
            function control_fill() {
                //Fill Name List
                for ( var i = 0; i < sta.personData.length; i++ ) {
                    var j = '<div class="ctrl-nameitem">',
                        k = sta.personData[i];
                    j += '<div class="name-photo'
                        + ( k.photo ?/*TODO*/'' : '-default"></div>' );
                    j += '<div class="name-name">' + k.name + '</div>';
                    j += '<div class="name-school">' + ( k.school ? k.school : '' ) + '</div>';
                    j += '<div class="name-major">' + ( k.major ? k.major : '' ) + '</div>';
                    j += '<div class="name-linkbox"><span class="name-button" onclick="__jq_person_call(\'MAP\','
                        + i + ')">地图定位</span>';
                    j += '<span class="name-button" onclick="__jq_person_call(\'DET\',' + i + ')">详细信息</span>';
                    j += '<span class="name-button" onclick="__jq_person_call(\'COT\',' + i + ')">联系方式</span></div></div>';
                    j = $( j );
                    k.node = j;
                    $_ctrl_nameList.append( j );
                }
                //Fill Province List
                for ( var i = 0; i < sta.provinceList.length; i++ ) {
                    var j = '<div class="ctrl-list-item">' + sta.provinceList[i][1] + '</div>';
                    j = $( j );
                    j.click(( function ( i ) {
                        return function () {
                            province_select( i );
                        }
                    } )( i ) );
                    $( $_ctrl_province.children()[0] ).append( $( j ) );
                }
            }
            //Initialize Map
            redraw(); control_fill();

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
            $( 'span#ctrl-nation-button' ).click( function () {
                sta.pointDrawType.type = 'all';
                $_ctrl_school_btn.css( 'display', 'none' ).text( '选择省份' );
                $( 'span#ctrl-gt' ).css( 'display', 'none' );
                point_draw();
                $_ctrl_province_btn.text( '选择省份' );
                if ( sta.school ) {
                    $_ctrl_school.removeClass( 'ctrl-list-school-box-on' );
                    sta.school = false;
                }
                if ( sta.province ) {
                    $_ctrl_province.removeClass( 'ctrl-list-province-box-on' );
                    sta.province = false;
                }
                sta.personFitleType.type = 'all';
                person_fitle();

                sta.provinceSelected = "";
                province_highlight();
            } );
            $_ctrl_province_btn.click( function () {
                if ( sta.school ) {
                    $_ctrl_school.removeClass( 'ctrl-list-school-box-on' );
                    sta.school = false;
                }
                if ( sta.province ) {
                    return;
                }
                $_ctrl_province.addClass( 'ctrl-list-province-box-on' );
                sta.province = true;
            } );
            $( 'div#info-close' ).click( function () {
                if ( sta.infoBox ) {
                    $_info_box.removeClass( 'info-box-on' );
                    sta.infoBox = false;
                }
            } );
            $( 'span#info-link-1' ).click( function () {

                sta.infoTab = 1; infoTab_change();
            } );

            $( 'span#info-link-2' ).click( function () {
                sta.infoTab = 2; infoTab_change();
            } );

            $( 'span#info-link-3' ).click( function () {
                sta.infoTab = 3; infoTab_change();
            } );

            $( 'div#about-close' ).click( function () {
                sta.aboutBox = false;
                $( 'div#about-box' ).removeClass( 'about-box-on' );
            } );

            $( 'div#ctrl-about' ).click( function () {
                sta.aboutBox = true;
                $( 'div#about-box' ).addClass( 'about-box-on' );
            } );
        }
    </script>
</body>

</html>