<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collecting form data
    $name = ucfirst($_POST['name']);
    $mobile = ($_POST['mobile']);
    $email = ($_POST['email']);
    $passport = ($_POST['passport']);
    $level = ucfirst($_POST['level']);
    $country_to_study = ucfirst($_POST['country-to-study']);

    // Prepare email headers for the recipient
    $to = "Universalabroadstudies@gmail.com";
    $subject = "New Form Submission";
    $headers = "From: no-reply@Universalabroadstudies.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Prepare email body for the recipient
    $message = "
        <html>
        <head>
            <title>New Form Submission</title>
        </head>
        <body>
            <img src='https://universalabroadstudy.com/assets/IMG_1880.PNG' alt='UAS Logo' style='width:150px;height:auto;'>
            <h2>New Form Submission From Website</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Mobile No:</strong> $mobile</p>
            <p><strong>Email Address:</strong> $email</p>
            <p><strong>Passport Number:</strong> $passport</p>
            <p><strong>Level of Study:</strong> $level</p>
            <p><strong>Preferred Country to Study:</strong> $country_to_study</p>
        </body>
        </html>
    ";

    // Prepare email headers for the user
    $userSubject = "Application Received";
    $userHeaders = "From: universalabroadstudies@gmail.com\r\n";
    $userHeaders .= "Reply-To: Universalabroadstudies@gmail.com\r\n";
    $userHeaders .= "MIME-Version: 1.0\r\n";
    $userHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    $userHeaders .= "X-Mailer: PHP/" . phpversion();

    // Prepare email body for the user
    $userMessage = "
        <html>
        <head>
            <title>Application Received</title>
        </head>
        <body>
            <img src='https://universalabroadstudy.com/assets/IMG_1880.PNG' alt='UAS logo' style='width:250px;height:auto;'>
            <h2>Thank you for your submission</h2>
            <p>Dear <strong> $name </strong>,</p>
            <p>We have received your application. We will contact you shortly.</p>
            <p>Best regards,</p>
            <p>Universal Abroad Studies</p>
        </body>
        </html>
    ";

    // Send both emails and check if they were sent successfully
    $recipientMailSent = mail($to, $subject, $message, $headers);
    $userMailSent = mail($email, $userSubject, $userMessage, $userHeaders);

    // Display success or failure alert and redirect to the previous page
    if ($recipientMailSent && $userMailSent) {
        echo "<script>
                alert('Submitted Successfully');
                window.location.href = document.referrer;
              </script>";
    } else {
        echo "<script>
                alert('Failed to Submit');
                window.location.href = document.referrer;
              </script>";
    }
} else {
    echo "Invalid request.";
}
