const models = [
    {
      name: "影像辨識射手",
      description: "擅長辨識圖像中的物體。",
      avatar: "./img/achievement/archer.png", // 模擬影像擬人化圖像
      badge: "./img/achievement/archer-badge.png" // 模擬成就徽章
    },
    {
      name: "語言模型法師",
      description: "精通語言處理，能理解文本。",
      avatar: "./img/achievement/witcher.png", // 模擬語言擬人化圖像
      badge: "./img/achievement/witcher-badge.png" // 模擬成就徽章
    },
    {
      name: "語音識別戰士",
      description: "能準確識別語音，轉換成文字。",
      avatar: "./img/achievement/soldier.png", // 模擬語音擬人化圖像
      badge: "./img/achievement/soldier-badge.png" // 模擬成就徽章
    }
  ];
  
  // 動態生成成就卡片
  function loadAchievements() {
    const modelsContainer = document.getElementById("models");
  
    models.forEach(model => {
      // 創建卡片元素
      const card = document.createElement("div");
      card.className = "model-card";
  
      // 模型擬人化圖片
      const avatar = document.createElement("img");
      avatar.src = model.avatar;
      avatar.alt = model.name;
      avatar.className = "model-avatar";
  
      // 模型名稱
      const name = document.createElement("div");
      name.className = "model-name";
      name.textContent = model.name;
  
      // 模型描述
      const description = document.createElement("p");
      description.textContent = model.description;
  
      // 成就徽章
      const badge = document.createElement("img");
      badge.src = model.badge;
      badge.alt = "徽章";
      badge.className = "badge";
  
      // 將元素加入卡片
      card.appendChild(avatar);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(badge);
  
      // 將卡片加入容器
      modelsContainer.appendChild(card);
    });
  }
  
  // 初始化成就頁面
  document.addEventListener("DOMContentLoaded", loadAchievements);