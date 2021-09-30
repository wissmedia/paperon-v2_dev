// Show menu Akun
$(document).ready(function () {
    $("#user").click(function () {
        $("#modalMenuAkun").show();
        $("#modalMenuAkun .modal-content").slideDown();
    });
});

// Hide Modal saat klik close
$(document).ready(function () {
    $(".close").click(function () {
        $("#modalMenuAkun").fadeOut();
        $("#modalMenuAkun .modal-content").slideUp();
    });
});

// Show menu shortcut
$(document).ready(function () {
    $("#btnMenu").click(function () {
        let menu = $("#container-shortcut");
        if (menu.css("display") == "none") {
            $("#container-shortcut").slideDown();
        } else {
            $("#container-shortcut").slideUp();
        }

    });
});

// Hide Footer saat keyboard muncul (input focus)
$(document).ready(function () {
    $(".container").on("focus", "input:text", "textarea", function () {
        $("footer").attr("hidden", "hidden");
    });

    $(".container").on("blur", "input:text", "textarea", function () {
        $("footer").removeAttr("hidden");
    });
});

// Tampilkan menu User
function tampilMenu() {
    let show = document.getElementById("menuakun");
    if (show.style.display === "block") {
        show.style.display = "none";
    } else {
        show.style.display = "block";
    }
    console.log('sukses');
    return show;

}

// Responsive Menu Landing Page
function hamburger() {
    if ($("#menuNav").hasClass("menu-nav")) {
        $("#menuNav").addClass("responsive");
    } else if ($("#menuNav").hasClass("responsive")) {
        $("#menuNav").removeClass("responsive");
    }
}

// Disable Div
$(".pending").addClass("disabledbutton");