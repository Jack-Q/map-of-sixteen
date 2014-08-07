/**
 * AvatarUI-地图
 * @version v2.0.1
 * @author  Rocky(296456018@qq.com)
 * @date    2013-05-28
 */

; !function ( win, $, undefined ) {
    var __hasProp = {}.hasOwnProperty;

    var mergeObjects = function ( obj1, obj2 ) {
        var key, out, val;
        out = {};
        for ( key in obj1 ) {
            if ( !__hasProp.call( obj1, key ) ) continue;
            val = obj1[key];
            out[key] = val;
        }
        for ( key in obj2 ) {
            if ( !__hasProp.call( obj2, key ) ) continue;
            val = obj2[key];
            out[key] = val;
        }
        return out;
    };

    var SVGMap = ( function () {
        function SVGMap( dom, options ) {
            this.dom = dom;
            this.setOptions( options );
            this.render();
        }

        SVGMap.prototype.options = {
            mapName: 'china',
            mapWidth: 500,
            mapHeight: 400,
            stateColorList: ['2770B5', '429DD4', '5AABDA', '1C8DFF', '70B3DD', 'C6E1F4', 'EDF2F6'],
            stateDataAttr: ['stateInitColor', 'stateHoverColor', 'stateSelectedColor', 'baifenbi'],
            stateDataType: 'json',
            stateSettingsXmlPath: '',
            stateData: {},

            strokeWidth: 1,
            strokeColor: 'F9FCFE',

            stateInitColor: 'AAD5FF',
            stateHoverColor: 'feb41c',
            stateSelectedColor: 'E32F02',
            stateDisabledColor: 'eeeeee',

            showTip: false,
            stateTipWidth: 100,
            //stateTipHeight: 50,
            stateTipX: 0,
            stateTipY: -10,
            stateTipHtml: function ( stateData, obj ) {
                return obj.name;
            },

            hoverCallback: function ( stateData, obj ) { },
            clickCallback: function ( stateData, obj ) { },
            external: false
        };
        SVGMap.prototype.setOptions = function ( options ) {
            if ( options == null ) {
                options = null;
            }
            this.options = mergeObjects( this.options, options );
            return this;
        };

        SVGMap.prototype.scaleRaphael = function ( container, width, height ) {
            var wrapper = document.getElementById( container );
            if ( !wrapper.style.position ) wrapper.style.position = "relative";
            wrapper.style.width = width + "px";
            wrapper.style.height = height + "px";
            wrapper.style.overflow = "hidden";
            var nestedWrapper;
            if ( Raphael.type == "VML" ) {
                wrapper.innerHTML = "<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup_" + container + "'><\/rvml:group>";
                nestedWrapper = document.getElementById( "vmlgroup_" + container );
            } else {
                wrapper.innerHTML = "<div class='svggroup'><\/div>";
                nestedWrapper = wrapper.getElementsByClassName( "svggroup" )[0];
            }
            var paper = new Raphael( nestedWrapper, width, height );
            var vmlDiv;
            if ( Raphael.type == "SVG" ) {
                paper.canvas.setAttribute( "viewBox", "0 0 " + width + " " + height );
            } else {
                vmlDiv = wrapper.getElementsByTagName( "div" )[0];
            }
            paper.changeSize = function ( w, h, center, clipping ) {
                clipping = !clipping;
                var ratioW = w / width;
                var ratioH = h / height;
                var scale = ratioW < ratioH ? ratioW : ratioH;
                var newHeight = parseInt( height * scale );
                var newWidth = parseInt( width * scale );
                if ( Raphael.type == "VML" ) {
                    var txt = document.getElementsByTagName( "textpath" );
                    for ( var i in txt ) {
                        var curr = txt[i];
                        if ( curr.style ) {
                            if ( !curr._fontSize ) {
                                var mod = curr.style.font.split( "px" );
                                curr._fontSize = parseInt( mod[0] );
                                curr._font = mod[1];
                            }
                            curr.style.font = curr._fontSize * scale + "px" + curr._font;
                        }
                    }
                    var newSize;
                    if ( newWidth < newHeight ) {
                        newSize = newWidth * 1000 / width;
                    } else {
                        newSize = newHeight * 1000 / height;
                    }
                    newSize = parseInt( newSize );
                    nestedWrapper.style.width = newSize + "px";
                    nestedWrapper.style.height = newSize + "px";
                    if ( clipping ) {
                        nestedWrapper.style.left = parseInt(( w - newWidth ) / 2 ) + "px";
                        nestedWrapper.style.top = parseInt(( h - newHeight ) / 2 ) + "px";
                    }
                    vmlDiv.style.overflow = "visible";
                }
                if ( clipping ) {
                    newWidth = w;
                    newHeight = h;
                }
                wrapper.style.width = newWidth + "px";
                wrapper.style.height = newHeight + "px";
                paper.setSize( newWidth, newHeight );
                if ( center ) {
                    wrapper.style.position = "absolute";
                    wrapper.style.left = parseInt(( w - newWidth ) / 2 ) + "px";
                    wrapper.style.top = parseInt(( h - newHeight ) / 2 ) + "px";
                }
            };
            paper.scaleAll = function ( amount ) {
                paper.changeSize( width * amount, height * amount );
            };
            paper.changeSize( width, height );
            paper.w = width;
            paper.h = height;
            return paper;
        }

        SVGMap.prototype.render = function () {
            var opt = this.options,
                _self = this.dom,
                mapName = opt.mapName,
                mapConfig = eval( mapName + 'MapConfig' );

            var stateData = {};

            if ( opt.stateDataType == 'xml' ) {
                console.log( 123 )
                var mapSettings = opt.stateSettingsXmlPath;
                $.ajax( {
                    type: 'GET',
                    url: mapSettings,
                    async: false,
                    dataType: $.browser.msie ? 'text' : 'xml',
                    success: function ( data ) {
                        var xml;
                        if ( $.browser.msie ) {
                            xml = new ActiveXObject( 'Microsoft.XMLDOM' );
                            xml.async = false;
                            xml.loadXML( data );
                        } else {
                            xml = data;
                        }
                        var $xml = $( xml );
                        $xml.find( 'stateData' ).each( function ( i ) {
                            var $node = $( this ),
                                stateName = $node.attr( 'stateName' );

                            stateData[stateName] = {};
                            // var attrs = $node[0].attributes;
                            // alert(attrs);
                            // for(var i in attrs){
                            //     stateData[stateName][attrs[i].name] = attrs[i].value;
                            // }
                            for ( var i = 0, len = opt.stateDataAttr.length; i < len; i++ ) {
                                stateData[stateName][opt.stateDataAttr[i]] = $node.attr( opt.stateDataAttr[i] );
                            }
                        } );
                    }
                } );
            } else {
                stateData = opt.stateData;
            }

            var offsetXY = function ( e ) {
                var mouseX,
                    mouseY,
                    tipWidth = $( '.stateTip' ).outerWidth(),
                    tipHeight = $( '.stateTip' ).outerHeight();
                if ( e && e.pageX ) {
                    mouseX = e.pageX;
                    mouseY = e.pageY;
                } else {
                    mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }
                mouseX = mouseX - tipWidth / 2 + opt.stateTipX < 0 ? 0 : mouseX - tipWidth / 2 + opt.stateTipX;
                mouseY = mouseY - tipHeight + opt.stateTipY < 0 ? mouseY - opt.stateTipY : mouseY - tipHeight + opt.stateTipY;
                return [mouseX, mouseY];
            };

            var current, reTimer;

            var r = this.scaleRaphael( _self.attr( 'id' ), mapConfig.width, mapConfig.height ),
                attributes = {
                    fill: '#' + opt.stateInitColor,
                    cursor: 'pointer',
                    stroke: '#' + opt.strokeColor,
                    'stroke-width': opt.strokeWidth,
                    'stroke-linejoin': 'round'
                };

            var stateColor = {};

            for ( var state in mapConfig.shapes ) {
                var thisStateData = stateData[state],
                    initColor = '#' + ( thisStateData && opt.stateColorList[thisStateData.stateInitColor] || opt.stateInitColor ),
                    hoverColor = '#' + ( thisStateData && thisStateData.stateHoverColor || opt.stateHoverColor ),
                    selectedColor = '#' + ( thisStateData && thisStateData.stateSelectedColor || opt.stateSelectedColor ),
                    disabledColor = '#' + ( thisStateData && thisStateData.stateDisabledColor || opt.stateDisabledColor );

                stateColor[state] = {};

                stateColor[state].initColor = initColor;
                stateColor[state].hoverColor = hoverColor;
                stateColor[state].selectedColor = selectedColor;

                var obj = r.path( mapConfig['shapes'][state] );
                obj.id = state;
                obj.name = mapConfig['names'][state];
                obj.attr( attributes );

                if ( opt.external ) {
                    opt.external[obj.id] = obj;
                }

                if ( stateData[state] && stateData[state].diabled ) {
                    obj.attr( {
                        fill: disabledColor,
                        cursor: 'default'
                    } );
                } else {
                    obj.attr( {
                        fill: initColor
                    } );

                    obj.hover( function ( e ) {
                        if ( this != current ) {
                            this.animate( {
                                fill: stateColor[this.id].hoverColor
                            }, 250 );
                        }
                        if ( opt.showTip ) {
                            clearTimeout( reTimer );
                            if ( $( '.stateTip' ).length == 0 ) {
                                $( document.body ).append( '<div class="stateTip"></div' );
                            }
                            $( '.stateTip' ).html( opt.stateTipHtml( stateData, this ) );
                            var _offsetXY = new offsetXY( e );

                            $( '.stateTip' ).css( {
                                width: opt.stateTipWidth || 'auto',
                                height: opt.stateTipHeight || 'auto',
                                left: _offsetXY[0],
                                top: _offsetXY[1]
                            } ).show();
                        }

                        opt.hoverCallback( stateData, this );
                    } );

                    obj.mouseout( function () {
                        if ( this != current ) {
                            this.animate( {
                                fill: stateColor[this.id].initColor
                            }, 250 );
                        }
                        // $('.stateTip').hide();
                        if ( opt.showTip ) {
                            reTimer = setTimeout( function () {
                                $( '.stateTip' ).remove();
                            }, 100 );
                        }
                    } );

                    obj.mouseup( function ( e ) {
                        if ( current ) {
                            current.animate( {
                                fill: stateColor[current.id].initColor
                            }, 250 );
                        }

                        this.animate( {
                            fill: stateColor[this.id].selectedColor
                        }, 250 );

                        current = this;
                        opt.clickCallback( stateData, this );
                    } );
                }
                r.changeSize( opt.mapWidth, opt.mapHeight, false, false );
            }
            document.body.onmousemove = function ( e ) {
                var _offsetXY = new offsetXY( e );
                $( '.stateTip' ).css( {
                    left: _offsetXY[0],
                    top: _offsetXY[1]
                } );
            };
        }
        return SVGMap;
    } )();

    $.fn.SVGMap = function ( opts ) {
        var $this = $( this ),
            data = $this.data();

        if ( data.SVGMap ) {
            delete data.SVGMap;
        }
        if ( opts !== false ) {
            data.SVGMap = new SVGMap( $this, opts );
        }
        return data.SVGMap;
    };
}( this, jQuery );



