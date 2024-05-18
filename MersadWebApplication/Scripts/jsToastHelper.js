function CreateToast(str) {
    return '<div id="MessageToast" class="toast" data-animation="true" data-delay="3500" data-autohide="true" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header inner-addon"><strong class="mr-auto">پیام سیستم</strong><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body">' + str + '</div></div>';
}

function CloseToast() {
    $('.toast').toast('hide');
}