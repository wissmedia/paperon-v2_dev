// Pop Up Modal Add di halaman Setup.
$(document).ready(function () {
    $("#add").click(function () {
        $("#modalAddQuestion").show();
        $("#modalAddQuestion .modal-content").slideDown();
    });
});

// Hide Modal saat klik close
$(document).ready(function () {
    $(".close").click(function () {
        $("#modalAddQuestion").fadeOut();
        $("#modalAddQuestion .modal-content").slideUp();
    });
});

// Hide Modal saat klik diluar
window.onclick = function (event) {
    modalAdd = document.getElementById("modalAddQuestion");

    modalMenu = document.getElementById("modalMenuAkun");

    modalPertanyaan = document.getElementById("modalPilihPertanyaan");

    if (event.target == modalAdd) {
        modalAdd.style.display = "none";
        $("#modalAddQuestion .modal-content").slideUp();
    } else if (event.target == modalMenu) {
        modalMenu.style.display = "none";
        $("#modalMenuAkun .modal-content").slideUp();
    } else if (event.target == modalPertanyaan) {
        modalPertanyaan.style.display = "none";
        $("#modalPilihPertanyaan .modal-content").slideUp();
    }
}

// Hide Pop Up menu saat klik outside content
$(document).mouseup(function (e) {
    var container = $(".add-list");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

// Tambah Pertanyaan
$(document).ready(function () {
    // Jawab Singkat
    $("#jawabSingkat").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addjawabSingkat">
                    <div class="content" id="addjawabSingkat">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                            <input type="hidden" name="tipe" value="shortText">
                            <p>Pertanyaan dengan jawaban singkat</p>
                            <input type="text" name="body" id="tanya" class="text tanya" placeholder="Masukan pertanyaan jawaban singkat" required>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Jawab Panjang
    $("#jawabPanjang").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addjawabPanjang">
                    <div class="content" id="addjawabPanjang">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="longText">
                            <p>Pertanyaan dengan jawaban panjang</p>
                            <input type="text" name="body" id="tanyapanjang" class="text" placeholder="Masukan pertanyaan jawaban panjang" required>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Pilihan Ganda
    $("#pilihanGanda").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addpilihanGanda">
                    <div class="content" id="addPilihanGanda">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="radio">
                        <input type="hidden" name="useOpsi" value="on">
                            <p>Pertanyaan dengan 1 pilihan jawaban</p>
                            <input type="text" name="body" id="pilihanganda" class="text" placeholder="Masukan pertanyaan pilihan ganda" required>
                            
                            <div class="edit-group setInput">
                                <input type="radio" name="pilih" id="pilih1" disabled>
                                <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi disini" required>
                            </div>
                            
                            <div class="edit-group addInput">
                                <input type="radio" name="pilih" id="pilih1" disabled>
                                <input type="text" class="text addOpsi" placeholder="Tambah opsi">
                                
                            </div>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Tambahkan Lainnya</label></span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Kisi Pilihan Ganda
    $("#kisiPilihanGanda").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addkisipilihanGanda">
                    <div class="content" id="addkisipilihanGanda">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="radioGrid">
                        <input type="hidden" name="useOpsi" value="on">
                            <p>Pertanyaan dengan 1 pilihan berbentuk baris dan kolom</p>
                            <input type="text" name="body" id="pilihanganda" class="text" placeholder="Masukan pertanyaan kisi pilihan ganda">
                            <div class="baris">
                                <label for="">Baris</label>
                                <div class="edit-group setInput">
                                    <input type="radio" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi baris disini">
                                    <button class="del"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="edit-group addInput">
                                    <input type="radio" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" class="text addOpsi" placeholder="Tambah baris">
                                </div>
                            </div>
                            <div class="kolom">
                                <label for="">Kolom</label>
                                <div class="edit-group setInput">
                                    <input type="radio" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi kolom disini">
                                    <button class="del"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="edit-group addInput">
                                    <input type="radio" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" class="text addOpsi" placeholder="Tambah kolom">
                                </div>
                            </div>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Kotak Centang
    $("#kotakCentang").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addkotakCentang">
                    <div class="content" id="addkotakCentang">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="checkBox">
                        <input type="hidden" name="useOpsi" value="on">
                            <p>Pertanyaan dengan banyak pilihan</p>
                            <input type="text" name="body" id="pilihanganda" class="text" placeholder="Masukan pertanyaan pilihan kotak centang" required>
                                
                            <div class="edit-group setInput">
                                <input type="checkbox" name="pilih" id="pilih1" disabled>
                                <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi disini" required>
                                <button class="del"><i class="fas fa-times"></i></button>
                            </div>

                            <div class="edit-group addInput">
                                <input type="checkbox" name="pilih" id="pilih1" disabled>
                                <input type="text" class="text addOpsiCheck" placeholder="Tambah opsi">
                                
                            </div>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Petak Kotak Centang
    $("#petakKotakCentang").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addpetakkotakCentang">
                    <div class="content" id="addpetakkotakCentang">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="checkGrid">
                        <input type="hidden" name="useOpsi" value="on">
                            <p>*Pertanyaan Pilihan Kotak centang v2</p>
                            <input type="text" name="pilihanganda" id="pilihanganda" class="text" placeholder="Masukan pertanyaan pilihan kotak centang">
                            <div class="baris">
                                <label for="">Baris</label>
                                <div class="edit-group setInput">
                                    <input type="checkbox" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" id="opsi" class="text" placeholder="Text ...">
                                    <button class="del"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="edit-group addInput">
                                    <input type="checkbox" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" class="text addOpsiCheck" placeholder="Tambah baris">
                                </div>
                            </div>
                            <div class="kolom">
                                <label for="">Kolom</label>
                                <div class="edit-group setInput">
                                    <input type="checkbox" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" id="opsi" class="text" placeholder="Text ...">
                                    <button class="del"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="edit-group addInput">
                                    <input type="checkbox" name="pilih" id="pilih1" disabled>
                                    <input type="text" name="opsi" class="text addOpsiCheck" placeholder="Tambah kolom">
                                </div>
                            </div>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Daftar Pilihan
    $("#dropDown").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="adddropDown">
                    <div class="content" id="adddropDown">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="dropDown">
                        <input type="hidden" name="useOpsi" value="on">
                            <p>Pertanyaan Pilihan Dropdown</p>
                            <input type="text" name="body" id="pilihdropdown" class="text" placeholder="Masukan pertanyaan daftar pilihan" required>
                                
                            <div class="edit-group setInput">
                                <span id="nomor" class="nomor">&#9672;</span>
                                <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi disini" required>
                                <button class="del"><i class="fas fa-times"></i></button>
                            </div>

                            <div class="edit-group addInput">
                                <span id="nomor">&#9672;</span>
                                <input type="text" class="text addOpsiDaftar" placeholder="Tambah opsi">
                            </div>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Tanggal
    $("#tanggal").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addTanggal">
                    <div class="content" id="addTanggal">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="date">
                            <p>Pertanyaan Tanggal</p>
                            <input type="text" name="body" id="tanya" class="text" placeholder="Masukan pertanyaan untuk jawaban tanggal" required>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Waktu
    $("#waktu").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addWaktu">
                    <div class="content" id="addWaktu">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="time">
                            <p>Pertanyaan Waktu</p>
                            <input type="text" name="body" id="tanya" class="text" placeholder="Masukan pertanyaan untuk jawaban waktu" required>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });

    // Skala Linear
    $("#skalaLinear").click(function () {
        let cek = $(".content");
        if (cek.length > 0) {
            alert("Complete the question before adding more question");
        } else {
            $(".setup").append(`
                <div class="addskalaLinier">
                    <div class="content" id="addskalaLinier">
                        <div class="line"></div>
                        <div class="bungkus-content edit">
                        <input type="hidden" name="tipe" value="linearScale">
                            <p>Pertanyaan Skala Linier</p>
                            <input type="text" name="body" class="text" placeholder="Masukan pertanyaan untuk jawaban dengan skala" required>
                            <select name="sl" class="dropdown ddA">
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>

                            <span>sampai</span>

                            <select name="sl" class="dropdown ddB">
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <div class="label-skala">
                                <span id="skala-a" class="skala-a">0</span>
                                <input type="text" name="label" class="" placeholder="Label (optional)">
                            </div>
                            <div class="label-skala">
                                <span id="skala-b" class="skala-b">10</span>
                                <input type="text" name="label" class="" placeholder="Label (optional)">
                            </div>

                            <div class="control-edit">
                                <button class="remove" type="button"><i class="fas fa-trash"></i></button>
                                <span class="divider">|</span>
                                <span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Wajib diisi</label></span>
                            </div>
                        </div>
                    </div>
                    <center><button class="tombol-md tmb-utama bunder fadeInBawah">Simpan</button></center>
                </div>
            `).hide().fadeIn();

            // Hide Pop Up Menu Add setelah pilih
            $("#modalAddQuestion").fadeOut();
            $("#modalAddQuestion .modal-content").slideUp();

            // Hide Info Content setelah add question
            $(".info-content").hide().fadeOut();
        }
    });
});

