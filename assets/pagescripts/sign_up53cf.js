$(function() {

});

function signUp() {
    $("#signupNotice").html('');

    var password = $("#txtSUPassword").val();
    var password2 = $("#txtSUPassword2").val();


    if (password !== password2) {
        var message = "<div class = 'alert alert-danger'>" +
            "<a href = '#' class = 'close' data-dismiss = 'alert'>&times;</a>" +
            "<strong>Error! </strong> Passwords do not match" +
            "</div>";
        $("#signupNotice").html(message);
    } else {
        $("#signupNotice").html('');
        var username = $("#txtSUUsername").val();
        var firstname = $("#txtSUFName").val();
        var lastname = $("#txtSULName").val();
        var email = $("#txtSUEmail").val();
        var country = $("#optSUCountry").val();
        var phone = $("#txtSUPhone").val();

        var signUpUrl = "http://localhost/zeropoint/brilliantpredict.com/controllers/register.php";

        var fd = new FormData();
        fd.append("username", username);
        fd.append("firstname", firstname);
        fd.append("lastname", lastname);
        fd.append("email", email);
        fd.append("phone_number", phone);
        fd.append("country", country);
        fd.append("password", password);
        //
        $('#frmSignUp').preloader();
        $.ajax({
            contentType: false,
            processData: false,
            type: 'POST',
            url: signUpUrl,
            data: fd,
            success: function(result) {
                $('#frmSignUp').preloader('remove');
                var resultObj = JSON.parse(result);
                if (resultObj['status'] === "success") {
                    location.reload();
                } else {
                    $("#signupNotice").html(resultObj['message']);
                }
            },
            error: function(xhr, status, error) {
                $('#frmSignUp').preloader('remove');
                $("#signupNotice").html(error);

            }
        });

    }

}