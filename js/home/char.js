function startGame() {
  sessionStorage.setItem("mapNum", mapNum);
  window.location.href = "./game.html";
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                    charInit                                                           | */
/* ------------------------------------------------------------------------------------------------------------------------- */
// 獲取 cityNum，並確保其為有效數字
let cityNum = parseInt(sessionStorage.getItem("cityNum"));
let mapNum = 0;

// 如果 cityNum 是 NaN，設定為預設值 0
if (isNaN(cityNum)) {
  cityNum = 0;
  sessionStorage.setItem("cityNum", "0");
}
(function charInit(num) {

  document.querySelector(".cityActive").classList.remove("cityActive");
  document.querySelector(`.cities li:nth-child(${num+1})`).classList.add("cityActive");

  document.querySelector(".cityBgActive").classList.remove("cityBgActive");
  document.querySelector(`.city${num+1}`).classList.add("cityBgActive");
})(cityNum);

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                    citiesUl                                                           | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const citiesUl = document.querySelector(".cities");

citiesUl.addEventListener("click", function (e) {
  if (e.target.classList.contains("disabled")) {
    return;
  }

  if (e.target.tagName === "LI" && e.target !== citiesUl.children[5]) {
    document.querySelector(".cityActive").classList.remove("cityActive");
    e.target.classList.add("cityActive");

    document.querySelector(".cityBgActive").classList.remove("cityBgActive");
    switch (e.target) {
      case citiesUl.children[0]:
        document.querySelector(".city1").classList.add("cityBgActive");
        mapNum = 0;
        break;
      case citiesUl.children[1]:
        document.querySelector(".city2").classList.add("cityBgActive");
        mapNum = 1;
        break;
      case citiesUl.children[2]:
        document.querySelector(".city3").classList.add("cityBgActive");
        mapNum = 2;
        break;
      default:
        break;
    }
  }
});

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city1                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn1 = document.querySelector(".city1 .charLeftBtn");
const RightBtn1 = document.querySelector(".city1 .charRightBtn");
const chars1 = document.querySelectorAll(".city1 .charList li")
const charSelectList1 = document.querySelector(".city1 .charSelectList");
const charSelects1 = document.querySelectorAll(".city1 .charSelectList li");

let charIndex1 = 0;

leftBtn1.addEventListener("click", function () {
  charIndex1--;
  if (charIndex1 < 0) {
    charIndex1 = charSelects1.length - 1;
    let dis = charSelects1[charIndex1 - 5].offsetLeft - charSelects1[0].offsetLeft
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex1 === 0) {
    charSelectList1.style.transform = `translateX(0px)`;
  }
  else {
    let dis = charSelects1[charIndex1 + 1].offsetLeft - charSelects1[charIndex1].offsetLeft
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelector(".CardActive").classList.remove("CardActive");
  charSelects1[charIndex1].classList.add("CardActive");
  document.querySelector(".charActive").classList.remove("charActive");
  chars1[charIndex1].classList.add("charActive");
});

RightBtn1.addEventListener("click", function () {
  charIndex1++;
  if (charIndex1 === charSelects1.length) {
    charIndex1 = 0;
    let dis = charSelects1[0].offsetLeft
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex1 + 5 <= charSelects1.length) {
    let dis = charSelects1[charIndex1].offsetLeft - charSelects1[charIndex1 - 1].offsetLeft;
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelector(".CardActive").classList.remove("CardActive");
  charSelects1[charIndex1].classList.add("CardActive");
  document.querySelector(".charActive").classList.remove("charActive");
  chars1[charIndex1].classList.add("charActive");
});

for (let i = 0; i < charSelects1.length; i++) {
  charSelects1[i].addEventListener("click", function () {
    charIndex1 = i;
    document.querySelector(".CardActive").classList.remove("CardActive");
    charSelects1[charIndex1].classList.add("CardActive");
    document.querySelector(".charActive").classList.remove("charActive");
    chars1[charIndex1].classList.add("charActive");

    if (charIndex1 > 2) {
      let dis = charSelects1[charIndex1].offsetLeft - charSelects1[charIndex1 - 1].offsetLeft;
      charSelectList1.style.transform = `translateX(-${dis}px)`;
      console.log(charIndex1);
    }
    else {
      charSelectList1.style.transform = `translateX(0px)`;
    }
  });
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city2                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn2 = document.querySelector(".city2 .charLeftBtn");
const RightBtn2 = document.querySelector(".city2 .charRightBtn");
const chars2 = document.querySelectorAll(".city2 .charList li")
const charSelectList2 = document.querySelector(".city2 .charSelectList");
const charSelects2 = document.querySelectorAll(".city2 .charSelectList li");

let charIndex2 = 0;

leftBtn2.addEventListener("click", function () {
  charIndex2--;
  if (charIndex2 < 0) {
    charIndex2 = charSelects2.length - 1;
    let dis = charSelects2[charIndex2 - 5].offsetLeft - charSelects2[0].offsetLeft
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex2 === 0) {
    charSelectList2.style.transform = `translateX(0px)`;
  }
  else {
    let dis = charSelects2[charIndex2 + 1].offsetLeft - charSelects2[charIndex2].offsetLeft
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[1].classList.remove("CardActive");
  charSelects2[charIndex2].classList.add("CardActive");
  document.querySelectorAll(".charActive")[1].classList.remove("charActive");
  chars2[charIndex2].classList.add("charActive");
});

RightBtn2.addEventListener("click", function () {
  charIndex2++;
  if (charIndex2 === charSelects2.length) {
    charIndex2 = 0;
    let dis = charSelects2[0].offsetLeft
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex2 + 5 <= charSelects2.length) {
    let dis = charSelects2[charIndex2].offsetLeft - charSelects2[charIndex2 - 1].offsetLeft;
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[1].classList.remove("CardActive");
  charSelects2[charIndex2].classList.add("CardActive");
  document.querySelectorAll(".charActive")[1].classList.remove("charActive");
  chars2[charIndex2].classList.add("charActive");
});

for (let i = 0; i < charSelects2.length; i++) {
  charSelects2[i].addEventListener("click", function () {
    charIndex2 = i;
    document.querySelectorAll(".CardActive")[1].classList.remove("CardActive");
    charSelects2[charIndex2].classList.add("CardActive");
    document.querySelectorAll(".charActive")[1].classList.remove("charActive");
    chars2[charIndex2].classList.add("charActive");

    if (charIndex2 > 2) {
      let dis = charSelects2[charIndex2].offsetLeft - charSelects2[charIndex2 - 1].offsetLeft;
      charSelectList2.style.transform = `translateX(-${dis}px)`;
      console.log(charIndex2);
    }
    else {
      charSelectList2.style.transform = `translateX(0px)`;
    }
  });
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city3                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn3 = document.querySelector(".city3 .charLeftBtn");
const RightBtn3 = document.querySelector(".city3 .charRightBtn");
const chars3 = document.querySelectorAll(".city3 .charList li")
const charSelectList3 = document.querySelector(".city3 .charSelectList");
const charSelects3 = document.querySelectorAll(".city3 .charSelectList li");

let charIndex3 = 0;

leftBtn3.addEventListener("click", function () {
  charIndex3--;
  if (charIndex3 < 0) {
    charIndex3 = charSelects3.length - 1;
    let dis = charSelects3[charIndex3 - 5].offsetLeft - charSelects3[0].offsetLeft
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex3 === 0) {
    charSelectList3.style.transform = `translateX(0px)`;
  }
  else {
    let dis = charSelects3[charIndex3 + 1].offsetLeft - charSelects3[charIndex3].offsetLeft
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[2].classList.remove("CardActive");
  charSelects3[charIndex3].classList.add("CardActive");
  document.querySelectorAll(".charActive")[2].classList.remove("charActive");
  chars3[charIndex3].classList.add("charActive");
});

RightBtn3.addEventListener("click", function () {
  charIndex3++;
  if (charIndex3 === charSelects3.length) {
    charIndex3 = 0;
    let dis = charSelects3[0].offsetLeft
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex3 + 5 <= charSelects3.length) {
    let dis = charSelects3[charIndex3].offsetLeft - charSelects3[charIndex3 - 1].offsetLeft;
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[2].classList.remove("CardActive");
  charSelects3[charIndex3].classList.add("CardActive");
  document.querySelectorAll(".charActive")[2].classList.remove("charActive");
  chars3[charIndex3].classList.add("charActive");
});

for (let i = 0; i < charSelects3.length; i++) {
  charSelects3[i].addEventListener("click", function () {
    charIndex3 = i;
    document.querySelectorAll(".CardActive")[2].classList.remove("CardActive");
    charSelects3[charIndex3].classList.add("CardActive");
    document.querySelectorAll(".charActive")[2].classList.remove("charActive");
    chars3[charIndex3].classList.add("charActive");

    if (charIndex3 > 2) {
      let dis = charSelects3[charIndex3].offsetLeft - charSelects3[charIndex3 - 1].offsetLeft;
      charSelectList3.style.transform = `translateX(-${dis}px)`;
    }
    else {
      charSelectList3.style.transform = `translateX(0px)`;
    }
  });
}