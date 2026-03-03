const introText = document.getElementById("introText");
const overlay = document.getElementById("overlay");
const introSection = document.getElementById("intro");

// ⏱️ الانترو
setTimeout(() => {
  overlay.classList.add("bg-black/60", "backdrop-blur-md");
}, 9000);

setTimeout(() => {
  introText.classList.remove("opacity-0", "translate-y-16");
  introText.classList.add("opacity-100", "translate-y-0");
  introText.style.animation = "glow 2.5s ease-in-out infinite";
}, 9500);

setTimeout(() => {
  introSection.style.display = "none";
  introSection.style.opacity = "0";
  introSection.style.pointerEvents = "none";
  showMainContent();
}, 12000);

// ============================================
// ✅ AUTH BOX & CARD FUNCTIONALITY
// ============================================
const authBox = document.getElementById("authBox");
const card = document.getElementById("card");

/* Show card after intro */
function showMainContent() {
  setTimeout(() => {
    authBox.classList.add("visible");
    // Add subtle entrance animation
    card.style.animation = "cardEnter 0.8s ease-out";
  }, 500);
}

/* Switch between login and register */
function goRegister() {
  card.classList.add("flipped");
}

function goLogin() {
  card.classList.remove("flipped");
}

/* Toggle Password Visibility */
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

/* Register Function with Validation */
function register() {
  const rfname = document.getElementById("rfname").value.trim();
  const rlname = document.getElementById("rlname").value.trim();
  const remail = document.getElementById("remail").value.trim();
  const rpass = document.getElementById("rpass").value;
  const rpassConfirm = document.getElementById("rpassConfirm").value;
  const terms = document.getElementById("terms").checked;

  // Validation
  if (!rfname || !rlname) {
    showAlert("Please enter your first and last name", "error");
    return;
  }

  if (!remail || !isValidEmail(remail)) {
    showAlert("Please enter a valid email address", "error");
    return;
  }

  if (rpass.length < 8) {
    showAlert("Password must be at least 8 characters", "error");
    return;
  }

  if (rpass !== rpassConfirm) {
    showAlert("Passwords do not match", "error");
    return;
  }

  if (!terms) {
    showAlert("Please agree to the Terms & Conditions", "error");
    return;
  }

  // Save to localStorage
  localStorage.setItem(
    "User",
    JSON.stringify({
      firstName: rfname,
      lastName: rlname,
      email: remail,
      pass: rpass,
    }),
  );

  showAlert("Account created successfully! Please login.", "success");

  setTimeout(() => {
    goLogin();
    // Clear register form
    document.getElementById("rfname").value = "";
    document.getElementById("rlname").value = "";
    document.getElementById("remail").value = "";
    document.getElementById("rpass").value = "";
    document.getElementById("rpassConfirm").value = "";
    document.getElementById("terms").checked = false;
  }, 1500);
}

/* Login Function */
function login() {
  const lemail = document.getElementById("lemail").value.trim();
  const lpass = document.getElementById("lpass").value;

  if (!lemail || !lpass) {
    showAlert("Please enter email and password", "error");
    return;
  }

  const user = JSON.parse(localStorage.getItem("User"));

  if (!user) {
    showAlert("No account found. Please register first.", "error");
    setTimeout(goRegister, 1500);
    return;
  }

  if (lemail === user.email && lpass === user.pass) {
    showAlert(`Welcome back, ${user.firstName}! 🎉`, "success");
     window.location.href = "befhome.html";
    setTimeout(() => {
      //  window.location.href = "home.html";
      console.log("Redirecting to home...");
    }, 2000);
  } else {
    showAlert("Wrong email or password", "error");
    // Shake animation for wrong password
    const form = document.querySelector(".login-form .form");
    form.style.animation = "none";
    setTimeout(() => {
      form.style.animation = "shake 0.5s ease";
    }, 10);
  }
}

/* Email Validation */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* Show Alert Message */
function showAlert(message, type) {
  // Remove existing alert if any
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement("div");
  alert.className = `custom-alert custom-alert-${type}`;
  alert.innerHTML = `
    <div class="alert-icon">
      ${type === "success" ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'}
    </div>
    <span class="alert-message">${message}</span>
  `;

  // Add styles
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 12px;
    background: ${type === "success" ? "linear-gradient(135deg, #00b894 0%, #00cec9 100%)" : "linear-gradient(135deg, #d63031 0%, #e17055 100%)"};
    color: white;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    max-width: 350px;
  `;

  document.body.appendChild(alert);

  // Remove after animation
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

/* Add shake animation for wrong password */
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .custom-alert .alert-icon {
    font-size: 20px;
  }
`;
document.head.appendChild(style);

/* Add Enter key support for forms */
document.addEventListener("DOMContentLoaded", () => {
  const lemail = document.getElementById("lemail");
  const lpass = document.getElementById("lpass");
  const remail = document.getElementById("remail");
  const rpass = document.getElementById("rpass");

  lemail.addEventListener("keypress", (e) => {
    if (e.key === "Enter") lpass.focus();
  });

  lpass.addEventListener("keypress", (e) => {
    if (e.key === "Enter") login();
  });

  remail.addEventListener("keypress", (e) => {
    if (e.key === "Enter") rpass.focus();
  });

  rpass.addEventListener("keypress", (e) => {
    if (e.key === "Enter") register();
  });
});

/* Social Login Buttons (Demo) */
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const provider = this.classList.contains("google")
      ? "Google"
      : this.classList.contains("apple")
        ? "Apple"
        : "Facebook";
    showAlert(`${provider} login coming soon! 🔜`, "success");
  });
});
