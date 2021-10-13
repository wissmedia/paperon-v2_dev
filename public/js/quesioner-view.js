// Tambahkan Lainnya Radio
$(document).ready(function () {
    $("body").on("click", ".addLain-radio", function () {
        $(this).parents(".addInput").before(`
            <p>
                <div class="setInput">
                    <input type="radio" name="pilih">
                    <label>
                        Lainnya :
                    </label>
                    <input type="text" id="input_other" name="opsi">
                    <button type="button" class="del btn-delInput"><i class="fas fa-times"></i></button>
                </div>
            </p>
        `);
    });
});

// Tambahkan Lainnya Checkbox
$(document).ready(function () {
    $("body").on("click", ".addLain-checkbox", function () {
        $(this).parents(".addInput").before(`
            <p>
                <div class="setInput">
                    <input type="checkbox" name="pilih">
                    <label>
                        Lainnya :
                    </label>
                    <input type="text" id="input_other" name="opsi">
                    <button type="button" class="del btn-delInput"><i class="fas fa-times"></i></button>
                </div>
            </p>
        `);
    });
});

// Delete Text Input
$(document).ready(function () {
    $("body").on("click", ".del", function () {
        $(this).parents(".setInput").fadeOut(function () {
            $(this).remove();
        });
    });
});

//Reset
$(document).ready(function () {
    $(".buttonReset").click(function () {
        $(this).parents(".bungkus-content").find("input:radio, input:checkbox").prop("checked", false);
        $(this).parents(".bungkus-content").find("button").attr("disabled", "disabled").addClass("disabled");
    });
});

// Disable Button Reset
$(document).ready(function () {
    let cek = $(".content").find("input:radio, input:checkbox");
    if (cek.prop("checked") == false) {
        $("button").attr("disabled", "disabled").addClass("disabled");
    }
});

// Enable Button Reset
$(document).ready(function () {
    $("input:radio, input:checkbox").click(function () {
        $(this).parents(".bungkus-content").find("button").removeAttr("disabled").removeClass("disabled");
    });
});