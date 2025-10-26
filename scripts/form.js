function submitForm() {
    var form = document.getElementById("feedbackForm");
    const formData = new FormData(form);
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    else{
        form.reset();
    }
}