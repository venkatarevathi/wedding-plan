function validatePassword() {
    const password = document.querySelector('input[name="password"]');
    const confirmPassword = document.querySelector('input[name="confirm_password"]');
    const errorMessage = document.getElementById('error-message');
    
    if (password.value !== confirmPassword.value) {
    errorMessage.textContent = "Passwords do not match!";
    return false;
    } else {
    errorMessage.textContent = "";
    return true;
    }
}
    