$(document).ready(function () {
    var list_banner = [];
    var list_slide_menu = [];
    var slide_timer = [];
    $(".slide_menu").each(function () {
        var id_slide_menu = $(this).attr("id");
        list_slide_menu.push(id_slide_menu);
        slide_timer.push(0);
    });
    var i = 0;
    $(".banner_slide").each(function () {
        var id_banner = $(this).attr("id");
        list_banner.push(id_banner);
        var index = Math.floor(Math.random() * ($("#" + id_banner + " ul li").last().index() + 1));
        banner_slide_start(index, i, list_banner, list_slide_menu, slide_timer);
        var slide_last = $("#" + id_banner + " ul li").last().index()

            // prev slide
            $("#" + list_slide_menu[i] + " .slide_prev").click(function () {
                var id = $(".slide_prev").index(this);
                var slide_menu_num = $("#" + list_slide_menu[id] + " ul li.current").index();
                if (slide_menu_num <= 0) {
                    slide_menu_num = slide_last;
                } else {
                    slide_menu_num--;
                }
                clearInterval(slide_timer[id]);
                $("#" + list_banner[id] + " ul li").removeClass("banner_slide_show");
                $("#" + list_slide_menu[id] + " ul li").removeClass("current");
                banner_slide_start(slide_menu_num, id, list_banner, list_slide_menu, slide_timer);
            });

            // click dot slide
            $("#" + list_slide_menu[i] + " ul li").click(function(){
                var slide_menu_num = $(this).index();
                var id_slide_menu = $(this).closest(".slide_menu").attr("id");
                var slide_menu = $("#" + id_slide_menu);
                var id = slide_menu.index(".slide_menu");
                clearInterval(slide_timer[id]);
                $("#" + list_banner[id] + " ul li").removeClass("banner_slide_show");
                $("#" + list_slide_menu[id] + " ul li").removeClass("current");
                banner_slide_start(slide_menu_num, id, list_banner, list_slide_menu, slide_timer);
            });

            // next slide
            $("#" + list_slide_menu[i] + " .slide_next").click(function () {
                var id = $(".slide_next").index(this);
                var slide_menu_num = $("#" + list_slide_menu[id] + " ul li.current").index();
                if (slide_menu_num >= slide_last) {
                    slide_menu_num = 0;
                } else {
                    slide_menu_num++;
                }
                clearInterval(slide_timer[id]);
                $("#" + list_banner[id] + " ul li").removeClass("banner_slide_show");
                $("#" + list_slide_menu[id] + " ul li").removeClass("current");
                banner_slide_start(slide_menu_num, id, list_banner, list_slide_menu, slide_timer);
            });
            i++;
        });
});

function banner_slide_start(start_num, id, list_banner, list_slide_menu, slide_timer) {
    var slide_img_length = $("#" + list_banner[id] + " ul li").length;
    $("#" + list_banner[id] + " ul li:eq(" + start_num + ")").addClass("banner_slide_show");
    $("#" + list_slide_menu[id] + " ul li:eq(" + start_num + ")").addClass("current");
    if (slide_timer[id]) {
        clearInterval(slide_timer[id]);
        slide_timer[id] = 0;
    }
    slide_timer[id] = setInterval(function () {
        if (start_num == slide_img_length - 1) {
            start_num = 0;
        } else {
            start_num++;
        }
        $("#" + list_banner[id] + " ul li:eq(" + start_num + ")").addClass("banner_slide_show");
        $("#" + list_slide_menu[id] + " ul li:eq(" + start_num + ")").addClass("current");
        $("#" + list_banner[id] + " ul li:eq(" + start_num + ")").siblings().removeClass("banner_slide_show");
        $("#" + list_slide_menu[id] + " ul li:eq(" + start_num + ")").siblings().removeClass("current");
        }, 6000); //6s
}