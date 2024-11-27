$(document).ready(() => {
    $("#edit-form input[name=name]").val(userData.name);
    $("#edit-form input[name=email]").val(userData.email);
    $("#edit-form input[name=password]").val(userData.pass);
});

$("#edit-form").submit((e) => {
    e.preventDefault();

    const name = $("#edit-form input[name=name]").val();
    const email = $("#edit-form input[name=email]").val();
    const password = $("#edit-form input[name=password]").val();
    
    edit(name, email, password);
});