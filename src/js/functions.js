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
        $("map").imageMapResize();
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
    function showBranch(branchID) {
        if (branchID != currentBranch){
            $("img#"+branchID).fadeIn("fast");//.css('z-index', "200");
            $("img#"+currentBranch).fadeOut("fast");
            currentBranch = branchID;
        }
    }

});