( function ( jQuery, undefined ) {

    var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	// plusequals test for += 100 -= 100
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
	// a set of RE's that can match strings and generate color tuples.
	stringParsers = [{
	    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
	    parse: function ( execResult ) {
	        return [
                execResult[1],
                execResult[2],
                execResult[3],
                execResult[4]
	        ];
	    }
	}, {
	    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
	    parse: function ( execResult ) {
	        return [
                execResult[1] * 2.55,
                execResult[2] * 2.55,
                execResult[3] * 2.55,
                execResult[4]
	        ];
	    }
	}, {
	    // this regex ignores A-F because it's compared against an already lowercased string
	    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
	    parse: function ( execResult ) {
	        return [
                parseInt( execResult[1], 16 ),
                parseInt( execResult[2], 16 ),
                parseInt( execResult[3], 16 )
	        ];
	    }
	}, {
	    // this regex ignores A-F because it's compared against an already lowercased string
	    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
	    parse: function ( execResult ) {
	        return [
                parseInt( execResult[1] + execResult[1], 16 ),
                parseInt( execResult[2] + execResult[2], 16 ),
                parseInt( execResult[3] + execResult[3], 16 )
	        ];
	    }
	}, {
	    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
	    space: "hsla",
	    parse: function ( execResult ) {
	        return [
                execResult[1],
                execResult[2] / 100,
                execResult[3] / 100,
                execResult[4]
	        ];
	    }
	}],

	// jQuery.Color( )
	color = jQuery.Color = function ( color, green, blue, alpha ) {
	    return new jQuery.Color.fn.parse( color, green, blue, alpha );
	},
	spaces = {
	    rgba: {
	        props: {
	            red: {
	                idx: 0,
	                type: "byte"
	            },
	            green: {
	                idx: 1,
	                type: "byte"
	            },
	            blue: {
	                idx: 2,
	                type: "byte"
	            }
	        }
	    },

	    hsla: {
	        props: {
	            hue: {
	                idx: 0,
	                type: "degrees"
	            },
	            saturation: {
	                idx: 1,
	                type: "percent"
	            },
	            lightness: {
	                idx: 2,
	                type: "percent"
	            }
	        }
	    }
	},
	propTypes = {
	    "byte": {
	        floor: true,
	        max: 255
	    },
	    "percent": {
	        max: 1
	    },
	    "degrees": {
	        mod: 360,
	        floor: true
	    }
	},
	support = color.support = {},

	// element for support tests
	supportElem = jQuery( "<p>" )[0],

	// colors = jQuery.Color.names
	colors,

	// local aliases of functions called often
	each = jQuery.each;

    // determine rgba support immediately
    supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
    support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

    // define cache name and alpha properties
    // for rgba and hsla spaces
    each( spaces, function ( spaceName, space ) {
        space.cache = "_" + spaceName;
        space.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        };
    } );

    function clamp( value, prop, allowEmpty ) {
        var type = propTypes[prop.type] || {};

        if ( value == null ) {
            return ( allowEmpty || !prop.def ) ? null : prop.def;
        }

        // ~~ is an short way of doing floor for positive numbers
        value = type.floor ? ~~value : parseFloat( value );

        // IE will pass in empty strings as value for alpha,
        // which will hit this case
        if ( isNaN( value ) ) {
            return prop.def;
        }

        if ( type.mod ) {
            // we add mod before modding to make sure that negatives values
            // get converted properly: -10 -> 350
            return ( value + type.mod ) % type.mod;
        }

        // for now all property types without mod have min and max
        return 0 > value ? 0 : type.max < value ? type.max : value;
    }

    function stringParse( string ) {
        var inst = color(),
            rgba = inst._rgba = [];

        string = string.toLowerCase();

        each( stringParsers, function ( i, parser ) {
            var parsed,
                match = parser.re.exec( string ),
                values = match && parser.parse( match ),
                spaceName = parser.space || "rgba";

            if ( values ) {
                parsed = inst[spaceName]( values );

                // if this was an rgba parse the assignment might happen twice
                // oh well....
                inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
                rgba = inst._rgba = parsed._rgba;

                // exit each( stringParsers ) here because we matched
                return false;
            }
        } );

        // Found a stringParser that handled it
        if ( rgba.length ) {

            // if this came from a parsed string, force "transparent" when alpha is 0
            // chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
            if ( rgba.join() === "0,0,0,0" ) {
                jQuery.extend( rgba, colors.transparent );
            }
            return inst;
        }

        // named colors
        return colors[string];
    }

    color.fn = jQuery.extend( color.prototype, {
        parse: function ( red, green, blue, alpha ) {
            if ( red === undefined ) {
                this._rgba = [null, null, null, null];
                return this;
            }
            if ( red.jquery || red.nodeType ) {
                red = jQuery( red ).css( green );
                green = undefined;
            }

            var inst = this,
                type = jQuery.type( red ),
                rgba = this._rgba = [];

            // more than 1 argument specified - assume ( red, green, blue, alpha )
            if ( green !== undefined ) {
                red = [red, green, blue, alpha];
                type = "array";
            }

            if ( type === "string" ) {
                return this.parse( stringParse( red ) || colors._default );
            }

            if ( type === "array" ) {
                each( spaces.rgba.props, function ( key, prop ) {
                    rgba[prop.idx] = clamp( red[prop.idx], prop );
                } );
                return this;
            }

            if ( type === "object" ) {
                if ( red instanceof color ) {
                    each( spaces, function ( spaceName, space ) {
                        if ( red[space.cache] ) {
                            inst[space.cache] = red[space.cache].slice();
                        }
                    } );
                } else {
                    each( spaces, function ( spaceName, space ) {
                        var cache = space.cache;
                        each( space.props, function ( key, prop ) {

                            // if the cache doesn't exist, and we know how to convert
                            if ( !inst[cache] && space.to ) {

                                // if the value was null, we don't need to copy it
                                // if the key was alpha, we don't need to copy it either
                                if ( key === "alpha" || red[key] == null ) {
                                    return;
                                }
                                inst[cache] = space.to( inst._rgba );
                            }

                            // this is the only case where we allow nulls for ALL properties.
                            // call clamp with alwaysAllowEmpty
                            inst[cache][prop.idx] = clamp( red[key], prop, true );
                        } );

                        // everything defined but alpha?
                        if ( inst[cache] && jQuery.inArray( null, inst[cache].slice( 0, 3 ) ) < 0 ) {
                            // use the default of 1
                            inst[cache][3] = 1;
                            if ( space.from ) {
                                inst._rgba = space.from( inst[cache] );
                            }
                        }
                    } );
                }
                return this;
            }
        },
        is: function ( compare ) {
            var is = color( compare ),
                same = true,
                inst = this;

            each( spaces, function ( _, space ) {
                var localCache,
                    isCache = is[space.cache];
                if ( isCache ) {
                    localCache = inst[space.cache] || space.to && space.to( inst._rgba ) || [];
                    each( space.props, function ( _, prop ) {
                        if ( isCache[prop.idx] != null ) {
                            same = ( isCache[prop.idx] === localCache[prop.idx] );
                            return same;
                        }
                    } );
                }
                return same;
            } );
            return same;
        },
        _space: function () {
            var used = [],
                inst = this;
            each( spaces, function ( spaceName, space ) {
                if ( inst[space.cache] ) {
                    used.push( spaceName );
                }
            } );
            return used.pop();
        },
        transition: function ( other, distance ) {
            var end = color( other ),
                spaceName = end._space(),
                space = spaces[spaceName],
                startColor = this.alpha() === 0 ? color( "transparent" ) : this,
                start = startColor[space.cache] || space.to( startColor._rgba ),
                result = start.slice();

            end = end[space.cache];
            each( space.props, function ( key, prop ) {
                var index = prop.idx,
                    startValue = start[index],
                    endValue = end[index],
                    type = propTypes[prop.type] || {};

                // if null, don't override start value
                if ( endValue === null ) {
                    return;
                }
                // if null - use end
                if ( startValue === null ) {
                    result[index] = endValue;
                } else {
                    if ( type.mod ) {
                        if ( endValue - startValue > type.mod / 2 ) {
                            startValue += type.mod;
                        } else if ( startValue - endValue > type.mod / 2 ) {
                            startValue -= type.mod;
                        }
                    }
                    result[index] = clamp(( endValue - startValue ) * distance + startValue, prop );
                }
            } );
            return this[spaceName]( result );
        },
        blend: function ( opaque ) {
            // if we are already opaque - return ourself
            if ( this._rgba[3] === 1 ) {
                return this;
            }

            var rgb = this._rgba.slice(),
                a = rgb.pop(),
                blend = color( opaque )._rgba;

            return color( jQuery.map( rgb, function ( v, i ) {
                return ( 1 - a ) * blend[i] + a * v;
            } ) );
        },
        toRgbaString: function () {
            var prefix = "rgba(",
                rgba = jQuery.map( this._rgba, function ( v, i ) {
                    return v == null ? ( i > 2 ? 1 : 0 ) : v;
                } );

            if ( rgba[3] === 1 ) {
                rgba.pop();
                prefix = "rgb(";
            }

            return prefix + rgba.join() + ")";
        },
        toHslaString: function () {
            var prefix = "hsla(",
                hsla = jQuery.map( this.hsla(), function ( v, i ) {
                    if ( v == null ) {
                        v = i > 2 ? 1 : 0;
                    }

                    // catch 1 and 2
                    if ( i && i < 3 ) {
                        v = Math.round( v * 100 ) + "%";
                    }
                    return v;
                } );

            if ( hsla[3] === 1 ) {
                hsla.pop();
                prefix = "hsl(";
            }
            return prefix + hsla.join() + ")";
        },
        toHexString: function ( includeAlpha ) {
            var rgba = this._rgba.slice(),
                alpha = rgba.pop();

            if ( includeAlpha ) {
                rgba.push( ~~( alpha * 255 ) );
            }

            return "#" + jQuery.map( rgba, function ( v ) {

                // default to 0 when nulls exist
                v = ( v || 0 ).toString( 16 );
                return v.length === 1 ? "0" + v : v;
            } ).join( "" );
        },
        toString: function () {
            return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
        }
    } );
    color.fn.parse.prototype = color.fn;

    // hsla conversions adapted from:
    // https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

    function hue2rgb( p, q, h ) {
        h = ( h + 1 ) % 1;
        if ( h * 6 < 1 ) {
            return p + ( q - p ) * h * 6;
        }
        if ( h * 2 < 1 ) {
            return q;
        }
        if ( h * 3 < 2 ) {
            return p + ( q - p ) * ( ( 2 / 3 ) - h ) * 6;
        }
        return p;
    }

    spaces.hsla.to = function ( rgba ) {
        if ( rgba[0] == null || rgba[1] == null || rgba[2] == null ) {
            return [null, null, null, rgba[3]];
        }
        var r = rgba[0] / 255,
            g = rgba[1] / 255,
            b = rgba[2] / 255,
            a = rgba[3],
            max = Math.max( r, g, b ),
            min = Math.min( r, g, b ),
            diff = max - min,
            add = max + min,
            l = add * 0.5,
            h, s;

        if ( min === max ) {
            h = 0;
        } else if ( r === max ) {
            h = ( 60 * ( g - b ) / diff ) + 360;
        } else if ( g === max ) {
            h = ( 60 * ( b - r ) / diff ) + 120;
        } else {
            h = ( 60 * ( r - g ) / diff ) + 240;
        }

        // chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
        // otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
        if ( diff === 0 ) {
            s = 0;
        } else if ( l <= 0.5 ) {
            s = diff / add;
        } else {
            s = diff / ( 2 - add );
        }
        return [Math.round( h ) % 360, s, l, a == null ? 1 : a];
    };

    spaces.hsla.from = function ( hsla ) {
        if ( hsla[0] == null || hsla[1] == null || hsla[2] == null ) {
            return [null, null, null, hsla[3]];
        }
        var h = hsla[0] / 360,
            s = hsla[1],
            l = hsla[2],
            a = hsla[3],
            q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
            p = 2 * l - q;

        return [
            Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
            Math.round( hue2rgb( p, q, h ) * 255 ),
            Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
            a
        ];
    };


    each( spaces, function ( spaceName, space ) {
        var props = space.props,
            cache = space.cache,
            to = space.to,
            from = space.from;

        // makes rgba() and hsla()
        color.fn[spaceName] = function ( value ) {

            // generate a cache for this space if it doesn't exist
            if ( to && !this[cache] ) {
                this[cache] = to( this._rgba );
            }
            if ( value === undefined ) {
                return this[cache].slice();
            }

            var ret,
                type = jQuery.type( value ),
                arr = ( type === "array" || type === "object" ) ? value : arguments,
                local = this[cache].slice();

            each( props, function ( key, prop ) {
                var val = arr[type === "object" ? key : prop.idx];
                if ( val == null ) {
                    val = local[prop.idx];
                }
                local[prop.idx] = clamp( val, prop );
            } );

            if ( from ) {
                ret = color( from( local ) );
                ret[cache] = local;
                return ret;
            } else {
                return color( local );
            }
        };

        // makes red() green() blue() alpha() hue() saturation() lightness()
        each( props, function ( key, prop ) {
            // alpha is included in more than one space
            if ( color.fn[key] ) {
                return;
            }
            color.fn[key] = function ( value ) {
                var vtype = jQuery.type( value ),
                    fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
                    local = this[fn](),
                    cur = local[prop.idx],
                    match;

                if ( vtype === "undefined" ) {
                    return cur;
                }

                if ( vtype === "function" ) {
                    value = value.call( this, cur );
                    vtype = jQuery.type( value );
                }
                if ( value == null && prop.empty ) {
                    return this;
                }
                if ( vtype === "string" ) {
                    match = rplusequals.exec( value );
                    if ( match ) {
                        value = cur + parseFloat( match[2] ) * ( match[1] === "+" ? 1 : -1 );
                    }
                }
                local[prop.idx] = value;
                return this[fn]( local );
            };
        } );
    } );

    // add cssHook and .fx.step function for each named hook.
    // accept a space separated string of properties
    color.hook = function ( hook ) {
        var hooks = hook.split( " " );
        each( hooks, function ( i, hook ) {
            jQuery.cssHooks[hook] = {
                set: function ( elem, value ) {
                    var parsed, curElem,
                        backgroundColor = "";

                    if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
                        value = color( parsed || value );
                        if ( !support.rgba && value._rgba[3] !== 1 ) {
                            curElem = hook === "backgroundColor" ? elem.parentNode : elem;
                            while (
                                ( backgroundColor === "" || backgroundColor === "transparent" ) &&
                                curElem && curElem.style
                            ) {
                                try {
                                    backgroundColor = jQuery.css( curElem, "backgroundColor" );
                                    curElem = curElem.parentNode;
                                } catch ( e ) {
                                }
                            }

                            value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
                                backgroundColor :
                                "_default" );
                        }

                        value = value.toRgbaString();
                    }
                    try {
                        elem.style[hook] = value;
                    } catch ( e ) {
                        // wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
                    }
                }
            };
            jQuery.fx.step[hook] = function ( fx ) {
                if ( !fx.colorInit ) {
                    fx.start = color( fx.elem, hook );
                    fx.end = color( fx.end );
                    fx.colorInit = true;
                }
                jQuery.cssHooks[hook].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
            };
        } );

    };

    color.hook( stepHooks );

    jQuery.cssHooks.borderColor = {
        expand: function ( value ) {
            var expanded = {};

            each( ["Top", "Right", "Bottom", "Left"], function ( i, part ) {
                expanded["border" + part + "Color"] = value;
            } );
            return expanded;
        }
    };

    // Basic color names only.
    // Usage of any of the other color names requires adding yourself or including
    // jquery.color.svg-names.js.
    colors = jQuery.Color.names = {
        // 4.1. Basic color keywords
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",

        // 4.2.3. "transparent" color keyword
        transparent: [null, null, null, 0],

        _default: "#ffffff"
    };

} )( jQuery );

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */

