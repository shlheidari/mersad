document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        type: "POST",
        url: "/Moderator/Dashboard.aspx/GetFillMasterData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r != null) {
                if (r.d[0].IsSuccess !== "true") {
                    $("#lblMessage").html(CreateModal(r.d[0].Message));
                    $('#MessageModal').modal();
                    return false;
                }
                $('#spnToday').html(r.d[0].MessageTwo);
                $('#spnUsername').html(r.d[0].MessageThree);
                var getAdminDead = r.d[0].Message.split(",");
                $('#divInjuredCountDaily').html(getAdminDead[0]);
                $('#divDeadCountDaily').html(getAdminDead[1]);
                $('#divInjuredCountYearly').html(getAdminDead[2]);
                $('#divDeadCountYearly').html(getAdminDead[3]);
            }
            else {
                alert("خطا در برقراری ارتباط با سرور!");
            }
        },
        complete: function () {
        },
        error: function (response) { if (response.status == 401) location.reload(); },
        failure: function (response) {
            alert(response.d);
        }
    });
    var path = window.location.pathname;
    if (path.startsWith("/Moderator/")) $('#lnkUserInfo a').addClass("active");
    else if (path == "/Moderator/Event/AddAccident" || path == "/Moderator/Report/AccidentList") $('#lnkAccidentList a').addClass("active");
    else if (path.startsWith("/Moderator/Report")) $('#lnkCharts a').addClass("active");
    else if (path.startsWith("/Moderator/Map")) $('#lnkMaps a').addClass("active");
    else if (path == "/Moderator/Dashboard") $('#lnkDashboard a').addClass("active");
    var winWidth = $(window).width();
    if (winWidth < 1000 && winWidth > 300) {
        $(".admin-dead").css("right", (winWidth - 300) + "px");
        $("footer").css("left", (winWidth - 600) + "px");
        $("footer").css("right", "auto");
    }
}, false);
