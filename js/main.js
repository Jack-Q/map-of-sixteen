
/// <reference path="lib/jquery-2.1.1.js" />
/// <reference path="lib/jquery.mobile.custom.js" />
/// <reference path="lib/jgestures.js" />
/// <reference path="lib/raphael.js" />
/// <reference path="lib/jquery.color-2.1.2.js" />
/// <reference path="map.js" />
/// <reference path="res/chinaMapConfig.js" />

// Map of Sixteen : Main Script

//var mapOfSixteen;
var mapOfSixteen = mapOfSixteen || {};

//Main work
mapOfSixteen.main = ( function () {
    //Variables
    var sta = {
        'ctrl': false,
        'province': false,
        'school': false,
        'infoBox': false,
        'aboutBox': true,//TODO : Toggle this to false at release
        'infoTab': 1,// 1 - Contact Method; 2 - Detailed Information; 3 - Personal Page(Permanently Deprecated)
        'mapRatio': 1.0,
        'mapCustomRatio': 1.5,//Customized Zoom Ratio 
        'mapPositionTop': 0,//Customized Map Position (X coordinate)
        'mapPositionLeft': 0,//Customized Map Position (Y Coordinate)
        'mapCenter': [285, 240],
        'mapCtrl': {
            zoomIn: true,
            zoomOut: false,
            pos: 0
        },
        'touchCount': 0,
        'mapDrag': false,
        'mapDragPos': [0, 0],
        'mapPinch': false,
        'mapPinchDist': 0,
        'personData': [
            //About This Data: Copied From Excel, Last Updated:August 8th, 2014
{ id: 1, name: "高靖男", province: "beijing", city: "北京", school: "首都经贸大学", major: "公共管理", detailPage: "5", backgroundPhoto: "5", photo: "73", phone: "13994305596", qq: "549431978", },
{ id: 2, name: "张亦之", province: "beijing", city: "北京", school: "北京邮电大学(宏福校区)", photo: "31", qq: "739383613", },
{ id: 3, name: "王慧康", province: "beijing", city: "北京", school: "北京交通大学", photo: "52", },
{ id: 4, name: "张赟", province: "beijing", city: "北京", school: "北京工商大学", photo: "57", },
{ id: 5, name: "张彩云", province: "guangdong", city: "珠海", school: "暨南大学", major: "自动化", detailPage: "6", backgroundPhoto: "6.v2", wechat: "A13403428612", photo: "10", phone: "13403428612", email: "13403428612@163.com", qq: "2084498307", },
{ id: 6, name: "赵明", province: "guangdong", city: "广州", school: "广东工业大学", photo: "46", phone: "13613525998", qq: "927257754", },
{ id: 7, name: "石文龙", province: "heilongjiang", city: "哈尔滨", school: "东北林业大学", photo: "9", qq: "2285874983", },
{ id: 8, name: "韩蕾", province: "henan", city: "郑州", school: "郑州大学", photo: "2", qq: "1279456545", },
{ id: 9, name: "田思琦", province: "hubei", city: "武汉", school: "中南财经政法大学", photo: "16", phone: "13663421203", qq: "907683817", },
{ id: 10, name: "李佳音", province: "hubei", city: "武汉", school: "中国地质大学(武汉)", photo: "36", qq: "392248358", },
{ id: 11, name: "高伟", province: "hubei", city: "武汉", school: "武汉工程大学", photo: "29", phone: "18735080770", qq: "936992306", },
{ id: 12, name: "龚琪", province: "hunan", city: "长沙", school: "中南大学", photo: "6", phone: "13293526449", qq: "1183498100", },
{ id: 13, name: "任福全", province: "hunan", city: "长沙", school: "国防科技大学", photo: "5", phone: "18535285226", qq: "908347726", },
{ id: 14, name: "范江", province: "jiangsu", city: "镇江", school: "江苏大学", major: "机械电子工程", detailPage: "2", backgroundPhoto: "2", photo: "20", phone: "15203423712", qq: "948302112", },
{ id: 15, name: "刘伟", province: "jiangsu", city: "徐州", school: "中国矿业大学", photo: "39", phone: "13935256023", qq: "704533758", },
{ id: 16, name: "李玲玲", province: "jiangsu", city: "无锡", school: "江南大学", photo: "35", qq: "815117902", },
{ id: 17, name: "赵晶", province: "jiangsu", city: "南京", school: "南京农业大学", photo: "18", phone: "18168057521", qq: "544415419", },
{ id: 18, name: "武雁伟", province: "jiangsu", city: "徐州", school: "中国矿业大学", photo: "30", },
{ id: 19, name: "崔越", province: "jiangsu", city: "徐州", school: "中国矿业大学", photo: "51", phone: "13383529796", qq: "1051879865", },
{ id: 20, name: "李伯轩", province: "jiangsu", city: "南京", school: "南京大学", photo: "41", qq: "2425631404", },
{ id: 21, name: "朱诗雅", province: "jiangsu", city: "镇江", school: "江苏大学", photo: "37", },
{ id: 22, name: "任凯", province: "jilin", city: "吉林", school: "吉林化工大学", photo: "48", qq: "532465106", },
{ id: 23, name: "王圣元", province: "jilin", city: "长春", school: "长春理工大学", detailPage: "1", backgroundPhoto: "1", photo: "40", phone: "18235227290", qq: "294335470", },
{ id: 24, name: "许圣华", province: "jilin", city: "长春", school: "吉林大学", photo: "15", qq: "1786404107", },
{ id: 25, name: "李海", province: "jilin", city: "长春", school: "吉林大学", major: "工商管理", detailPage: "7", backgroundPhoto: "7", wechat: "Y18234250560Y", photo: "21", phone: "18234250560", email: "1019928979@qq.com", qq: "1019928979", },
{ id: 26, name: "苏佳琪", province: "jilin", city: "长春", school: "吉林财经大学", photo: "56", qq: "942469154", },
{ id: 27, name: "刘翔宇", province: "liaoning", city: "阜新", school: "辽宁工程技术大学", },
{ id: 28, name: "马晓瑞", province: "liaoning", city: "大连", school: "大连大学", detailPage: "4", backgroundPhoto: "0", photo: "4", phone: "13203521625", email: "maxiaorui@foxmail.com", qq: "254360957", },
{ id: 29, name: "谭涛", province: "macau", city: "澳门", school: "澳门大学", photo: "22", phone: "13753229437", qq: "806503357", },
{ id: 30, name: "晋雪琪", province: "shaanxi", city: "杨凌", school: "西北农林科技大学", photo: "8", },
{ id: 31, name: "乔波", province: "shaanxi", city: "西安", school: "西安交通大学", major: "软件工程", photo: "11", email: "QiaoBo@outlook.com", qq: "1335288659", },
{ id: 32, name: "温靖轩", province: "shaanxi", city: "西安", school: "西安电子科技", photo: "27", phone: "13623528001", qq: "853310132", },
{ id: 33, name: "张文娜", province: "shandong", city: "威海", school: "哈尔滨工业大学(威海)", photo: "23", phone: "18335252440", qq: "2470737208", },
{ id: 34, name: "张众", province: "shandong", city: "济南", school: "山东大学", photo: "38", phone: "15536211954", qq: "1143982814", },
{ id: 35, name: "闫艺澎", province: "shandong", city: "威海", school: "哈尔滨工业大学(威海)", photo: "63", },
{ id: 36, name: "程鑫", province: "shandong", city: "威海", school: "哈尔滨工业大学(威海)", photo: "50", qq: "1209315715", },
{ id: 37, name: "王玉香", province: "shanghai", city: "上海", school: "上海大学", photo: "47", phone: "18835256569", qq: "362862041", },
{ id: 38, name: "杨泽鹏", province: "shanghai", city: "上海", school: "上海工程技术大学", photo: "44", phone: "13103425356", },
{ id: 39, name: "张宇坤", province: "shanghai", city: "上海", school: "上海电力学院", photo: "61", },
{ id: 40, name: "张蕾", province: "shanghai", city: "上海", school: "华东理工大学", photo: "34", phone: "18735084168", qq: "569755502", },
{ id: 41, name: "张益民", province: "shanxi", city: "太原", school: "太原理工大学", photo: "71", phone: "13403643158", qq: "964580448", },
{ id: 42, name: "谷思雨", province: "shanxi", city: "太原", school: "山西大学", major: "工商管理", detailPage: "3", backgroundPhoto: "0", photo: "49", phone: "15234209665", qq: "645776361", },
{ id: 43, name: "张玮", province: "shanxi", city: "太原", school: "太原理工大学", photo: "25", },
{ id: 44, name: "张建功", province: "shanxi", city: "太原", school: "太原理工大学", photo: "13", qq: "594981379", },
{ id: 45, name: "王亚楠", province: "shanxi", city: "太原", school: "太原理工大学", photo: "24", qq: "2464136912", },
{ id: 46, name: "郭瑞林", province: "shanxi", city: "太原", school: "太原理工大学", photo: "66", },
{ id: 47, name: "郭靖", province: "shanxi", city: "太原", school: "太原理工大学", photo: "53", },
{ id: 48, name: "程江", province: "shanxi", city: "太原", school: "太原科技大学", photo: "60", },
{ id: 49, name: "李鹏", province: "shanxi", city: "太原", school: "山西大学", photo: "19", phone: "13546004515", qq: "1638510549", },
{ id: 50, name: "张利荣", province: "shanxi", city: "太原", school: "山西财经大学", photo: "58", },
{ id: 51, name: "冯忠祥", province: "shanxi", city: "太原", school: "山西财经大学", photo: "69", phone: "15110719296", qq: "791134035", },
{ id: 52, name: "胡鹏冲", province: "sichuan", city: "成都", school: "四川大学", photo: "7", phone: "18734625786", qq: "269049631", },
{ id: 53, name: "闫艺湃", province: "sichuan", city: "成都", school: "四川大学", photo: "62", qq: "512346740", },
{ id: 54, name: "乔亚男", province: "sichuan", city: "成都", school: "四川大学", photo: "28", phone: "13834129072", qq: "1196521782", },
{ id: 55, name: "赵剑喆", province: "sichuan", city: "成都", school: "电子科技大学", photo: "32", qq: "458113051", },
{ id: 56, name: "刘奇", province: "sichuan", city: "成都", school: "成都信息工程学院", photo: "45", },
{ id: 57, name: "杨亚琼", province: "tianjin", city: "天津", school: "天津商业大学", photo: "14", qq: "13753229437", },
{ id: 58, name: "李觊尧", province: "tianjin", city: "天津", school: "天津工业大学", photo: "17", phone: "18335203218", qq: "1160107461", },
{ id: 59, name: "吴璇", province: "tianjin", city: "天津", school: "天津大学", photo: "3", qq: "382695854", },
{ id: 60, name: "王佳颉", province: "tianjin", city: "天津", school: "南开大学", photo: "1", qq: "954628981", },
{ id: 61, name: "王鹤媛", province: "tianjin", city: "天津", school: "南开大学", photo: "12", phone: "15296625164", qq: "2952203838", },
{ id: 62, name: "董宁", province: "zhejiang", city: "杭州", school: "浙江理工大学", photo: "33", phone: "13994338807", qq: "380245935", },





        ],
        'cityList': [
            //About This Data: Copied From Excel, Last Updated:August 8th, 2014
{ name: 'hangzhou', fullName: '杭州', coordinateX: 475, coordinateY: 301, tipPos: 'bottom', province: 'zhejiang' },
{ name: 'tianjin', fullName: '天津', coordinateX: 425, coordinateY: 194, tipPos: 'right', province: 'tianjin' },
{ name: 'chengdu', fullName: '成都', coordinateX: 307, coordinateY: 305, tipPos: 'bottom', province: 'sichuan' },
{ name: 'taiyuan', fullName: '太原', coordinateX: 380, coordinateY: 217, tipPos: 'top', province: 'shanxi' },
{ name: 'shanghai', fullName: '上海', coordinateX: 486, coordinateY: 287, tipPos: 'right', province: 'shanghai' },
{ name: 'weihai', fullName: '威海', coordinateX: 477, coordinateY: 208, tipPos: 'right', province: 'shandong' },
{ name: 'jinan', fullName: '济南', coordinateX: 430, coordinateY: 221, tipPos: 'top', province: 'shandong' },
{ name: 'xian', fullName: '西安', coordinateX: 351, coordinateY: 263, tipPos: 'top', province: 'shaanxi' },
{ name: 'yangling', fullName: '杨凌', coordinateX: 339, coordinateY: 265, tipPos: 'left', province: 'shaanxi' },
{ name: 'macau', fullName: '澳门', coordinateX: 413, coordinateY: 417, tipPos: 'bottom', province: 'macau' },
{ name: 'dalian', fullName: '大连', coordinateX: 470, coordinateY: 183, tipPos: 'top', province: 'liaoning' },
{ name: 'changchun', fullName: '长春', coordinateX: 491, coordinateY: 116, tipPos: 'top', province: 'jilin' },
{ name: 'jilin', fullName: '吉林', coordinateX: 499, coordinateY: 117, tipPos: 'right', province: 'jilin' },
{ name: 'zhenjiang', fullName: '镇江', coordinateX: 468, coordinateY: 275, tipPos: 'top', province: 'jiangsu' },
{ name: 'xuzhou', fullName: '徐州', coordinateX: 442, coordinateY: 254, tipPos: 'top', province: 'jiangsu' },
{ name: 'wuxi', fullName: '无锡', coordinateX: 474, coordinateY: 281, tipPos: 'right', province: 'jiangsu' },
{ name: 'nanjing', fullName: '南京', coordinateX: 469, coordinateY: 282, tipPos: 'left', province: 'jiangsu' },
{ name: 'changsha', fullName: '长沙', coordinateX: 394, coordinateY: 333, tipPos: 'left', province: 'hunan' },
{ name: 'wuhan', fullName: '武汉', coordinateX: 408, coordinateY: 304, tipPos: 'left', province: 'hubei' },
{ name: 'zhengzhou', fullName: '郑州', coordinateX: 399, coordinateY: 255, tipPos: 'left', province: 'henan' },
{ name: 'harbin', fullName: '哈尔滨', coordinateX: 493, coordinateY: 92, tipPos: 'top', province: 'heilongjiang' },
{ name: 'zhuhai', fullName: '珠海', coordinateX: 408, coordinateY: 411, tipPos: 'left', province: 'guangdong' },
{ name: 'guangzhou', fullName: '广州', coordinateX: 411, coordinateY: 398, tipPos: 'right', province: 'guangdong' },
{ name: 'beijing', fullName: '北京', coordinateX: 414, coordinateY: 182, tipPos: 'top', province: 'beijing' },
{ name: 'fuxin', fullName: '阜新', coordinateX: 464, coordinateY: 149, tipPos: 'left', province: 'liaoning' },

        ],
        'provinceList': [
            ['heilongjiang', '黑龙江', []],
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
            ['macau', '澳门', []],
            //['hongkong', '香港', []],
            //['taiwan', '台湾', []],
            //['xizang, '西藏', []],
        ],
        'pointDrawType': {
            type: 'all',//all province person
            info: 0 //all:N/A, province:index of province,person:id of person
        },
        'personFitleType': {
            type: 'all',//all province 
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
    function checkCustomRatio() {
        var ratio = sta.mapCustomRatio * sta.mapRatio;
        if ( ratio > 8 ) {
            sta.mapCustomRatio = 8 / sta.mapRatio;
        }
    }
    function mapsCtrl_set() {
        function ctrlbar_per2px( per ) {
            //Range from: 30px -> 222px ;
            return 30 + ( 222 - 30 ) * per;
        }
        //Zoom Out
        if ( sta.mapCustomRatio <= 1 ) {
            sta.mapCtrl.zoomOut = false;
            $( 'div#maps-ctrl-out' ).addClass( 'maps-ctrl-unable' );
        } else {
            sta.mapCtrl.zoomOut = true;
            $( 'div#maps-ctrl-out' ).removeClass( 'maps-ctrl-unable' );
        }

        //Zoom In
        if ( sta.mapCustomRatio * sta.mapRatio >= 8 ) {
            sta.mapCtrl.zoomIn = true;
            $( 'div#maps-ctrl-in' ).addClass( 'maps-ctrl-unable' );
        } else {
            sta.mapCtrl.zoomIn = true;
            $( 'div#maps-ctrl-in' ).removeClass( 'maps-ctrl-unable' );
        }
        document.writeln
        var percent = ( sta.mapCustomRatio - 1 ) / ( 8 / sta.mapRatio - 1 );
        $( 'div#maps-ctrl-cur' ).stop().animate( { 'left': ctrlbar_per2px( percent ) + 'px' } );
    }
    function maps_draw() {
        var mapRaw = { width: 570, height: 480 };
        var mapWidth, mapHeight, mapTop, mapLeft;
        var windowWidth = $_window.width(), windowHeight = $_window.height();
        var mapRealRatio = sta.mapRatio * sta.mapCustomRatio;
        //Calculate Map Ratio
        if ( windowWidth / windowHeight > mapRaw.width / mapRaw.height ) {
            //Height Restriction, left margin
            sta.mapRatio = windowHeight / mapRaw.height;
        } else {
            //Width Restiiction, top margin
            sta.mapRatio = windowWidth / mapRaw.width;
        }

        sta.mapCustomRatio = mapRealRatio / sta.mapRatio;
        sta.mapPositionTop = windowHeight / 2 - sta.mapCenter[1] * mapRealRatio;
        sta.mapPositionLeft = windowWidth / 2 - sta.mapCenter[0] * mapRealRatio;

        mapWidth = mapRaw.width * mapRealRatio;
        mapHeight = mapRaw.height * mapRealRatio;
        mapTop = sta.mapPositionTop;
        mapLeft = sta.mapPositionLeft;

        $_maps.css( {
            'width': mapWidth,
            'height': mapHeight,
            'top': mapTop,
            'left': mapLeft,
        } );

        $_maps.SVGMap( {
            mapName: 'china',
            mapWidth: mapWidth,
            mapHeight: mapHeight,
            external: sta.mapExternal
        } );
        mapsCtrl_set();
        province_highlight();
    }

    function map_zoomIn( zoomLevel ) {
        if ( !sta.mapCtrl.zoomIn ) { return false; }
        var realRatio = sta.mapRatio * sta.mapCustomRatio;
        if ( zoomLevel && typeof ( zoomLevel ) == 'number' ) {
            if ( realRatio * zoomLevel > 8 ) {
                sta.mapCustomRatio = 8 / sta.mapRatio;
            } else {
                sta.mapCustomRatio = sta.mapCustomRatio * zoomLevel;
            }
        } else {
            if ( ( 8 - realRatio ) / sta.mapRatio >= 0.5 ) {
                sta.mapCustomRatio += 0.5;
            } else {
                sta.mapCustomRatio = 8 / sta.mapRatio;
            }
        }
        maps_draw();
        point_draw();
        return false;
    }
    function map_zoomOut( zoomLevel ) {
        if ( !sta.mapCtrl.zoomOut ) { return false; }
        var realRatio = sta.mapRatio * sta.mapCustomRatio;
        if ( zoomLevel && typeof ( zoomLevel ) == 'number' ) {
            if ( realRatio * zoomLevel <= sta.mapRatio ) {
                sta.mapCustomRatio = 1;
            } else {
                sta.mapCustomRatio = realRatio * zoomLevel / sta.mapRatio;
            }
        } else {
            if ( sta.mapCustomRatio > 1.5 ) {
                sta.mapCustomRatio -= 0.5;
            } else {
                sta.mapCustomRatio = 1;
            }
        }
        maps_draw();
        point_draw();
        return false;
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
        if ( sta.pointDrawType.type == "all" ) {
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                sta.cityList[i].node.css( {
                    'top': sta.mapPositionTop + sta.cityList[i].coordinateY * sta.mapRatio * sta.mapCustomRatio - 30 + 'px',
                    'left': sta.mapPositionLeft + sta.cityList[i].coordinateX * sta.mapRatio * sta.mapCustomRatio - 10 + 'px',
                    'display': 'block'
                } );
            }
        } else if ( sta.pointDrawType.type == "province" ) {
            var province = sta.provinceList[sta.pointDrawType.info][0];
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                var j = sta.cityList[i];
                if ( j.province == province ) {
                    sta.cityList[i].node.css( {
                        'top': sta.mapPositionTop + j.coordinateY * sta.mapRatio * sta.mapCustomRatio - 30 + 'px',
                        'left': sta.mapPositionLeft + j.coordinateX * sta.mapRatio * sta.mapCustomRatio - 10 + 'px',
                        'display': 'block'
                    } );

                } else {
                    sta.cityList[i].node.css( {
                        'display': 'none'
                    } );

                }
            }
        } else if ( sta.pointDrawType.type == "person" ) {
            var personCity = sta.personData[sta.pointDrawType.info].city;
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                var j = sta.cityList[i];
                if ( j.fullName == personCity ) {
                    sta.cityList[i].node.css( {
                        'top': sta.mapPositionTop + j.coordinateY * sta.mapRatio * sta.mapCustomRatio - 30 + 'px',
                        'left': sta.mapPositionLeft + j.coordinateX * sta.mapRatio * sta.mapCustomRatio - 10 + 'px',
                        'display': 'block'
                    } );
                } else {
                    sta.cityList[i].node.css( {
                        'display': 'none'
                    } );

                }
            }
        }
    }
    function point_initialize( mobile_enable ) {
        $_points.empty();
        if ( mobile_enable ) {
            //Mobile
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                var city = sta.cityList[i];
                var node = '<div class="maps-tag maps-tag-' + city.tipPos + '"><div class="maps-infoBox">';
                node += city.fullName + '</div></div>';
                node = $( node );
                city.node = node;
                $_points.append( city.node );
                city.node.tap(( function ( i ) { return ( function ( e ) { cityList_show( i ); e.preventDefault(); return false; } ); } )( i ) );
                city.node.css( {
                    'top': sta.mapPositionTop + city.coordinateY * sta.mapRatio * sta.mapCustomRatio - 30 + 'px',
                    'left': sta.mapPositionLeft + city.coordinateX * sta.mapRatio * sta.mapCustomRatio - 10 + 'px',
                    'display': 'block'
                } );
            }
        } else {
            //Desktop
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                var city = sta.cityList[i];
                var node = '<div class="maps-tag maps-tag-' + city.tipPos + '"><div class="maps-infoBox">';
                node += city.fullName + '</div></div>';
                node = $( node );
                city.node = node;
                $_points.append( city.node );
                city.node.click(( function ( i ) { return ( function ( e ) { cityList_show( i ); e.preventDefault(); return false; } ); } )( i ) );
                city.node.css( {
                    'top': sta.mapPositionTop + city.coordinateY * sta.mapRatio * sta.mapCustomRatio - 30 + 'px',
                    'left': sta.mapPositionLeft + city.coordinateX * sta.mapRatio * sta.mapCustomRatio - 10 + 'px',
                    'display': 'block'
                } );
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
        $( 'div#maps-showAll' ).fadeIn( 300 );
    }
    function person_fitle() {
        if ( sta.personFitleType.type == 'all' ) {
            for ( var i = 0; i < sta.personData.length; i++ ) {
                sta.personData[i].node.removeClass( 'ctrl-nameitem-off' );
            }
        } else if ( sta.personFitleType.type == 'province' ) {
            for ( var i = 0; i < sta.personData.length; i++ ) {
                if ( sta.personData[i].province == sta.provinceList[sta.personFitleType.info][0] ) {
                    sta.personData[i].node.removeClass( 'ctrl-nameitem-off' );
                } else {
                    sta.personData[i].node.addClass( 'ctrl-nameitem-off' );
                }
            }

        } else if ( sta.personFitleType.type == 'school' ) {
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
            //case 3:
            //    $( 'span#info-link-1' ).removeClass( 'info-link-on' );
            //    $( 'span#info-link-2' ).removeClass( 'info-link-on' );
            //    $( 'span#info-link-3' ).addClass( 'info-link-on' );
            //    $( 'div#info-page' ).css( 'left', '-200%' );
            //    break;
            case 2:
                $( 'span#info-link-1' ).removeClass( 'info-link-on' );
                $( 'span#info-link-2' ).addClass( 'info-link-on' );
                //$( 'span#info-link-3' ).removeClass( 'info-link-on' );
                $( 'div#info-page' ).css( 'left', '-100%' );
                break;
            case 1: default:
                $( 'span#info-link-1' ).addClass( 'info-link-on' );
                $( 'span#info-link-2' ).removeClass( 'info-link-on' );
                //$( 'span#info-link-3' ).removeClass( 'info-link-on' );
                $( 'div#info-page' ).css( 'left', '0' );
                sta.infoTab = 1;
        }
    }
    function infoBox_fill( id ) {
        var j = sta.personData[id];
        //Fill Name
        $( '#info-name' ).text( j.name );
        var allNull = true;
        //Fill Contact Method
        if ( j.qq ) { allNull = false; $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); $( '#info-qq' ).text( j.qq ); } else { $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); }
        if ( j.email ) { allNull = false; $( '#info-mail-box' ).removeClass( 'info-cont-item-off' ); $( '#info-mail' ).text( j.email ); } else { $( '#info-mail-box' ).addClass( 'info-cont-item-off' ); }
        if ( j.phone ) { allNull = false; $( '#info-phone-box' ).removeClass( 'info-cont-item-off' ); $( '#info-phone' ).text( j.phone ); } else { $( '#info-phone-box' ).addClass( 'info-cont-item-off' ); }
        if ( j.phone2 ) { allNull = false; $( '#info-phone2-box' ).removeClass( 'info-cont-item-off' ); $( '#info-phone2' ).text( j.phone2 ); } else { $( '#info-phone2-box' ).addClass( 'info-cont-item-off' ); }
        if ( j.address ) { allNull = false; $( '#info-address-box' ).removeClass( 'info-cont-item-off' ); $( '#info-address' ).text( j.address ); } else { $( '#info-address-box' ).addClass( 'info-cont-item-off' ); }
        if ( j.wechat ) { allNull = false; $( '#info-wechat-box' ).removeClass( 'info-cont-item-off' ); $( '#info-wechat' ).text( j.wechat ); } else { $( '#info-wechat-box' ).addClass( 'info-cont-item-off' ); }
        //if ( j.qq ) { $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); $( '#info-qq' ).text( j.qq ); } else { $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); }

        if ( allNull === true ) {
            $( 'div#info-cont-nullTip' ).css( 'display', 'block' );
        } else {
            $( 'div#info-cont-nullTip' ).css( 'display', 'none' );
        }

        if ( j.detailPage ) {
            $( '#info-page-tip' ).css( 'display', 'none' );
            $( '#info-page-ext' ).css( 'display', 'block' ).attr( 'src', 'person/page/' + j.detailPage + '.html' );
            if ( j.backgroundPhoto && j.backgroundPhoto != 0 ) {
                $( '#info-banner' ).attr( 'src', 'person/img/' + j.backgroundPhoto + '.jpg' );
            } else {
                $( '#info-banner' ).attr( 'src', 'img/banner-default-' + ( Math.floor( Math.random() * 6 + 1 ) ).toFixed( 0 ) + '.jpg' );
            }
        } else {
            $( '#info-page-tip' ).css( 'display', 'block' );
            $( '#info-page-ext' ).css( 'display', 'none' );
            $( '#info-banner' ).attr( 'src', 'img/banner-default-' + ( Math.random() * 6 + 0.5 ).toFixed( 0 ) + '.jpg' );
        }
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
    function cityList_hide() {
        $( "div#maps-pop-box-wrapper" ).fadeOut( 300 );
    }
    function cityList_show( id ) {
        var city = sta.cityList[id];
        $( 'div#maps-pop-title' ).text( city.fullName );
        $( 'div#maps-pop-box' ).css( 'background-image', 'url("img/city/' + city.name + '.jpg")' );
        var listBox = $( 'div.maps-pop-personlist' );
        listBox.empty();
        for ( var i = 0; i < sta.personData.length; i++ ) {
            if ( sta.personData[i].city == city.fullName ) {
                var listItem = '<span>' + sta.personData[i].name + '</span>';
                listItem = $( listItem ).click(( function ( id ) { return function () { personPage_show( id, 1 ) } } )( i ) )
                listItem.appendTo( listBox );
            }
        }
        $( "div#maps-pop-box-wrapper" ).fadeIn( 300 );
    }
    window.__jq_person_call = function ( func, id ) {
        switch ( func ) {
            case 'MAP':
                sta.pointDrawType.type = 'person';
                sta.pointDrawType.info = id;
                for ( var i = 0; i < sta.cityList.length; i++ ) {
                    var j = sta.cityList[i];
                    if ( j.fullName == sta.personData[id].city ) {
                        if ( sta.mapRatio * sta.mapCustomRatio < 6 ) {
                            sta.mapCustomRatio = 6 / sta.mapRatio;
                            mapsCtrl_set();
                        }
                        sta.mapCenter = [j.coordinateX, j.coordinateY];
                    }
                }
                if ( $_window.width() < 700 ) {
                    $_ctrl_toggle.removeClass( 'ctrl-open-on' );
                    $_ctrl.removeClass( 'ctrl-box-on' );
                    for ( var i = 0; i < sta.personData.length; i++ ) {
                        sta.personData[i].node.addClass( 'ctrl-nameitem-off' );
                    }
                    sta['ctrl'] = false;
                }
                maps_draw();
                point_draw();
                $( 'div#maps-showAll' ).fadeIn( 300 );
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
        for ( var i = 0, j; i < sta.personData.length; i++ ) {
            j = '<div class="ctrl-nameitem">',
               k = sta.personData[i];
            j += '<div class="name-photo'
                + ( k.photo ? '"><img src="img/photo/' + k.photo + '.jpg"></div>' : '-default"></div>' );
            j += '<div class="name-name">' + k.name + '</div>';
            j += '<div class="name-school">' + ( k.school ? k.school : '' ) + '</div>';
            j += '<div class="name-major">' + ( k.major ? k.major : '' ) + '</div>';
            j += '<div class="name-linkbox"><span class="name-button" onclick="__jq_person_call(\'MAP\','
                + i + ')">地图定位</span>';
            j += '<span class="name-button" onclick="__jq_person_call(\'DET\',' + i + ')">详细信息</span>';
            j += '<span class="name-button" onclick="__jq_person_call(\'COT\',' + i + ')">联系方式</span></div></div>';
            j = $( j );
            k.node = j;
            j.appendTo( $_ctrl_nameList );
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
    function mobile_test() {
        var uaStr = navigator.userAgent.toLowerCase();

        if ( uaStr.indexOf( 'mobile' ) != -1 ) {
            return true;
        }
        // Check for webkit-based browsers. This will catch modern iPhone, iPod, and Android.
        if ( ( uaStr.indexOf( "iphone" ) != -1 ||
            uaStr.indexOf( "ipod" ) != -1 ||
            uaStr.indexOf( "android" ) != -1 ) && uaStr.indexOf( 'applewebkit' ) != -1 ) {
            return true;
        }

        // Check for BlackBerry.
        if ( uaStr.indexOf( "blackberry" ) != -1 ) {
            // BlackBerry 6 or later should be running WebKit
            var verStr = /version\/(\d+)/.exec( uaStr );
            if ( verStr != null ) {
                var bbVer = parseInt( verStr[1] );
                if ( bbVer >= 6 && uaStr.indexOf( 'applewebkit' ) != -1 )
                    return true;
            }
            return false;
        }
        // Check for Windows Phone 7 and IE version at least 9.
        if ( uaStr.indexOf( 'windows phone os' ) != -1 || uaStr.indexOf( 'iemobile' ) != -1 ) {
            var ieStr = /iemobile\/(\d+)/.exec( uaStr );
            if ( ieStr != null ) {
                var ieVer = parseInt( ieStr[1] );
                if ( ieVer >= 9 ) {
                    return true;
                }
            }
            return false;
        }
        // Check for Opera mobile.
        if ( uaStr.indexOf( 'opera mobi' ) != -1 ) {

            // Check the presto version to see if supports HTML5.
            var presto = /presto\/(\d+\.\d+)/.exec( uaStr );
            if ( presto != null ) {
                var prestoVer = parseFloat( presto[1] );
                if ( prestoVer >= 2.4 ) // 2.4 has a good HTML5 base, indicates Opera 10
                    return true;
            }
            return false;
        }

        // Check for Firefox mobile.
        if ( uaStr.indexOf( "fennec" ) != -1 ) {
            var fennec = /fennec\/(\d+\.\d+)/.exec( uaStr );
            if ( fennec != null ) {
                var fennecVer = parseFloat( fennec[1] );
                if ( fennecVer >= 1.0 )
                    return true;
            }
        }


        // If we make it here, we haven't found a rich-tier mobile browser.
        return false;
    }

    //Add Events Processor
    var mobileTestResult = mobile_test();
    //mobileTestResult = false;

    $_window.resize( redraw );

    $_ctrl_toggle.bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        if ( sta['ctrl'] ) {
            $_ctrl_toggle.removeClass( 'ctrl-open-on' );
            $_ctrl.removeClass( 'ctrl-box-on' );
            for ( var i = 0; i < sta.personData.length; i++ ) {
                sta.personData[i].node.addClass( 'ctrl-nameitem-off' );
            }
            sta['ctrl'] = false;
        } else {
            $_ctrl_toggle.addClass( 'ctrl-open-on' );
            $_ctrl.addClass( 'ctrl-box-on' );
            person_fitle();
            sta['ctrl'] = true;
        }
        return false;
    } );

    $( 'span#ctrl-nation-button' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
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
        $( 'div#maps-showAll' ).fadeOut( 300 );
        return false;
    } );

    $_ctrl_province_btn.bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        if ( sta.school ) {
            $_ctrl_school.removeClass( 'ctrl-list-school-box-on' );
            sta.school = false;
        }
        if ( sta.province ) {
            return;
        }
        $_ctrl_province.addClass( 'ctrl-list-province-box-on' );
        sta.province = true;
        return false;
    } );

    $( 'div#info-close' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        if ( sta.infoBox ) {
            $_info_box.removeClass( 'info-box-on' );
            sta.infoBox = false;
        }
        return false;
    } );

    $( 'span#info-link-1' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {

        sta.infoTab = 1; infoTab_change();
        return false;
    } );

    $( 'span#info-link-2' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        sta.infoTab = 2; infoTab_change();
        return false;
    } );

    $( 'div#about-close' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        sta.aboutBox = false;
        $( 'div#about-box' ).removeClass( 'about-box-on' );
        return false;
    } );

    $( 'div#ctrl-about' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        sta.aboutBox = true;
        $( 'div#about-box' ).addClass( 'about-box-on' );
        return false;
    } );

    $( 'div#maps-pop-close' ).bind(( mobileTestResult ? 'tap' : 'click' ), cityList_hide );

    $( 'div#maps-ctrl-in' ).bind(( mobileTestResult ? 'tap' : 'click' ), map_zoomIn );

    $( 'div#maps-ctrl-out' ).bind(( mobileTestResult ? 'tap' : 'click' ), map_zoomOut );

    $( 'div#maps-showAll' ).fadeOut( 50 );

    $( 'div#maps-showAll' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {

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
        $( 'div#maps-showAll' ).fadeOut( 300 );
        return false;
    } );

    if ( mobileTestResult ) {
        $( 'div#maps-points' ).touchstart( function ( e ) {
            e.preventDefault();
            sta.touchCount = e.originalEvent.touches.length;
            if ( sta.touchCount == 1 ) {
                sta.mapDrag = true;
                sta.mapPinch = false;
                sta.mapDragPos = [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
            } else if ( sta.touchCount == 2 ) {
                sta.mapDrag = false;
                sta.mapPinch = true;
                sta.mapPinchDist = ( e.originalEvent.touches[0].pageX - e.originalEvent.touches[1].pageX )
                    * ( e.originalEvent.touches[0].pageX - e.originalEvent.touches[1].pageX )
                    + ( e.originalEvent.touches[0].pageY - e.originalEvent.touches[1].pageY )
                    * ( e.originalEvent.touches[0].pageY - e.originalEvent.touches[1].pageY );
            }
        } ).touchmove( function ( e ) {
            e.preventDefault();
            if ( sta.touchCount == 1 && sta.mapDrag == true ) {
                if ( Math.abs( -sta.mapDragPos[0] + e.originalEvent.touches[0].pageX ) < 15
                    && Math.abs( -sta.mapDragPos[1] + e.originalEvent.touches[0].pageY ) < 15 ) {
                    return false;
                }
                var deltaX = e.originalEvent.touches[0].pageX - sta.mapDragPos[0],
                    deltaY = e.originalEvent.touches[0].pageY - sta.mapDragPos[1];
                sta.mapPositionLeft = sta.mapPositionLeft + deltaX;
                sta.mapPositionTop = sta.mapPositionTop + deltaY;
                sta.mapCenter[0] -= deltaX / ( sta.mapRatio * sta.mapCustomRatio );
                sta.mapCenter[1] -= deltaY / ( sta.mapRatio * sta.mapCustomRatio );
                $_maps.css( {
                    'top': sta.mapPositionTop + 'px',
                    'left': sta.mapPositionLeft + 'px',
                } );
                sta.mapDragPos[0] = e.originalEvent.touches[0].pageX;
                sta.mapDragPos[1] = e.originalEvent.touches[0].pageY;
                point_draw();
            } else if ( sta.touchCount == 2 ) {
                var newDist = ( e.originalEvent.touches[0].pageX - e.originalEvent.touches[1].pageX )
                    * ( e.originalEvent.touches[0].pageX - e.originalEvent.touches[1].pageX )
                    + ( e.originalEvent.touches[0].pageY - e.originalEvent.touches[1].pageY )
                    * ( e.originalEvent.touches[0].pageY - e.originalEvent.touches[1].pageY );
                if ( Math.abs( newDist - sta.mapPinch ) > 100 ) {
                    if ( newDist > sta.mapPinchDist ) {
                        map_zoomIn( Math.sqrt( newDist / sta.mapPinchDist ) );
                    } else if ( newDist < sta.mapPinchDist ) {
                        map_zoomOut( Math.sqrt( newDist / sta.mapPinchDist ) );
                    }
                    sta.mapPinchDist = newDist;
                } else {
                    return false;
                }
            }
            return false;
        } ).touchend( function () {
            e.preventDefault();
            sta.mapDrag = false;
            sta.mapPinch = false;
        } );
        point_initialize( true );

        $( 'div#maps-ctrl-pos' ).click( function ( e ) {
            var zoomLevel = e.offsetX;
            if ( zoomLevel < 4 ) {
                zoomLevel = 4;
            }
            if ( zoomLevel > 196 ) {
                zoomLevel = 196;
            }
            zoomLevel = ( zoomLevel - 4 ) / ( 196 - 4 );
            sta.mapCustomRatio = ( 8 / sta.mapRatio - 1 ) * zoomLevel + 1;
            maps_draw();
            point_draw();
            return false;
        } );
    } else {
        //Desktop Drag and Move Event Handlers
        $( 'div#maps-points' ).mousedown( function ( e ) {
            sta.mapDrag = true;
            sta.mapDragPos = [e.pageX, e.pageY];
            return false;
        } ).mousemove( function ( e ) {
            if ( sta.mapDrag === false ) {
                return false;
            }
            var deltaX = e.pageX - sta.mapDragPos[0],
                deltaY = e.pageY - sta.mapDragPos[1];
            sta.mapPositionLeft = sta.mapPositionLeft + deltaX;
            sta.mapPositionTop = sta.mapPositionTop + deltaY;
            sta.mapCenter[0] -= deltaX / ( sta.mapRatio * sta.mapCustomRatio );
            sta.mapCenter[1] -= deltaY / ( sta.mapRatio * sta.mapCustomRatio );
            $_maps.css( {
                'top': sta.mapPositionTop + 'px',
                'left': sta.mapPositionLeft + 'px',
            } );
            sta.mapDragPos[0] = e.pageX;
            sta.mapDragPos[1] = e.pageY;
            point_draw();
            return false;
        } ).mouseup( function () {
            sta.mapDrag = false;
            return false;
        } );

        //Desktop Map Controllor Click Event Handler
        $( 'div#maps-ctrl-pos' ).mousedown( function ( e ) {
            var zoomLevel = e.offsetX;
            if ( zoomLevel < 4 ) {
                zoomLevel = 4;
            }
            if ( zoomLevel > 196 ) {
                zoomLevel = 196;
            }
            zoomLevel = ( zoomLevel - 4 ) / ( 196 - 4 );
            sta.mapCustomRatio = ( 8 / sta.mapRatio - 1 ) * zoomLevel + 1;
            maps_draw();
            point_draw();

            return false;
        } );

        //City Points Initialization
        point_initialize( false );

        //Mouse Wheel Controled Zoom Function
        $( 'div#maps-points' ).mousewheel( function ( e, d ) {
            if ( d > 0 ) {
                map_zoomIn();
            } else if ( d < 0 ) {
                map_zoomOut();
            }
        } );//Mobile Test
    }
    //Initialize Map
    redraw(); control_fill(); cityList_hide();
} );


//----- JSONP -----
( function () {
    //JSONP : ID = 4
    var id = 4;
    mapOfSixteen.loader.update( id );
} )()


