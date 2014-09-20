
/// <reference path="lib/jquery-2.1.1.js" />
/// <reference path="lib/jquery.mobile.custom.js" />
/// <reference path="lib/jgestures.js" />
/// <reference path="lib/raphael.js" />
/// <reference path="lib/jquery.color-2.1.2.js" />
/// <reference path="map.js" />
/// <reference path="res/chinaMapConfig.js" />
/// <reference path="data.js" />

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
        'search': false,
        'infoBox': false,
        'aboutBox': false,
        'infoTab': 1,// 1 - Contact Method; 2 - Detailed Information; 3 - Personal Page(Permanently Deprecated)
        'mapRatio': 0,//Set to zero to make it smaller than any real ratio so that make 
        //the initial presentation of the map suit to the screen(window) size.
        'mapCustomRatio': 1.0,//Customized Zoom Ratio 
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
        'personData': mapOfSixteen.data,
        'cityList': [
            //About This Data: Copied From Excel, Last Updated:August 15th, 2014
{ name: 'hangzhou', fullName: '杭州', namePY: 'hang zhou', picture: 1, coordinateX: 475, coordinateY: 301, tipPos: 'bottom', province: 'zhejiang' },
{ name: 'tianjin', fullName: '天津', namePY: 'tian jin', picture: 2, coordinateX: 425, coordinateY: 194, tipPos: 'right', province: 'tianjin' },
{ name: 'chengdu', fullName: '成都', namePY: 'cheng du', picture: 3, coordinateX: 307, coordinateY: 305, tipPos: 'bottom', province: 'sichuan' },
{ name: 'taiyuan', fullName: '太原', namePY: 'tai yuan', picture: 4, coordinateX: 380, coordinateY: 217, tipPos: 'top', province: 'shanxi' },
{ name: 'shanghai', fullName: '上海', namePY: 'shang hai', picture: 5, coordinateX: 486, coordinateY: 287, tipPos: 'right', province: 'shanghai' },
{ name: 'weihai', fullName: '威海', namePY: 'wei hai', picture: 6, coordinateX: 477, coordinateY: 208, tipPos: 'right', province: 'shandong' },
{ name: 'jinan', fullName: '济南', namePY: 'ji nan', picture: 7, coordinateX: 430, coordinateY: 221, tipPos: 'top', province: 'shandong' },
{ name: 'xian', fullName: '西安', namePY: 'xi an ', picture: 8, coordinateX: 351, coordinateY: 263, tipPos: 'top', province: 'shaanxi' },
{ name: 'yangling', fullName: '杨凌', namePY: 'yang ling', picture: 9, coordinateX: 339, coordinateY: 265, tipPos: 'left', province: 'shaanxi' },
{ name: 'macau', fullName: '澳门', namePY: 'ao men', picture: 10, coordinateX: 413, coordinateY: 417, tipPos: 'bottom', province: 'macau' },
{ name: 'dalian', fullName: '大连', namePY: 'da lian', picture: 11, coordinateX: 470, coordinateY: 183, tipPos: 'top', province: 'liaoning' },
{ name: 'changchun', fullName: '长春', namePY: 'chang chun', picture: 12, coordinateX: 491, coordinateY: 116, tipPos: 'top', province: 'jilin' },
{ name: 'jilin', fullName: '吉林', namePY: 'ji lin', picture: 13, coordinateX: 499, coordinateY: 117, tipPos: 'right', province: 'jilin' },
{ name: 'zhenjiang', fullName: '镇江', namePY: 'zhen jiang', picture: 14, coordinateX: 468, coordinateY: 275, tipPos: 'top', province: 'jiangsu' },
{ name: 'xuzhou', fullName: '徐州', namePY: 'xu zhou', picture: 15, coordinateX: 442, coordinateY: 254, tipPos: 'top', province: 'jiangsu' },
{ name: 'wuxi', fullName: '无锡', namePY: 'wu xi ', picture: 16, coordinateX: 474, coordinateY: 281, tipPos: 'right', province: 'jiangsu' },
{ name: 'nanjing', fullName: '南京', namePY: 'nan jing', picture: 17, coordinateX: 469, coordinateY: 282, tipPos: 'left', province: 'jiangsu' },
{ name: 'changsha', fullName: '长沙', namePY: 'chang sha', picture: 18, coordinateX: 394, coordinateY: 333, tipPos: 'left', province: 'hunan' },
{ name: 'wuhan', fullName: '武汉', namePY: 'wu han', picture: 19, coordinateX: 408, coordinateY: 304, tipPos: 'left', province: 'hubei' },
{ name: 'zhengzhou', fullName: '郑州', namePY: 'zheng zhou', picture: 20, coordinateX: 399, coordinateY: 255, tipPos: 'left', province: 'henan' },
{ name: 'harbin', fullName: '哈尔滨', namePY: 'ha er bin', picture: 21, coordinateX: 493, coordinateY: 92, tipPos: 'top', province: 'heilongjiang' },
{ name: 'zhuhai', fullName: '珠海', namePY: 'zhu hai', picture: 22, coordinateX: 408, coordinateY: 411, tipPos: 'left', province: 'guangdong' },
{ name: 'guangzhou', fullName: '广州', namePY: 'guang zhou', picture: 23, coordinateX: 411, coordinateY: 398, tipPos: 'right', province: 'guangdong' },
{ name: 'beijing', fullName: '北京', namePY: 'bei jing', picture: 24, coordinateX: 414, coordinateY: 182, tipPos: 'top', province: 'beijing' },
{ name: 'fuxin', fullName: '阜新', namePY: 'fu xin', picture: 25, coordinateX: 464, coordinateY: 149, tipPos: 'left', province: 'liaoning' },
{ name: 'hefei', fullName: '合肥', namePY: 'he fei', picture: 26, coordinateX: 436, coordinateY: 284, tipPos: 'left', province: 'anhui' },
{ name: 'fuzhou', fullName: '福州', namePY: 'fu zhou', picture: 27, coordinateX: 472, coordinateY: 355, tipPos: 'top', province: 'fujian' },
{ name: 'wuhu', fullName: '芜湖', namePY: 'wu hu', picture: 28, coordinateX: 447, coordinateY: 290, tipPos: 'right', province: 'anhui' },

        ],
        'provinceList': [
            ['heilongjiang', '黑龙江', 'hei long jiang'],
            ['jilin', '吉林', 'ji lin'],
            ['liaoning', '辽宁', 'liao ning'],
            //['hebei', '河北', 'he bei' ],
            ['shandong', '山东', 'shan dong'],
            ['jiangsu', '江苏', 'jiang su'],
            ['zhejiang', '浙江', 'zhe jiang'],
            ['anhui', '安徽', 'an hui'],
            ['henan', '河南', 'he nan'],
            ['shanxi', '山西', 'shan xi'],
            ['shaanxi', '陕西', 'shan xi'],
            //['gansu', '甘肃', 'gan su' ],
            ['hubei', '湖北', 'hu bei'],
            //['jiangxi', '江西', 'jiang xi' ],
            ['fujian', '福建', 'fu jian'],
            ['hunan', '湖南', 'hu nan'],
            //['guizhou', '贵州', 'gui zhou' ],
            ['sichuan', '四川', 'si chuan'],
            //['yunnan', '云南', 'yun nan' ],
            //['qinghai', '青海', 'qing hai' ],
            //['hainan', '海南', 'hai nan' ],
            ['shanghai', '上海', 'shang hai'],
            //['chongqing', '重庆', 'chong qing' ],
            ['tianjin', '天津', 'tian jin'],
            ['beijing', '北京', 'bei jing'],
            //['ningxia', '宁夏', 'ning xia' ],
            //['neimongol', '内蒙古', 'nei meng gu' ],//NOTICE FOR ITS ENG_NAME
            //['guangxi', '广西', 'guang xi' ],
            //['xinjiang', '新疆', 'xin jaing' ],
            ['guangdong', '广东', 'gaung dong'],
            ['macau', '澳门', 'ao men'],
            //['hongkong', '香港', 'xiang gang' ],
            //['taiwan', '台湾', 'tai wan' ],
            //['xizang, '西藏', 'xi znag' ],
        ],
        'pointDrawType': {
            type: 'all',//all province person 
            info: 0 //all:N/A, province:index of province,person:id of person
        },
        'personFitleType': {
            type: 'all',//all province search
            info: 0,//for school case, the value shuold be the name of school, search:Array of the indexes of result
        },
        'provinceSelected': '',
        'mapExternal': {},
    };
    var $_ctrl = $( "div#ctrl-box" ),
        $_ctrl_search = $( 'div#ctrl-search' ),
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

        if ( mapRealRatio / sta.mapRatio > 1 ) {
            sta.mapCustomRatio = mapRealRatio / sta.mapRatio
        } else {
            sta.mapCustomRatio = 1;
            mapRealRatio = sta.mapRatio;
        }

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
            external: sta.mapExternal,
            //stateData: {
            //    'heilongjiang': { 'stateInitColor': 1 },
            //    'jilin': { 'stateInitColor': 5 },
            //    'liaoning': { 'stateInitColor': 2 },
            //    'shandong': { 'stateInitColor': 4 },
            //    'jiangsu': { 'stateInitColor': 8 },
            //    'zhejiang': { 'stateInitColor': 1 },
            //    'henan': { 'stateInitColor': 1 },
            //    'shanxi': { 'stateInitColor': 11 },
            //    'shaanxi': { 'stateInitColor': 3 },
            //    'hubei': { 'stateInitColor': 3 },
            //    'hunan': { 'stateInitColor': 2 },
            //    'sichuan': { 'stateInitColor': 5 },
            //    'shanghai': { 'stateInitColor': 4 },
            //    'tianjin': { 'stateInitColor': 5 },
            //    'beijing': { 'stateInitColor': 4 },
            //    'guangdong': { 'stateInitColor': 2 },
            //    'macau': { 'stateInitColor': 1 },
            //    'hebei': { 'stateInitColor': 0 },
            //    'anhui': { 'stateInitColor': 0 },
            //    'gansu': { 'stateInitColor': 0 },
            //    'jiangxi': { 'stateInitColor': 0 },
            //    'fujian': { 'stateInitColor': 0 },
            //    'guizhou': { 'stateInitColor': 0 },
            //    'qinghai': { 'stateInitColor': 0 },
            //    'hainan': { 'stateInitColor': 0 },
            //    'chongqing': { 'stateInitColor': 0 },
            //    'ningxia': { 'stateInitColor': 0 },
            //    'neimongol': { 'stateInitColor': 0 },
            //    'guangxi': { 'stateInitColor': 0 },
            //    'xinjiang': { 'stateInitColor': 0 },
            //    'hongkong': { 'stateInitColor': 0 },
            //    'taiwan': { 'stateInitColor': 0 },
            //    'xizang': { 'stateInitColor': 0 },
            //    'yunnan': { 'stateInitColor': 0 },
            //}
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
            ['shanxi', 12],
            ['jiangsu', 8],
            ['tianjin', 6],
            ['jilin', 5],
            ['sichuan', 5],
            ['shanghai', 5],
            ['shandong', 4],
            ['beijing', 4],
            ['liaoning', 3],
            ['shaanxi', 3],
            ['hubei', 3],
            ['heilongjiang', 2],
            ['zhejiang', 2],
            ['hunan', 2],
            ['guangdong', 2],
            ['anhui', 2],
            ['henan', 1],
            ['macau', 1],
            ['fujian', 1],
            ['hebei', 0],
            ['gansu', 0],
            ['jiangxi', 0],
            ['guizhou', 0],
            ['qinghai', 0],
            ['hainan', 0],
            ['chongqing', 0],
            ['ningxia', 0],
            ['neimongol', 0],
            ['guangxi', 0],
            ['xinjiang', 0],
            ['hongkong', 0],
            ['taiwan', 0],
            ['xizang', 0],
            ['yunnan', 0],

        ];
        var colors = [
                "81b2e4",
                "6ca6e0",
                "5b9cdc",
                "4a91d9",
                "3d8ad6",
                "3182d3",
                "2b7aca",
                "2975c2",
                "2770b9",
                "256bb1",
                "2466a8",
                "2261a0",
                "215e9c",
                "205c97",
                "1f5993",
        ];

        for ( var i = 0; i < provinceAll.length; i++ ) {
            sta.mapExternal[provinceAll[i][0]].attr( { fill: '#' + colors[provinceAll[i][1]] } );
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
        } else if ( sta.personFitleType.type == "search" ) {
            var list = sta.personFitleType.info;
            for ( var i = list.length - 1; i >= 0; i-- ) {
                sta.personData[list[i]].node.prependTo( $( sta.personData[list[i]].node.parent() ) );
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
        $( '#info-school' ).text( j.school + ( j.major ? '(' + j.major + ')' : '' ) );
        var allNull = true;
        //Fill Contact Method
        if ( j.qq ) {
             allNull = false; 
             $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); 
             $( '#info-qq' ).text( j.qq ).attr( {
                'href': 'tencent://message/?uin=' + j.qq,
                'title': '向' + j.name + '发起即时聊天'
            } );//Protocal : tencent://message/?uin= 
       } else { 
             $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); 
       }

        //Add "Mail TO Method"
        if ( j.email ) {
            allNull = false;
            $( '#info-mail-box' ).removeClass( 'info-cont-item-off' );
            $( '#info-mail' ).text( j.email ).attr( {
                'href': 'mailto:' + j.email,
                'title': '向' + j.name + '发送邮件'
            } );
        } else {
            $( '#info-mail-box' ).addClass( 'info-cont-item-off' );
        }
        if ( j.phone ) {
            allNull = false; $( '#info-phone-box' ).removeClass( 'info-cont-item-off' );
            $( '#info-phone' ).text( j.phone );
            if ( j.phonePos ) {
                $( '#info-phone-name' ).text( '电话(' + j.phonePos + ')' );
            } else {
                $( '#info-phone-name' ).text( '电话' );
            }
        } else {
            $( '#info-phone-box' ).addClass( 'info-cont-item-off' );
        }
        if ( j.phone2 ) {
            allNull = false;
            $( '#info-phone2-box' ).removeClass( 'info-cont-item-off' );
            $( '#info-phone2' ).text( j.phone2 );
            if ( j.phone2Pos ) {
                $( '#info-phone2-name' ).text( '电话(' + j.phone2Pos + ')' );
            } else {
                $( '#info-phone2-name' ).text( '电话' );
            }
        } else {
            $( '#info-phone2-box' ).addClass( 'info-cont-item-off' );
        }
        if ( j.address ) { allNull = false; $( '#info-address-box' ).removeClass( 'info-cont-item-off' ); $( '#info-address' ).text( j.address ); } else { $( '#info-address-box' ).addClass( 'info-cont-item-off' ); }
        if ( j.wechat ) { allNull = false; $( '#info-wechat-box' ).removeClass( 'info-cont-item-off' ); $( '#info-wechat' ).text( j.wechat ); } else { $( '#info-wechat-box' ).addClass( 'info-cont-item-off' ); }
        //if ( j.qq ) { $( '#info-qq-box' ).removeClass( 'info-cont-item-off' ); $( '#info-qq' ).text( j.qq ); } else { $( '#info-qq-box' ).addClass( 'info-cont-item-off' ); }

        if ( allNull === true ) {
            $( 'div#info-cont-nullTip' ).css( 'display', 'block' );
        } else {
            $( 'div#info-cont-nullTip' ).css( 'display', 'none' );
        }

        //Detail Page iFrame
        if ( j.detailPage ) {
            $( '#info-page-tip' ).css( 'display', 'none' );
            $( '#info-page-ext' ).css( 'display', 'block' ).attr( 'src', 'person/page/' + j.detailPage + '.html' );
        } else {
            $( '#info-page-tip' ).css( 'display', 'block' );
            $( '#info-page-ext' ).css( 'display', 'none' );
        }

        //Detail Page Background Picture
        if ( j.backgroundPhoto && j.backgroundPhoto != 0 ) {
            $( '#info-banner' ).attr( 'src', 'person/img/' + j.backgroundPhoto + '.jpg' );
        } else {
            $( '#info-banner' ).attr( 'src', 'img/background/' + ( Math.random() * 9 + 0.5 ).toFixed( 0 ) + '.jpg' );
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
        $( 'div#maps-pop-box' ).css( 'background-position-x', '-' + ( city.picture - 1 ) * 300 + 'px' );
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
            j += '<div onclick="__jq_person_call(\'COT\',' + i + ')" class="name-photo';
            if ( k.photo ) {
                //if ( k.photo <= 30 ) {
                j += '" style=\'background:url("img/photoGroup.v2.jpg") no-repeat;background-position:-' + ( 75 * k.photo - 75 ) + 'px 0;\'></div>';
                //} else {
                //    j += '"><img src="img/photo/' + k.photo + '.jpg"></div>';
                //}

            } else {
                j += '-default"></div>';
            }
            j += '<div onclick="__jq_person_call(\'COT\',' + i + ')" class="name-name">' + k.name + '</div>';
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
    function search_close() {
        if ( sta.search ) {
            sta.search = false;
            $_ctrl_nameList.css( 'height', '380px' );
            $_ctrl_search.css( {
                'height': '10px',
                'margin-top': '10px'
            } );
            //Change To National List
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
            var fullList = [];
            for ( var i = 0; i < sta.personData.length; i++ ) {
                fullList.push( i );
            }
            sta.personFitleType.type = 'search';
            sta.personFitleType.info = fullList;
            person_fitle();
            sta.personFitleType.type = 'all';
            person_fitle();

            sta.provinceSelected = "";
            province_highlight();
            $( 'div#maps-closeSearch' ).fadeOut( 300 );
            $( '#ctrl-search-text' ).val( "" );
        }
        return false;
    }
    function search_open() {

        sta.search = true;
        $_ctrl_nameList.css( 'height', '300px' );
        $_ctrl_search.css( {
            'height': '70px',
            'margin-top': '30px'
        } );
        //Change To National List


        $_ctrl_school_btn.css( 'display', 'none' ).text( '选择省份' );
        $( 'span#ctrl-gt' ).css( 'display', 'none' );

        $_ctrl_province_btn.text( '选择省份' );
        if ( sta.school ) {
            $_ctrl_school.removeClass( 'ctrl-list-school-box-on' );
            sta.school = false;
        }
        if ( sta.province ) {
            $_ctrl_province.removeClass( 'ctrl-list-province-box-on' );
            sta.province = false;
        }
        sta.provinceSelected = "";
        province_highlight();
        $( 'div#maps-showAll' ).fadeOut( 300 );
        $( 'div#maps-closeSearch' ).fadeIn( 300 );
        sta.pointDrawType.type = 'all';
        point_draw();

        sta.personFitleType.type = 'all';
        person_fitle();
        var fullList = [];
        for ( var i = 0; i < sta.personData.length; i++ ) {
            fullList.push( i );
        }
        sta.personFitleType.type = 'search';
        sta.personFitleType.info = fullList;
        person_fitle();
        $( '#ctrl-search-text' ).val( "" );


        return false;
    }
    function search_search() {
        var t = $( '#ctrl-search-text' ).val().trim().toLowerCase();
        var searchDescription = $( 'div#ctrl-search-description' );
        if ( t == "" ) {
            searchDescription.html( '输入姓名、学校、电话号码等信息以开始。<br />支持拼音搜索，结果排在下方列表最前' );
            return false;
        }
        var testForInclude = function ( stringBig, stringSmall ) {
            for ( var i = 0; i < stringSmall.length; i++ ) {
                if ( stringBig.indexOf( stringSmall[i] ) == -1 ) {
                    return false;
                }
            }
            return true;
        }
        var testForPinYinMatch = function ( PinYin, query ) {
            var py = PinYin.trim().split( ' ' ), str1 = '', str2 = '', str3 = '';
            for ( var i = 0; i < py.length; i++ ) {
                str1 += py[i][0];
                str2 += py[i].match( /^([zcs][h]|[bpmfdtnlgkhjqxzcsrywae])(.*)$/ )[1];
                str3 += py[i].match( /^([zcs][h]|[bpmfdtnlgkhjqxzcsryw]|[ae]n[g]?|a[oi]?|e[ir]?)(.*)$/ )[1];
                if ( py.slice( i, py.length ).join( '' ).slice( 0, query.length ) == query ) {
                    return true;
                }
            }
            if ( str1.indexOf( query ) != -1
                || str2.indexOf( query ) != -1
                || str3.indexOf( query ) != -1 ) {
                return true;
            }
            return false;
        };

        //Search Preparation
        var resultList = [];
        var fullList = [], tempList = [];
        var rt;
        for ( var i = 0; i < sta.personData.length; i++ ) {
            fullList.push( i );
        }
        //Search Process
        if ( t.match( /^[0-9]{1,}$/ ) ) {
            //Number

            //Search the value of phone
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].phone && sta.personData[fullList[i]].phone.toString().slice( 0, t.length ) == t ) {
                    resultList.push( fullList[i] );
                } else {
                    tempList.push( fullList[i] );
                }
            }
            fullList = JSON.parse( JSON.stringify( tempList ) );
            //tempList=[];

            //Search the value of QQ
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].qq && sta.personData[fullList[i]].qq.toString().slice( 0, t.length ) == t ) {
                    resultList.push( fullList[i] );
                }
                //else {
                //tempList.push( fullList[i] );
                //}
            }
            //fullList = JSON.parse( JSON.stringify( tempList ) );


            rt = "搜索数字:" + t + '(' + resultList.length + '个符合项)<br />依次匹配电话、QQ';
        } else if ( t.match( /^[a-z]{1,}$/ ) ) {
            //PinYin
            //Search the value of name
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( testForPinYinMatch( sta.personData[fullList[i]].namePY, t ) ) {
                    resultList.push( fullList[i] );
                } else {
                    tempList.push( fullList[i] );
                }
            }
            fullList = JSON.parse( JSON.stringify( tempList ) );
            tempList = [];
            //Search the value of major
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].majorPY && testForPinYinMatch( sta.personData[fullList[i]].majorPY, t ) ) {
                    resultList.push( fullList[i] );
                }
                //else {
                //tempList.push( fullList[i] );
                //}
            }
            //fullList = JSON.parse( JSON.stringify( tempList ) );
            //tempList = [];
            rt = "搜索拼音:" + t + '(' + resultList.length + '个符合项)<br />依次匹配姓名、专业';
        } else if ( t.match( /^[\u4e00-\u9fa5]{1,}$/ ) ) {
            //Chinese
            //Search the value of name (Match Left)
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].name.slice( 0, t.length ) == t ) {
                    resultList.push( fullList[i] );
                } else {
                    tempList.push( fullList[i] );
                }
            }
            fullList = JSON.parse( JSON.stringify( tempList ) );
            tempList = [];
            //Search the value of name (Match Any)
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].name.indexOf( t ) != -1 ) {
                    resultList.push( fullList[i] );
                } else {
                    tempList.push( fullList[i] );
                }
            }
            fullList = JSON.parse( JSON.stringify( tempList ) );
            tempList = [];
            //Search the value of major
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].major && sta.personData[fullList[i]].major.indexOf( t ) != -1 ) {
                    resultList.push( fullList[i] );
                } else {
                    tempList.push( fullList[i] );
                }
            }
            fullList = JSON.parse( JSON.stringify( tempList ) );
            tempList = [];
            //Search the value of school
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( testForInclude( sta.personData[fullList[i]].school, t ) ) {
                    resultList.push( fullList[i] );
                } else {
                    tempList.push( fullList[i] );
                }
            }
            fullList = JSON.parse( JSON.stringify( tempList ) );
            //tempList = [];
            //Search the value of city
            for ( var i = 0; i < fullList.length; i++ ) {
                if ( sta.personData[fullList[i]].city.slice( 0, t.length ) == t ) {
                    resultList.push( fullList[i] );
                }
                //else {
                //    tempList.push( fullList[i] );
                //}
            }
            rt = "搜索:" + t + '(' + resultList.length + '个符合项)<br />依次匹配姓名、专业、学校、城市';
        }
        rt = rt || ( 'Sorry! 没有理解您的输入.<br />尝试输入"'
            + [133, 150, 186, 170][Math.floor( Math.random() * ( 4 ) )] + '","'
            + ['beijing', 'ty', 'tianjin', 'shanxidaxue'][Math.floor( Math.random() * ( 4 ) )] + '","'
            + ['上海', '南大', '工程', '技术'][Math.floor( Math.random() * ( 4 ) )] + '"' );
        //Search Result Presentation
        sta.personFitleType.info = resultList;
        searchDescription.html( rt );
        person_fitle();
        $_ctrl_nameList.scrollTop( 0 );
        return false;
    }


    //Add Events Processor
    var mobileTestResult = mobile_test();
    //mobileTestResult = false;

    $_window.resize( redraw );

    $_ctrl_toggle.bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        if ( sta['ctrl'] ) {
            search_close();
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
        search_close();
        return false;
    } );

    $_ctrl_province_btn.bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        search_close();
        if ( sta.school ) {
            $_ctrl_school.removeClass( 'ctrl-list-school-box-on' );
            sta.school = false;
        }
        if ( sta.province ) {
            $_ctrl_province.removeClass( 'ctrl-list-province-box-on' );
            sta.province = false;
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
    $( 'div#maps-closeSearch' ).fadeOut( 50 );
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


    $( 'div#maps-closeSearch' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        search_close();
    } );

    $( 'div#ctrl-search-button' ).bind(( mobileTestResult ? 'tap' : 'click' ), function () {
        if ( sta.search ) {
            //Close Search
            search_close();
        } else {
            //Open Search
            search_open();
        }
    } );


    document.getElementById( 'ctrl-search-text' ).oninput = function () {
        if ( window.setImmediate ) {
            setImmediate( search_search );
        } else {
            setTimeout( search_search, 20 );
        }
    };

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
        point_initialize( mobileTestResult );

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
        point_initialize( mobileTestResult );

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

//Welcome Screen
mapOfSixteen.welcome = ( function () {
    var welcomePages = [
        $( '#welcome-page-1' ),
        $( '#welcome-page-2' ),
        $( '#welcome-page-3' ),
        $( '#welcome-page-4' ),
    ];
    var cur = 0;

    $( '#welcome-page-btn' ).click( function () {
        //welcomePages[cur].fadeOut( 1600 );
        welcomePages[cur].addClass( 'welcome-page-out' );
        cur++;
        if ( cur == welcomePages.length ) {
            setTimeout( function () {
                $( '#welcome-screen' ).fadeOut( 50 );
            }, 1500 )

        } else {
            //setTimeout( function () {
            //    welcomePages[cur].fadeIn( 1050 );
            //}, 950 )
            //welcomePages[cur].addClass( 'welcome-page-out' );
        }
    } );
    //$( '#welcome-screen' ).fadeOut( 50 );
} );

//----- JSONP -----
( function () {
    //JSONP : ID = 5
    var id = 5;
    mapOfSixteen.loader.update( id );
} )()


