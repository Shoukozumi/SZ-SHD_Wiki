$(document).ready(function() { // this line is ultra fucking important, wasted 2h on this
    $(".floatingBranch").click(function (e) {
        e.preventDefault();
        $(".floatingTree.trunk").fadeIn();
        $(".floatingBranch").hide();
        $("map").imageMapResize();
    });

    $("area[alt='Close']").click(function (e) {
        e.preventDefault();
        $(".floatingTree.trunk").fadeOut();
        $(".floatingBranch").fadeIn();
    }).hover(function () {
        showBranch("none");
        $(".closeMenu").fadeIn("fast");
    }, function () {
        showBranch("none");
        $(".closeMenu").fadeOut("fast");
    });

    // below are the branches
    $("area[alt='About Us']").hover(function () {
        showBranch("aboutus");
    }).click(function (e) {
        e.preventDefault();});

    $("area[alt='The Project']").hover(function () {
        showBranch("theproject");
    }).click(function (e) {
        e.preventDefault();});

    $("area[alt='Parts']").hover(function () {
        showBranch("parts");
    }).click(function (e) {
        e.preventDefault();});

    $("area[alt='Judging']").hover(function () {
        showBranch("judging");
    }).click(function (e) {
        e.preventDefault();});

    $("area[alt='Human Practices']").hover(function () {
        showBranch("humanpractices");
    }).click(function (e) {
        e.preventDefault();});

    $("area[alt='Lab']").hover(function () {
        showBranch("lab");

    }).click(function (e) {
        e.preventDefault();});

    var currentBranch = "none";

    const subBranchMapArea = {'aboutus':'<area class="subBranchMap" alt="The Team" title="The Team" href="https://www.google.com" coords="1955,1581,1985,1501,2091,1425,2121,1388,2274,1360,2334,1375,2358,1417,2341,1447,2311,1509,2208,1477,2017,1573" shape="poly"> <area class="subBranchMap" alt="Collaboration" title="Collaboration" href="" coords="1992,1605,2099,1623,2148,1667,2260,1687,2319,1722,2381,1694,2435,1697,2465,1670,2524,1642,2532,1603,2269,1568,2123,1558,2062,1566" shape="poly"> <area class="subBranchMap" alt="Special thanks" title="Special thanks" href="" coords="1982,1613,2067,1645,2074,1680,2121,1707,2190,1722,2237,1741,2304,1769,2391,1813,2475,1848,2551,1892,2539,1944,2522,1994,2467,2008,2373,1910,2272,1939,2232,1867,2146,1813,2089,1820,2057,1749,1987,1717" shape="poly">'};


    function showBranch(branchID) {

        if (branchID != currentBranch){
            $("img#"+branchID).fadeIn("fast");
            $("img#"+currentBranch).fadeOut("fast");
            currentBranch = branchID;
            var trunkmap = $("map[name='trunk-map']");
            trunkmap.find("area.subBranchMap").remove();
            trunkmap.prepend($("map[name='aboutus-map']").find("area"));

            resizer.resizeMap();
            // $("area.subBranchMap").remove();
            // $("map[name='trunk-map']").prepend(subBranchMapArea["aboutus"]);
            // console.log(subBranchMapArea[branchID]);
            // $("map").imageMapResize();
        }
    }
    var resizer = imageMapResize();
    console.log(resizer);

    // var trunkmap = $("map[name='trunk-map']");
    // trunkmap.find("area.subBranchMap").remove();
    // resizer.setup();

});

