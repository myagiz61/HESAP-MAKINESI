const ekran = document.querySelector(".hesap-input");
const anahtar = document.querySelector(".hesap-anahtar");
const sil = document.querySelector(".sil");

let ekranValue = "0";
let ilkDeger = null;
let oparoter = null;
let ikincideger = false;

updateDisplay();
HandleOp();

function updateDisplay() {
  ekran.value = ekranValue;
}

anahtar.addEventListener("click", tikla);
sil.addEventListener("click", rti);

function tikla(e) {
  const element = e.target;

  if (!element.matches("button")) return;

  if (element.classList.contains("op")) {
    HandleOp(element.value);
    updateDisplay();
    return;
  }

  if (element.classList.contains("nokta")) {
    inputNokta();
    updateDisplay();
    return;
  }

  if (element.classList.contains("sil")) {
    rti();
    updateDisplay();
    return;
  }

  //? console.log("sayı", element.value);

  Girilensayi(element.value);
  updateDisplay();
}

function HandleOp(op) {
  const deger = parseFloat(ekranValue);

  if (oparoter && ikincideger) {
    oparoter = op;
    return;
  }
  if (ilkDeger === null) {
    ilkDeger = deger;
  } else if (oparoter) {
    const result = calculate(ilkDeger, deger, oparoter);
    ekranValue = `${parseFloat(result.toFixed(7))}`;
    ilkDeger = result;
  }

  ikincideger = true;
  oparoter = op;
}

function Girilensayi(num) {
  if (ikincideger) {
    ekranValue = num;
    ikincideger = false;
  } else {
    ekranValue = ekranValue === "0" ? num : ekranValue + num;
  }
}

function calculate(first, second, oparoter) {
  if (oparoter === "+") {
    return first + second;
  } else if (oparoter === "-") {
    return first - second;
  } else if (oparoter === "*") {
    return first * second;
  } else if (oparoter === "/") {
    return first / second;
  }
  return second;
}
calculate();

function inputNokta() {
  if (!ekranValue.includes(".")) {
    ekranValue += ".";
  }
}

function rti() {
  ekranValue = "0";
}
