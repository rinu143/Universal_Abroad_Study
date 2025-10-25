<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'lib/PHPMailer-master/src/Exception.php';
require 'lib/PHPMailer-master/src/PHPMailer.php';
require 'lib/PHPMailer-master/src/SMTP.php';
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // reCAPTCHA verification
    $recaptcha_secret = '6LeotPUrAAAAAIV8dYI8lMRcxk8Zv8c6pfN3tfkj';
    $recaptcha_response = $_POST['recaptcha_response'];
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptcha_data),
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($recaptcha_url, false, $context);
    $result_json = json_decode($result, true);

    if (!$result_json['success'] || $result_json['score'] < 0.5) {
        echo "<script>
                alert('Failed to verify reCAPTCHA. Please try again.');
                window.location.href = document.referrer;
              </script>";
        exit;
    }

    // Honeypot check
    if (!empty($_POST['honeypot'])) {
        // Silently exit
        exit;
    }

    // Sanitize and validate inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $mobile = htmlspecialchars(trim($_POST['mobile']));
    $email = htmlspecialchars(trim($_POST['email']));
    $passport = htmlspecialchars(trim($_POST['passport']));
    $level = htmlspecialchars(trim($_POST['level']));
    $country_to_study = htmlspecialchars(trim($_POST['country-to-study']));

    $errors = [];

    // Name validation
    if (strlen($name) < 2 || strlen($name) > 50) {
        $errors[] = "Name must be between 2 and 50 characters.";
    }
    if (!preg_match('/^[a-zA-Z\s]+$/', $name)) {
        $errors[] = "Name can only contain letters and spaces.";
    }
    if (preg_match('/(.)\1{2,}/', $name)) {
        $errors[] = "Name contains gibberish patterns.";
    }

    // Mobile validation
    if (!preg_match('/^[+\d()\s-]{10,15}$/', $mobile)) {
        $errors[] = "Invalid mobile number.";
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email address.";
    } else {
        $domain = substr(strrchr($email, "@"), 1);
        if (in_array($domain, ['mailinator.com', 'temp-mail.org', '10minutemail.com'])) {
            $errors[] = "Disposable email addresses are not allowed.";
        }
    }

    // Passport validation
    if (!empty($passport) && !preg_match('/^[a-zA-Z0-9]{6,12}$/', $passport)) {
        $errors[] = "Invalid passport number.";
    }

    if (!empty($errors)) {
        echo "<script>
                alert('Error: " . implode("\n", $errors) . "');
                window.location.href = document.referrer;
              </script>";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        // Please replace the following with your SMTP credentials
        $mail->Host       = SMTP_HOST; // Your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME; // Your SMTP username
        $mail->Password   = SMTP_PASSWORD; // Your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = SMTP_PORT; // Or 465 for SSL

        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME); // This should be the same as your SMTP username
        $mail->addAddress('Universalabroadstudies@gmail.com', 'Admin');     // Add a recipient
        $mail->addReplyTo($email, $name);

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'New Form Submission';
        $mail->Body    = "
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
                <p><strong>Submission Time:</strong> " . date('Y-m-d H:i:s') . "</p>
            </body>
            </html>
        ";

        $mail->send();

        // Send confirmation email to the user
        $mail->clearAddresses();
        $mail->clearReplyTos();
        $mail->addAddress($email, $name);
        $mail->setFrom('from@example.com', 'Universal Abroad Studies'); // This should be the same as your SMTP username
        $mail->Subject = 'Application Received';
        $mail->Body    = "
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

        $mail->send();

        echo "<script>
                alert('Submitted Successfully');
                window.location.href = document.referrer;
              </script>";

    } catch (Exception $e) {
        echo "<script>
                alert('Failed to Submit. Mailer Error: {" . $mail->ErrorInfo . "}');
                window.location.href = document.referrer;
              </script>";
    }
} else {
    echo "Invalid request.";
}
?>
