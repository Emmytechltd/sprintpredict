if (self != top) {
    top.location.href = self.location.href;
}
$.fn.animateBG = function(x, y, speed, def) {
    var pos = this.css('background-position').split(' ');
    this.x = 0, this.y = def;
    $.Animation(this, {
        x: x,
        y: y
    }, {
        duration: speed
    }).progress(function(e) {
        this.css('background-position', e.tweens[0].now + 'px ' + e.tweens[1].now + 'px');
    });
    return this;
}
$(document).ready(function() {
    var det_mobile = 0;
    if ($("button.collapse").css("display") == "block") {
        det_mobile = 1;
    }
    $(".general-fade").hide();
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    $(window).resize(function() {
        if ($("button.collapse").css("display") == "none") {
            done = 0;
            det_mobile = 0;
            $(".top-nav-wrapper ul.main-menu").show();
        }
        if ($("button.collapse").css("display") == "block") {
            det_mobile = 1;
            if (done == 0) {
                done = 1;
                $(".top-nav-wrapper ul.main-menu").hide();
            }
        }
    });
    $(".header-wrapper .collapse").click(function() {
        $(".top-nav-wrapper ul.main-menu").slideToggle();
    });
    $(".top-nav-wrapper .toggle-mega").click(function() {
        $(".top-nav-wrapper .cat-megamenu").slideToggle();
    })
    $(".top-nav-wrapper .cat-megamenu-list").hover(function() {
        if (det_mobile == 0) {
            $(".top-nav-wrapper .cat-megamenu").show("fold");
        }
    }, function() {
        if (det_mobile == 0) {
            $(".top-nav-wrapper .cat-megamenu").hide();
        }
    });
    $('a.nav_top').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function() {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
    $(".newsletter").submit(function(e) {
        e.preventDefault();
        var formdata = new FormData(this);
        $(".general-fade").show();
        var page_url = $(this).attr("action");
        $.ajax({
            url: page_url,
            type: "POST",
            data: formdata,
            mimeTypes: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                $(".general-result").html(data);
                $(".general-fade").hide();
            },
            error: function() {
                alert("Error occured!");
            }
        });
    });
});

function my_confirm(conf_title, conf_text, conf_link) {
    swal({
        title: conf_title,
        text: conf_text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function(isConfirm) {
        if (isConfirm) {
            location.href = conf_link;
        } else {
            return false;
        }
    });
}

function toggle_note() {
    if ($(".blink").css("visibility") == "visible") {
        $(".blink").css({
            "visibility": "hidden"
        });
    } else {
        $(".blink").css({
            "visibility": "visible"
        });
    }
}
setInterval("toggle_note()", 600);