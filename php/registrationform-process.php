<?php
$errorMSG = "";
// FIRST-NAME
if (empty($_POST["firstname"])) {
    $errorMSG = "First name is required ";
} else {
    $firstname = $_POST["firstname"];
}
// LAST-NAME
if (empty($_POST["lastname"])) {
    $errorMSG = "Last name is required ";
} else {
    $lastname = $_POST["lastname"];
}
// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}
// PHONE
if (empty($_POST["phone"])) {
    $errorMSG .= "Phone is required ";
} else {
    $phone = $_POST["phone"];
}
// COMPANY
if (empty($_POST["company"])) {
    $errorMSG .= "Company is required ";
} else {
    $company = $_POST["company"];
}

$EmailTo = "yourname@domain.com";
$Subject = "New message from Rose landing page registration form";
// prepare email body text
$Body = "";
$Body .= "First Name: ";
$Body .= $firstname;
$Body .= "\n";
$Body .= "Last Name: ";
$Body .= $lastname;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Company: ";
$Body .= $company;
$Body .= "\n";
// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);
// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>