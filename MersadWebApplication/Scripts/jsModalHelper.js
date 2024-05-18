function CreateModal(str) {
    return "<div class='modal fade' id='MessageModal' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' style='padding-right: 20px'>پیام سیستم</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>" + str + "</p></div><div class='modal-footer'><button type='button' class='btn btn-outline-success' onclick='$('#MessageModal').modal('hide');' data-dismiss='modal'>متوجه شدم</button></div></div></div></div>";
}

function CloseMessageModal() {
    $('#MessageModal').modal("hide");
}