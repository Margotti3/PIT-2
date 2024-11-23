$("#login-form").submit((e) => {
    e.preventDefault();

    const email = $("#login-form input[name=email]").val();
    const password = $("#login-form input[name=password]").val();
    
    login(email, password);
});