// Dynamic Map Resizer
(function() {
    'use strict';
    function scaleImageMap() {
        function resizeMap() {
            function resizeAreaTag(cachedAreaCoords, idx) {
                function scale(coord) {
                    var dimension = 1 === (isWidth = 1 - isWidth) ? 'width' : 'height';
                    return (
                        padding[dimension] +
                        Math.floor(Number(coord) * scalingFactor[dimension])
                    )
                }

                var isWidth = 0;
                areas[idx].coords = cachedAreaCoords
                    .split(',')
                    .map(scale)
                    .join(',')
            }

            var scalingFactor = {
                width: image.width / image.naturalWidth,
                height: image.height / image.naturalHeight,
            };

            var padding = {
                width: parseInt(
                    window.getComputedStyle(image, null).getPropertyValue('padding-left'),
                    10
                ),
                height: parseInt(
                    window.getComputedStyle(image, null).getPropertyValue('padding-top'),
                    10
                ),
            };
            setup(); //unsafe
            // console.log(cachedAreaCoordsArray);
            cachedAreaCoordsArray.forEach(resizeAreaTag)
        }

        function getCoords(e) {
            //Normalize coord-string to csv format without any space chars
            return e.coords.replace(/ *, */g, ',').replace(/ +/g, ',')
        }

        function debounce() {
            clearTimeout(timer);
            timer = setTimeout(resizeMap, 250)
        }

        function start() {
            if (
                image.width !== image.naturalWidth ||
                image.height !== image.naturalHeight
            ) {
                resizeMap()
            }
        }

        function addEventListeners() {
            image.addEventListener('load', resizeMap, false); //Detect late image loads in IE11
            window.addEventListener('focus', resizeMap, false); //Cope with window being resized whilst on another tab
            window.addEventListener('resize', debounce, false);
            window.addEventListener('readystatechange', resizeMap, false);
            document.addEventListener('fullscreenchange', resizeMap, false)
        }

        function beenHere() {
            return 'function' === typeof map._resize
        }

        function getImg(name) {
            return document.querySelector('img[usemap="' + name + '"]')
        }

        function setup() {
            areas = map.getElementsByTagName('area');
            cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords);
            image = getImg('#' + map.name) || getImg(map.name);
            map._resize = resizeMap; //Bind resize method to HTML map element
        }

        var /*jshint validthis:true */
            map = this,
            areas = null,
            cachedAreaCoordsArray = null,
            image = null,
            timer = null;

        if (!beenHere()) {
            setup();
            addEventListeners();
            start()
        } else {
            map._resize(); //Already setup, so just resize map
        }
    }

    function factory() {
        function chkMap(element) {
            if (!element.tagName) {
                throw new TypeError('Object is not a valid DOM element')
            } else if ('MAP' !== element.tagName.toUpperCase()) {
                throw new TypeError(
                    'Expected <MAP> tag, found <' + element.tagName + '>.'
                )
            }
        }

        function init(element) {
            if (element) {
                chkMap(element);
                scaleImageMap.call(element);
                maps.push(element)
            }
        }

        var maps;

        return function imageMapResizeF(target) {
            maps = []; // Only return maps from this call

            switch (typeof target) {
                case 'undefined':
                case 'string':
                    Array.prototype.forEach.call(
                        document.querySelectorAll(target || 'map'),
                        init
                    );
                    break;
                case 'object':
                    init(target);
                    break;
                default:
                    throw new TypeError('Unexpected data type (' + typeof target + ').')
            }

            return maps
        }
    }

    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(); //Node for browserfy
    } else {
        window.imageMapResize = factory()
    }

    if ('jQuery' in window) {
        window.jQuery.fn.imageMapResize = function $imageMapResizeF() {
            return this.filter('map')
                .each(scaleImageMap)
                .end()
        }
    }
})();

/*
*
* const subBranchMapArea = {
 'aboutus':'<area class="subBranchMap" alt="The Team" title="The Team" href="https://www.google.com" coords="1955,1581,1985,1501,2091,1425,2121,1388,2274,1360,2334,1375,2358,1417,2341,1447,2311,1509,2208,1477,2017,1573" shape="poly"> <area class="subBranchMap" alt="Collaboration" title="Collaboration" href="" coords="1992,1605,2099,1623,2148,1667,2260,1687,2319,1722,2381,1694,2435,1697,2465,1670,2524,1642,2532,1603,2269,1568,2123,1558,2062,1566" shape="poly"> <area class="subBranchMap" alt="Special thanks" title="Special thanks" href="" coords="1982,1613,2067,1645,2074,1680,2121,1707,2190,1722,2237,1741,2304,1769,2391,1813,2475,1848,2551,1892,2539,1944,2522,1994,2467,2008,2373,1910,2272,1939,2232,1867,2146,1813,2089,1820,2057,1749,1987,1717" shape="poly">',
 '':'',
 '':'',
 '':'',
 '':'',
 '':'',
 };


 function showBranch(branchID) {

 if (branchID != currentBranch){
 $("img#"+branchID).fadeIn("fast");
 $("img#"+currentBranch).fadeOut("fast");
 currentBranch = branchID;
 $("area.subBranchMap").remove();
 if(branchID != "none"){
 $("map[name='trunk-map']").prepend(subBranchMapArea["aboutus"]);
 }
 console.log(subBranchMapArea[branchID]);
 $("map").imageMapResize();
 }
 }*/