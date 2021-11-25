function signIn() {
    var password = $("#txtSIpassword").val();
    var username = $("#txtSIusername").val();



    var signInUrl = "/bouncer/sign_in";

    var fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);

    //
    $('#frmSignIn').preloader();

    $.ajax({
        contentType: false,
        processData: false,
        type: 'POST',
        url: signInUrl,
        data: fd,
        success: function(result) {
            $('#frmSignIn').preloader('remove');
            var resultObj = JSON.parse(result);
            if (resultObj['status'] === "success") {
                window.location = "/dashboard";
            } else {
                $.dialog({
                    title: 'Error!',
                    content: resultObj['message']
                });
            }
        },
        error: function(xhr, status, error) {
            $('#frmSignIn').preloader('remove');
            $.dialog({
                title: 'Error!',
                content: error
            });
        }
    });
}

function sendlink() {
    var email = $("#txtfEmail").val();
    var url = "/bouncer/sendlink";

    var fd = new FormData();
    fd.append("email", email);

    //
    $('#frmSend').preloader();
    $.ajax({
        contentType: false,
        processData: false,
        type: 'POST',
        url: url,
        data: fd,
        success: function(result) {
            $('#frmSend').preloader('remove');
            $.dialog({
                title: 'Status',
                content: result
            });
        },
        error: function(xhr, status, error) {
            $('#frmSend').preloader('remove');
            $.alert({
                title: 'Error!',
                content: 'Could not complete the process. ' + error
            });
        }
    });
}