// Hapus Pertanyaan
$(document).ready(function () {
    $("body").on("click", ".remove", function () {
        $(this).parents(".addjawabSingkat").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addjawabPanjang").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addpilihanGanda").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addkisipilihanGanda").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addkotakCentang").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addpetakkotakCentang").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".adddropDown").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addTanggal").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addWaktu").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".addskalaLinier").fadeOut(function () {
            $(this).remove();
        });
        $(".info-content").show().fadeIn();
    });
});

// Copy Pertanyaan
$(document).ready(function () {
    $("body").on("click", ".copy", function () {
        $(this).parents(".addjawabSingkat").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addjawabPanjang").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addpilihanGanda").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addkisipilihanGanda").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addkotakCentang").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addpetakkotakCentang").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".adddropDown").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addTanggal").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addWaktu").clone().appendTo(".setup").hide().fadeIn();
    });

    $("body").on("click", ".copy", function () {
        $(this).parents(".addskalaLinier").clone().appendTo(".setup").hide().fadeIn();

        // Belum sempurna saat copy ke dua
        $(".ddA option[value='" + $(".ddA").val() + "'] , .ddB option[value='" + $(".ddB").val() + "']").attr("selected", "selected");
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

// Insert Text Input
$(document).ready(function () {
    // Input with radio
    $("body").on("click", ".addOpsi", function () {
        $(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="radio" name="pilih" id="pilih1" disabled>
                <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi disini" required>
                <button class="del"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    $("body").on("click", ".addLain-radio", function () {
        $(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="radio" name="pilih" id="pilih1" disabled>
                <div class="label">Lainnya :</div>
                <input type="text" name="opsi" id="opsi" class="text lainnya">
                <button class="del"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    // Input with checkbox
    $("body").on("click", ".addOpsiCheck", function () {
        $(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="checkbox" name="pilih" id="pilih1" disabled>
                <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi disini" required>
                <button class="del"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    $("body").on("click", ".addLain-check", function () {
        $(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="checkbox" name="pilih" id="pilih1" disabled>
                <div class="label">Lainnya :</div>
                <input type="text" name="opsi" id="opsi" class="text lainnya">
                <button class="del"><i class="fas fa-times"></i></button>
            </div>
        `);
    });

    // Input with number
    $("body").on("click", ".addOpsiDaftar", function () {
        $(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <span id="nomor" class="nomor">&#9672;</span>
                <input type="text" name="opsi" id="opsi" class="text" placeholder="Ketik opsi disini" required>
                <button class="del"><i class="fas fa-times"></i></button>
            </div>
        `);
    });
});

// Add Attribute ID on wajib isi checkbox
$(document).ready(function () {
    $("body").on("click", ".wajiblabel", function () {

        if ($(this).prev().is(":checked")) {
            $(this).prev().prop("checked", false);
        } else {
            $(this).prev().prop("checked", true);
        }
    });

});

// Onchange Dropdown Skala Linear
$(document).ready(function () {
    $("body").on("change", ".ddA", function () {
        let va = $(this).val();
        console.log(va);
        $(this).parents(".bungkus-content").find(".skala-a").text(va);
    });

    $("body").on("change", ".ddB", function () {
        let va = $(this).val();
        console.log(va);
        $(this).parents(".bungkus-content").find(".skala-b").text(va);
    });
});