( function ( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define( ['jquery'], factory );
    } else if ( typeof exports === 'object' ) {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory( jQuery );
    }
}( function ( $ ) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function () {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data( this, 'mousewheel-line-height', special.getLineHeight( this ) );
            $.data( this, 'mousewheel-page-height', special.getPageHeight( this ) );
        },

        teardown: function () {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData( this, 'mousewheel-line-height' );
            $.removeData( this, 'mousewheel-page-height' );
        },

        getLineHeight: function ( elem ) {
            var $elem = $( elem ),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if ( !$parent.length ) {
                $parent = $( 'body' );
            }
            return parseInt( $parent.css( 'fontSize' ), 10 ) || parseInt( $elem.css( 'fontSize' ), 10 ) || 16;
        },

        getPageHeight: function ( elem ) {
            return $( elem ).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend( {
        mousewheel: function ( fn ) {
            return fn ? this.bind( 'mousewheel', fn ) : this.trigger( 'mousewheel' );
        },

        unmousewheel: function ( fn ) {
            return this.unbind( 'mousewheel', fn );
        }
    } );


    function handler( event ) {
        var orgEvent = event || window.event,
            args = slice.call( arguments, 1 ),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix( orgEvent );
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail' in orgEvent ) { deltaY = orgEvent.detail * -1; }
        if ( 'wheelDelta' in orgEvent ) { deltaY = orgEvent.wheelDelta; }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY; }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data( this, 'mousewheel-line-height' );
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data( this, 'mousewheel-page-height' );
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs( deltaY ), Math.abs( deltaX ) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas( orgEvent, absDelta ) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas( orgEvent, absDelta ) ) {
            // Divide all the things by 40!
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil']( delta / lowestDelta );
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil']( deltaX / lowestDelta );
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil']( deltaY / lowestDelta );

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift( event, delta, deltaX, deltaY );

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if ( nullLowestDeltaTimeout ) { clearTimeout( nullLowestDeltaTimeout ); }
        nullLowestDeltaTimeout = setTimeout( nullLowestDelta, 200 );

        return ( $.event.dispatch || $.event.handle ).apply( this, args );
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas( orgEvent, absDelta ) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

} ) );


( function () {
    //JSONP : ID = 3
    var id = 3;
    mapOfSixteen.loader.update( id );
} )()