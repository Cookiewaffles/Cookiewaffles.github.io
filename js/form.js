function sendEmail(){
    const templateParams = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value,
    };
    
    try {
        emailjs.send('service_sbselb1', 'template_1j5xc5j', templateParams)
        alert('Email sent successfully');
    } catch (error) {
        alert("Error Occured: " + error);
    }
}