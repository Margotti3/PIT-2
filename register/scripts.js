$("#register-form").submit((e) => {
    e.preventDefault();

    const name = $("#register-form input[name=name]").val();
    const email = $("#register-form input[name=email]").val();
    const password = $("#register-form input[name=password]").val();
    
    register(name, email, password);
});