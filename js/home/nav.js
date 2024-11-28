function loadNavbar(callback) {
  const navbarHTML = `
      <div class="mask"></div>
      <nav class="flexRow">
          <div class="flexRow logoBox">
              <img src="../img/logo.png" class="logo" alt="Logo">
          </div>
          <div class="itemBox">
              <div class="navMark"></div>
              <div class="items">
                  <a href="./index.html" class="active">首頁</a>
                  <a href="./html/news.html">Blog</a>
              </div>
          </div>
          <div class="flexRow playBox">
              <div class="flexRow loginButton">
                  <span>登入</span>
                  <img src="../img/home/nav/login.png" alt="Login" class="loginImg">
              </div>
          </div>
          <div class="login">
              <img src="../img/home/nav/loginCancle.png" alt="Cancel" class="loginCancle">
              <p>帳號登入</p>
              <input type="text" placeholder="使用者名稱/電子信箱">
              <input type="password" placeholder="密碼">
              <button>登入</button>
              <div class="help">
                  <span>遇到問題</span>
                  <span>立即註冊</span>
              </div>
              <div class="more">
                  <div></div>
                  <p>更多登入方式</p>
              </div>
              <div class="loginIcon">
                  <img src="../img/home/nav/googleIcon.png" alt="Google">
                  <img src="../img/home/nav/iosIcon.png" alt="iOS">
                  <img src="../img/home/nav/fbIcon.png" alt="Facebook">
              </div>
          </div>
      </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  if (typeof callback === 'function') callback();
}

document.addEventListener('DOMContentLoaded', function () {
  loadNavbar(() => {
    const mask = document.querySelector(".mask");
    const loginBtn = document.querySelector(".loginButton");
    const login = document.querySelector(".login");
    const loginCancleBtn = document.querySelector(".login .loginCancle");
    const itemBox = document.querySelector(".itemBox");
    const navMark = document.querySelector(".navMark");
    const items = document.querySelectorAll(".items a");

    let documentHeight = document.documentElement.scrollHeight;

    function preventMouseWheelScroll(event) {
      event.preventDefault();
    }

    loginBtn.addEventListener("click", function () {
      mask.style.height = `${documentHeight}px`;
      mask.style.visibility = "visible";
      window.addEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
      window.addEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
      login.style.visibility = "visible";
    });

    mask.addEventListener("click", function (e) {
      mask.style.height = `0px`;
      mask.style.visibility = "hidden";
      window.removeEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
      window.removeEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
      login.style.visibility = "hidden";
    });

    loginCancleBtn.addEventListener("click", function (e) {
      mask.style.height = `0px`;
      mask.style.visibility = "hidden";
      window.removeEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
      window.removeEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
      login.style.visibility = "hidden";
    });

    items.forEach((item, i) => {
      item.addEventListener("mouseenter", function () {
        let distance = item.offsetLeft - navMark.offsetLeft;
        navMark.style.transform = `translateX(${distance}px)`;
      });
    });

    itemBox.addEventListener("mouseleave", function () {
      navMark.style.transform = `translateX(0px)`;
    });
  });
});