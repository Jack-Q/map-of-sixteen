
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
        'infoTab': 1,// 1 - Contact Method; 2 - Detailed Information; 3 - Personal Page(Temporary Deprecated)
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
        'mapDrag': false,
        'mapDragPos': [0, 0],
        'personData': [
            //About This Data: Copied From Excel, Last Updated:August 5th, 2014
{ id: 1, name: "张彩云", province: "guangdong", city: "珠海", school: "暨南大学", phone: "13403428612", qq: "2084498307", },
{ id: 2, name: "韩蕾", province: "henan", city: "郑州", school: "郑州大学", qq: "1279456545", },
{ id: 3, name: "范江", province: "jiangsu", city: "镇江", school: "江苏大学", phone: "15203423712", qq: "948302112", },
{ id: 4, name: "朱诗雅", province: "jiangsu", city: "镇江", school: "江苏大学", },
{ id: 5, name: "龚琪", province: "hunan", city: "长沙", school: "中南大学", phone: "13293526449", qq: "1183498100", },
{ id: 6, name: "任福全", province: "hunan", city: "长沙", school: "国防科技大学", phone: "18535285226", qq: "908347726", },
{ id: 7, name: "王圣元", province: "jilin", city: "长春", school: "长春理工大学", phone: "18235227290", qq: "294335470", },
{ id: 8, name: "李海", province: "jilin", city: "长春", school: "吉林大学", phone: "18234250560", qq: "1019928979", },
{ id: 9, name: "许圣华", province: "jilin", city: "长春", school: "吉林大学", qq: "1786404107", },
{ id: 10, name: "刘伟", province: "jiangsu", city: "徐州", school: "中国矿业大学", phone: "13935256023", qq: "704533758", },
{ id: 11, name: "崔越", province: "jiangsu", city: "徐州", school: "中国矿业大学", phone: "13383529796", qq: "1051879865", },
{ id: 12, name: "武雁伟", province: "jiangsu", city: "徐州", school: "中国矿业大学", },
{ id: 63, name: "晋雪琪", province: "shaanxi", city: "杨凌", school: "西北农林科技大学", },
{ id: 13, name: "乔波", province: "shaanxi", city: "西安", school: "西安交通大学", email: "QiaoBo@outlook.com", qq: "1335288659", },
{ id: 14, name: "温靖轩", province: "shaanxi", city: "西安", school: "西安电子科技", phone: "13623528001", qq: "853310132", },
{ id: 15, name: "田思琦", province: "hubei", city: "武汉", school: "中南财经政法大学", phone: "13663421203", qq: "907683817", },
{ id: 16, name: "李佳音", province: "hubei", city: "武汉", school: "中国地质大学(武汉)", qq: "392248358", },
{ id: 17, name: "高伟", province: "hubei", city: "武汉", school: "武汉工程大学", phone: "18735080770", qq: "936992306", },
{ id: 18, name: "李玲玲", province: "jiangsu", city: "无锡", school: "江南大学", qq: "815117902", },
{ id: 19, name: "张文娜", province: "shandong", city: "威海", school: "哈尔滨工业大学(威海)", phone: "18335252440", qq: "2470737208", },
{ id: 20, name: "程鑫", province: "shandong", city: "威海", school: "哈尔滨工业大学(威海)", qq: "1209315715", },
{ id: 59, name: "闫艺澎", province: "shandong", city: "威海", school: "哈尔滨工业大学(威海)", },
{ id: 21, name: "杨亚琼", province: "tianjin", city: "天津", school: "天津商业大学", qq: "13753229437", },
{ id: 22, name: "吴璇", province: "tianjin", city: "天津", school: "天津大学", qq: "382695854", },
{ id: 23, name: "王鹤媛", province: "tianjin", city: "天津", school: "南开大学", phone: "15296625164", qq: "2952203838", },
{ id: 24, name: "王佳颉", province: "tianjin", city: "天津", school: "南开大学", qq: "954628981", },
{ id: 50, name: "李觊尧", province: "tianjin", city: "天津", school: "天津工业大学", phone: "18335203218", qq: "1160107461", },
{ id: 25, name: "张益民", province: "shanxi", city: "太原", school: "太原理工大学", phone: "13403643158", qq: "964580448", },
{ id: 26, name: "王亚楠", province: "taiyuan", city: "太原", school: "太原理工大学", qq: "2464136912", },
{ id: 27, name: "李鹏", province: "shanxi", city: "太原", school: "山西大学", phone: "13546004515", qq: "1638510549", },
{ id: 28, name: "冯忠祥", province: "shanxi", city: "太原", school: "山西财经大学", phone: "15110719296", qq: "791134035", },
{ id: 44, name: "张玮", province: "shanxi", city: "太原", school: "太原理工大学", },
{ id: 48, name: "张建功", province: "shanxi", city: "太原", school: "太原理工大学", qq: "594981379", },
{ id: 62, name: "郭瑞林", province: "shanxi", city: "太原", school: "太原理工大学", },
{ id: 29, name: "王玉香", province: "shanghai", city: "上海", school: "上海大学", phone: "18835256569", qq: "362862041", },
{ id: 30, name: "张蕾", province: "shanghai", city: "上海", school: "华东理工大学", phone: "18735084168", qq: "569755502", },
{ id: 49, name: "杨泽鹏", province: "shanghai", city: "上海", school: "上海工程技术大学", phone: "13103425356", },
{ id: 31, name: "赵晶", province: "jiangsu", city: "南京", school: "南京农业大学", phone: "18168057521", qq: "544415419", },
{ id: 32, name: "李伯轩", province: "jiangsu", city: "南京", school: "南京大学", qq: "2425631404", },
{ id: 33, name: "张众", province: "shandong", city: "济南", school: "山东大学", phone: "15536211954", qq: "1143982814", },
{ id: 46, name: "任凯", province: "jilin", city: "吉林", school: "吉林化工大学", qq: "532465106", },
{ id: 34, name: "董宁", province: "zhejiang", city: "杭州", school: "浙江理工大学", phone: "13994338807", qq: "380245935", },
{ id: 52, name: "石文龙", province: "heilongjiang", city: "哈尔滨", school: "东北林业大学", qq: "2285874983", },
{ id: 35, name: "赵明", province: "guangdong", city: "广州", school: "广东工业大学", phone: "13613525998", qq: "927257754", },
{ id: 36, name: "马晓瑞", province: "liaoning", city: "大连", school: "大连大学", qq: "254360957", },
{ id: 37, name: "胡鹏冲", province: "sichuan", city: "成都", school: "四川大学", phone: "18734625786", qq: "269049631", },
{ id: 38, name: "乔亚男", province: "sichuan", city: "成都", school: "四川大学", phone: "13834129072", qq: "1196521782", },
{ id: 39, name: "闫艺湃", province: "sichuan", city: "成都", school: "四川大学", qq: "512346740", },
{ id: 40, name: "赵剑喆", province: "sichuan", city: "成都", school: "电子科技大学", qq: "458113051", },
{ id: 60, name: "刘奇", province: "sichuan", city: "成都", school: "成都信息工程学院", },
{ id: 41, name: "高靖男", province: "beijing", city: "北京", school: "首都经贸大学", phone: "13994305596", qq: "549431978", },
{ id: 42, name: "张亦之", province: "beijing", city: "北京", school: "北京邮电大学(宏福校区)", qq: "739383613", },
{ id: 43, name: "谭涛", province: "macau", city: "澳门", school: "澳门大学", phone: "13753229437", qq: "806503357", },
        ],
        'cityList': [
            //About This Data: Copied From Excel, Last Updated:August 5th, 2014
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
    function map_zoomIn() {
        if ( !sta.mapCtrl.zoomIn ) { return false; }
        var realRatio = sta.mapRatio * sta.mapCustomRatio;
        if ( ( 8 - realRatio ) / sta.mapRatio >= 0.5 ) {
            sta.mapCustomRatio += 0.5;
        } else {
            sta.mapCustomRatio = 8 / sta.mapRatio;
        }
        maps_draw();
        point_draw();
        return false;
    }
    function map_zoomOut() {
        if ( !sta.mapCtrl.zoomOut ) { return false; }
        if ( sta.mapCustomRatio > 1.5 ) {
            sta.mapCustomRatio -= 0.5;
        } else {
            sta.mapCustomRatio = 1;
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
        $_points.empty();

        function __point_draw( x, y, index ) {
            var j = '<div class="maps-tag maps-tag-' + sta.cityList[index].tipPos + '" data-id="' + index + '"><div class="maps-infoBox">';
            j += sta.cityList[index].fullName + '<br />' + '</div></div>';
            j = $( j ).css( {
                'top': sta.mapPositionTop + y * sta.mapRatio * sta.mapCustomRatio - 30 + 'px',
                'left': sta.mapPositionLeft + x * sta.mapRatio * sta.mapCustomRatio - 10 + 'px'
            } );
            $_points.append( j );
            j.click(( function ( i ) { return ( function ( e ) { cityList_show( i ); e.preventDefault(); } ); } )( index ) );
            j.tap(( function ( i ) { return ( function ( e ) { cityList_show( i ); e.preventDefault(); } ); } )( index ) );
        }

        if ( sta.pointDrawType.type == "all" ) {
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                var j = sta.cityList[i];
                if ( j.coordinateX && j.coordinateY ) {
                    __point_draw( j.coordinateX, j.coordinateY, i );
                }
            }
        } else if ( sta.pointDrawType.type == "province" ) {
            for ( var i = 0; i < sta.cityList.length; i++ ) {
                var j = sta.cityList[i];
                if ( j.province == sta.provinceList[sta.pointDrawType.info][0] ) {
                    if ( j.coordinateX && j.coordinateY ) {
                        __point_draw( j.coordinateX, j.coordinateY, i );
                    }
                }
            }
        } else if ( sta.pointDrawType.type == "person" ) {
            var i = sta.pointDrawType.info;
            var j = sta.personData[i].city;
            for ( var k = 0; k < sta.cityList.length; k++ ) {
                if ( sta.cityList[k].fullName == j ) {
                    __point_draw( sta.cityList[k].coordinateX, sta.cityList[k].coordinateY, k );
                }
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
        if ( j.wechat ) { allNull = false; $( '#info-wechat-box' ).removeClass( 'info-cont-item-off' ); $( '#info-wechat' ).text( j.address ); } else { $( '#info-wechat-box' ).addClass( 'info-cont-item-off' ); }
        //if ( j.qq ) { $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); $( '#info-qq' ).text( j.qq ); } else { $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); }

        if ( allNull === true ) {
            $( 'div#info-cont-nullTip' ).css( 'display', 'block' );
        } else {
            $( 'div#info-cont-nullTip' ).css( 'display', 'none' );
        }

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
        for ( var i = 0, j; i < sta.personData.length; i++ ) {
            j = '<div class="ctrl-nameitem">',
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
    //Initialize Map
    redraw(); control_fill(); cityList_hide();

    //Add Events Processor
    $_window.resize( redraw );
    $_ctrl_toggle.click( function () {
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

    //$( 'span#info-link-3' ).click( function () {
    //    sta.infoTab = 3; infoTab_change();
    //} );

    $( 'div#about-close' ).click( function () {
        sta.aboutBox = false;
        $( 'div#about-box' ).removeClass( 'about-box-on' );
    } );

    $( 'div#ctrl-about' ).click( function () {
        sta.aboutBox = true;
        $( 'div#about-box' ).addClass( 'about-box-on' );
    } );
    $( 'div#maps-pop-close' ).click( cityList_hide );

    //Mobile 
    if ( navigator.userAgent.toLowerCase().indexOf( 'mobile' ) < 0 ) {
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

    } else {
        //For Mobile Events
        $( 'div#maps-points' ).touchstart( function ( e ) {
            sta.mapDrag = true;
            sta.mapDragPos = [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
        } ).touchmove( function ( e ) {
            //e.preventDefault();
            if ( sta.mapDrag === false ) {
                return false;
            }
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
            return false;
        } ).touchend( function () {
            sta.mapDrag = false;
        } );

    }

    $( 'div#maps-ctrl-in' ).click( map_zoomIn );
    $( 'div#maps-ctrl-out' ).click( map_zoomOut );
    // $( 'div#maps-points' ).bind( 'pinchopen', map_zoomIn ).bind( 'pinchclose', map_zoomOut );
    $( 'div#maps-points' ).mousewheel( function ( e, d ) {
        if ( d > 0 ) {
            map_zoomIn();
        } else if ( d < 0 ) {

            map_zoomOut();
        }
    } );
} );


//----- JSONP -----
( function () {
    //JSONP : ID = 4
    var id = 4;
    setTimeout( function () {
        mapOfSixteen.loader.update( id )
    }, ( 100 * Math.random() ).toFixed( 0 ) );
} )()


