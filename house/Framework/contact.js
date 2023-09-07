function sendEmail() {

    const name = document.getElementById("name").value;
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value;
    const email = document.getElementById("email").value;

    // Encode the subject and message for the mailto URL
    const subject = encodeURIComponent(topic);
    const body = encodeURIComponent(message);

    // Generate the mailto link
    const mailtoLink = `mailto:alzhang@princeton.edu?subject=${subject}&body=${body}`;

    // Open the user's default email client with the mailto link
    window.location.href = mailtoLink;
}