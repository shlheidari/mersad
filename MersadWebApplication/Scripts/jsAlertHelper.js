function ErrorMessages(str)
{
    return "<div id='myClose' class='alert alert-danger alert-dismissible fade show'><i class='fa fa-exclamation-circle fa-2x'></i><button click='closp()' type='button' class='btn-close' data-dismiss='alert' aria-label='Close'></button>" + str + "</div>";
}
function SuccessMessages(str)
{
    return "<div class='alert alert-success alert-dismissible fade show'><i class='fa fa-check-circle fa-2x'></i><button type='button' class='btn-close' data-dismiss='alert' aria-label='Close'></button>" + str + "</div>";
}
function WarningMessages(str)
{
    return "<div class='alert alert-warning alert-dismissible fade show'><i class='fa fa-exclamation-triangle fa-2x'></i><button type='button' class='btn-close' data-dismiss='alert' aria-label='Close'></button>" + str + "</div>";
}