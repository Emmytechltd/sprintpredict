$(function() {

    $("#to_plans").click(function() {
        $('html,body').animate({
            scrollTop: $("#packages").offset().top
        }, 'slow');
    });
    $('.dataTable').DataTable();

});

function contactus() {

    $.confirm({
        title: 'Proceed to send your message?',
        content: "You can't reverse this action",
        buttons: {
            cancel: {
                text: 'Cancel',
                btnClass: 'btn btn-default'
            },
            confirm: {
                text: "Send",
                btnClass: 'btn btn-warning',
                action: function() {
                    sendMessage();
                }
            }
        }
    });
}

function sendMessage() {
    $("#contactNotice").html('');

    var name = $("#txtName").val();
    var email = $("#txtContactEmail").val();
    var subject = $("#txtSubject").val();
    var message = $("#txtMessage").val();

    var fd = new FormData();

    fd.append("name", name);
    fd.append("email", email);
    fd.append("subject", subject);
    fd.append("message", message);
    $('#contactform').preloader();
    $.ajax({
        url: "contact/send",
        data: fd,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data) {
            $('#contactform').preloader('remove');
            $("#contactNotice").html(data);
            $('html,body').animate({
                scrollTop: $("#contactNotice").offset().top
            }, 'slow');
            $("#txtName").val("");
            $("#txtContactEmail").val("");
            $("#txtSubject").val("");
            $("#txtMessage").val("");
        },
        error: function(xhr, status, error) {
            $('#contactform').preloader('remove');
            $.alert({
                title: 'Error!',
                content: 'Could not complete the process. ' + error
            });
        }
    });
}

function subscribe() {
    $.confirm({
        title: 'Proceed to subscribe to updates?',
        content: "You can't reverse this action",
        buttons: {
            cancel: {
                text: 'Cancel',
                btnClass: 'btn btn-default'
            },
            confirm: {
                text: "Subscribe",
                btnClass: 'btn btn-warning',
                action: function() {
                    subscribeUser();
                }
            }
        }
    });
}

function subscribeUser() {
    var name = $("#txtSubscriberName").val();
    var email = $("#txtSubscriberEmail").val();


    var fd = new FormData();

    fd.append("name", name);
    fd.append("email", email);

    $('#subscribeform').preloader();
    $.ajax({
        url: "/registrar/subscribe",
        data: fd,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(result) {
            $('#subscribeform').preloader('remove');
            var resultObj = JSON.parse(result);
            if (resultObj['status'] === "success") {
                $.alert({
                    title: 'Success',
                    content: 'You have successfully subscribed to updates'
                });
                $("#txtSubscriberName").val("");
                $("#txtSubscriberEmail").val("");
            } else {
                $.alert({
                    title: 'Success',
                    content: resultObj['message']
                });
            }

        },
        error: function(xhr, status, error) {
            $('#subscribeform').preloader('remove');
            $.alert({
                title: 'Error!',
                content: 'Could not complete the process. ' + error
            });
        }
    });
}

function copyAddress() {
    /* Get the text field */
    var copyText = document.getElementById("acc_num");

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    $.alert("Copying successful");
}