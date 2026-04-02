// Initialize EmailJS with your public key
document.addEventListener("DOMContentLoaded", function () {

  const SERVICE_ID = "service_ufzsco7";
  const PUBLIC_KEY = "3kjcflucm07sIOi27";
  const TEMPLATE_ID = "template_rycgy2k";
  emailjs.init(PUBLIC_KEY);
  
  document.getElementById("submitBtn").addEventListener("click", handleFormSubmit);

  async function handleFormSubmit() {
    // --- Grab values ---
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const business = document.getElementById("business").value.trim();
    const fuelVolume = document.getElementById("fuelVolume").value;
    const message = document.getElementById("message").value.trim();

    // --- Validation ---
    clearErrors();
    let isValid = true;

    if (!name) {
      showError("nameError", "Name is required.");
      isValid = false;
    }

    if (!email) {
      showError("emailError", "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    if (phone && !isValidPhone(phone)) {
      showError("phoneError", "Please enter a valid phone number.");
      isValid = false;
    }

    if (!fuelVolume) {
      showError("volumeError", "Please select a monthly fuel volume.");
      isValid = false;
    }

    if (!isValid) return;

    // --- Send via EmailJS ---
    const submitBtn = document.getElementById("submitBtn"); // ← fixed, was using contactForm.querySelector
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const templateParams = {
      name: name,
      email: email,
      phone: phone || "Not provided",
      business: business || "Not provided",
      volume: fuelVolume,
      message: message || "No message provided",
    };

    try {
      await emailjs.send("SERVICE_ID", "TEMPLATE_ID", templateParams);
      showFormSuccess();
      document.getElementById("contactForm").reset(); // ← fixed, contactForm was not defined
    } catch (error) {
      console.error("EmailJS error:", error);
      showError("formError", "Something went wrong. Please try again or contact us directly.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Request a Free Quote →";
    }
  } // ← closes handleFormSubmit

  // --- Helpers ---
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
  }

  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.style.display = "block";
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
  }

  function showFormSuccess() {
    const successMsg = document.getElementById("formSuccess");
    if (successMsg) {
      successMsg.style.display = "block";
      setTimeout(() => (successMsg.style.display = "none"), 5000);
    }
  }

}); // ← closes DOMContentLoaded