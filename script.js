"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const statusText = document.getElementById("statusText");

const lengthValue = document.getElementById("lengthValue");
const lengthRange = document.getElementById("lengthRange");

const strengthLabel = document.getElementById("strengthLabel");
const strengthFill = document.getElementById("strengthFill");
const securityMode = document.getElementById("securityMode");

const lowercaseOption = document.getElementById("lowercaseOption");
const uppercaseOption = document.getElementById("uppercaseOption");
const numbersOption = document.getElementById("numbersOption");
const symbolsOption = document.getElementById("symbolsOption");
const similarOption = document.getElementById("similarOption");

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");

// ======================================================
// CHARACTER SETS
// ======================================================

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numberChars = "0123456789";

const symbolChars = "!@#$%^&*()_+-={}[]<>?/|";

const similarChars = "O0Il1";

// ======================================================
// GET CHARACTER POOL FUNCTION
// ======================================================

function getCharacterPool() {
  let pool = "";

  if (lowercaseOption.checked) {
    pool += lowercaseChars;
  }

  if (uppercaseOption.checked) {
    pool += uppercaseChars;
  }

  if (numbersOption.checked) {
    pool += numberChars;
  }

  if (symbolsOption.checked) {
    pool += symbolChars;
  }

  if (similarOption.checked) {
    pool = pool
      .split("")
      .filter((char) => {
        return !similarChars.includes(char);
      })
      .join("");
  }

  return pool;
}

// ======================================================
// GENERATE PASSWORD FUNCTION
// ======================================================

function generatePassword() {
  const length = Number(lengthRange.value);

  const pool = getCharacterPool();

  if (pool === "") {
    statusText.textContent = "Please select at least one character type.";
    passwordOutput.value = "";

    updateStrength("", "");
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);

    password += pool[randomIndex];
  }

  passwordOutput.value = password;
  statusText.textContent = "Password generated successfully.";
  updateStrength(password, pool);
}

// ======================================================
// UPDATE LENGTH VALUE FUNCTION
// ======================================================

function updateLengthValue() {
  lengthValue.textContent = lengthRange.value;
}

// ======================================================
// CALCULATE STRENGTH FUNCTION
// ======================================================

function calculateStrength(password, pool) {
  if (password === "") return 0;

  let score = 0;

  score += password.length * 2;

  if (lowercaseOption.checked) {
    score += 10;
  }

  if (uppercaseOption.checked) {
    score += 10;
  }

  if (numbersOption.checked) {
    score += 10;
  }

  if (symbolsOption.checked) {
    score += 20;
  }

  if (score > 100) {
    score = 100;
  }

  return score;
}

// ======================================================
// UPDATE STRENGTH FUNCTION
// ======================================================

function updateStrength(password, pool) {
  const score = calculateStrength(password, pool);

  strengthFill.style.width = `${score}%`;
  strengthFill.classList.remove("medium", "strong");

  if (score === 0) {
    strengthLabel.textContent = "—";
    securityMode.textContent = "Ready";
  } else if (score < 45) {
    strengthLabel.textContent = "Weak";
    securityMode.textContent = "Basic";
  } else if (score < 75) {
    strengthLabel.textContent = "Medium";
    securityMode.textContent = "Balanced";

    strengthFill.classList.add("medium");
  } else {
    strengthLabel.textContent = "Strong";
    securityMode.textContent = "Hardened";

    strengthFill.classList.add("strong");
  }
}

// ======================================================
// COPY PASSWORD FUNCTION
// ======================================================

async function copyPassword() {
  const value = passwordOutput.value;

  if (value === "") {
    statusText.textContent = "Please generate a password first.";
    return;
  }

  await navigator.clipboard.writeText(value);
  copyBtn.textContent = "Copied ✓";

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
}

// ======================================================
//  RESET FUNCTION
// ======================================================

function resetGenerator() {
  passwordOutput.value = "";
  lengthRange.value = 16;

  const checkboxes = document.querySelectorAll(
    `.option input[type="checkbox"]`,
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  lowercaseOption.checked = true;
  uppercaseOption.checked = true;
  numbersOption.checked = true;

  updateLengthValue();
  updateStrength("", "");

  statusText.textContent = "Ready to generate.";
}

// ======================================================
// EVENT LISTENERS
// ======================================================

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", copyPassword);

resetBtn.addEventListener("click", resetGenerator);

lengthRange.addEventListener("input", () => {
  updateLengthValue();
});

// ======================================================
// INITIAL STATE
// ======================================================

updateLengthValue();

updateStrength("", "");
