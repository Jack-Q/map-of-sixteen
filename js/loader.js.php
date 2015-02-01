/*<?php
// This File Contains Application Cache Configuration

//Set Header
header("Content-type:text/javascript");
?>*/
        var mapOfSixteen = mapOfSixteen ? mapOfSixteen : {};
        mapOfSixteen.loaderInformation.isCache = 
            Math.abs(<?php echo time(); ?> - mapOfSixteen.loaderInformation.version)>60;
        mapOfSixteen.loader = {
            main: function () {
                //Page Loading Function
                // 0% - Page Framework Initialization, jQurery loading
                //  ... , ...
                // 20% - Page Script Loaded (This function will be excuted)
                var loader = mapOfSixteen.loader;
                loader.progress = 20;
                loader.splash.text = $('#splash-progress').text('加载中 - ' + loader.progress.toFixed(1) + '%');
                loader.splash.bar = $('.splash-logo-wave').animate({ 'top': 0.9 * (100 - loader.progress) + 'px' }, 300, 'swing');

                //Loading Asset List
                $.get('js/loaderList.js'/*+'?' + Math.random().toFixed(5)*/, function (data, status) {
                    var loader = mapOfSixteen.loader;
                    loader.list = JSON.parse(data);
                    loader.progress += 5;
                    loader.loadListItem(1);
                    loader.splash.text.text('加载中 - ' + loader.progress.toFixed(1) + '%');
                    loader.splash.bar.animate({ 'top': 0.9 * (100 - loader.progress) + 'px' }, 50, 'swing');
                });

            },
            //current: 1,
            loadListItem: function (id) {
                var loader = mapOfSixteen.loader;
                var j = loader.list[id - 1];
                switch (j.type) {
                    case 'jsonp':
                        if(mapOfSixteen.loaderInformation.isCache){
                            var k = document.createElement('script');
                            k.src = j.url;
                            document.body.appendChild(k);
                            setTimeout(function () { mapOfSixteen.loader.update(id,true); }, 20);
                        }else{
                            var k = document.createElement('script');
                            k.src = j.url;
                            document.body.appendChild(k);
                        }
                        break;
                    case 'css':
                        if(mapOfSixteen.loaderInformation.isCache){
                            var k = document.createElement('link');
                            k.href = j.url;
                            k.rel = "stylesheet";
                            document.body.appendChild(k);
                            setTimeout(function () { mapOfSixteen.loader.update(id); }, 20);
                        }else{
                            var k = document.createElement('link');
                            k.href = j.url;
                            k.rel = "stylesheet";
                            document.body.appendChild(k);
                            setTimeout(function () { mapOfSixteen.loader.update(id); }, 500);
                        }
                        break;
                    case 'img':
                        
                        if(mapOfSixteen.loaderInformation.isCache){
                            setTimeout(function () { mapOfSixteen.loader.update(id); }, 20);
                        }else{
                            var k = '<img/>';
                            k = $(k).ready(function () {
                                mapOfSixteen.loader.update(id);
                            });
                            k.attr('src', j.url );
                            k.appendTo('#asset-box');
                        }
                }
            },
            update: function (id,code) {
                var loader = mapOfSixteen.loader;
                loader.progress += loader.list[id - 1].per;
                loader.splash.text.text('加载' + loader.list[id - 1].name + ' - ' + loader.progress.toFixed(1) + '%');
                loader.splash.bar.animate({ 'top': 0.9 * (100 - loader.progress) + 'px' }, 50, 'swing');

                if (id !== loader.list.length) {
                    if(loader.list[id-1].type=='jsonp'){
                        if(mapOfSixteen.loaderInformation.isCache){
                            if(code==true){
                                setTimeout(function () {
                                    loader.loadListItem(id + 1)
                                }, 50);
                            }
                        }else{
                            setTimeout(function () {
                                loader.loadListItem(id + 1)
                            }, 50);
                        }
                    }else{
                        setTimeout(function () {
                            loader.loadListItem(id + 1)
                        }, 50);
                    }
                }

                if (loader.progress >= 94.95) {
                    loader.splash.text.text('初始化 - ' + loader.progress.toFixed(1) + '%');
                    setTimeout(mapOfSixteen.main, 100); //Initialize this site.
                    setTimeout(mapOfSixteen.welcome, 200); //Start Welcome Function
                    setTimeout(loader.finish, 800);    //End the splash screen
                }
            },
            finish: function () {
                var loader = mapOfSixteen.loader;
                loader.splash.text.text('加载完成 - 100.0%');
                loader.splash.bar.animate({ 'top': '0.1px' }, 50, 'swing');
                $('.splash-wrapper').fadeOut(500);
                $('#splash-screen').animate({ 'background-color': 'rgba(0,122,204,0)' }, 1200, 'swing', function () { $(this).css('display', 'none'); });
                $('#splash-bg1').animate({ 'opacity': '1' }, 100, 'linear').animate({ 'top': '-100%' }, 1100, 'swing', function () { $(this).css('display', 'none'); });
                $('#splash-bg2').animate({ 'opacity': '1' }, 100, 'linear').animate({ 'top': '100%' }, 1100, 'swing', function () { $(this).css('display', 'none'); });
                $('#splash-bg3').animate({ 'opacity': '1' }, 100, 'linear').animate({ 'left': '-100%' }, 1100, 'swing', function () { $(this).css('display', 'none'); });
                $('#splash-bg4').animate({ 'opacity': '1' }, 100, 'linear').animate({ 'left': '100%' }, 1100, 'swing', function () { $(this).css('display', 'none'); });
            },
            progress: 0,
            splash: {},
            list: []
        };

