function loadFooter(callback) {
    const footerHTML = `
      <footer>
          <div class="footerBottom">
              <img src="./img/logo.png" alt="Logo">
              <div class="companyText">
                  <p class="copyright">Copyright © Will Cheng. All Rights Reserved.</p>
              </div>
          </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML); // 插入到 body 的結尾
    if (typeof callback === 'function') callback();
  }
  
  // 自動執行加載
  document.addEventListener('DOMContentLoaded', function () {
    loadFooter();
  });