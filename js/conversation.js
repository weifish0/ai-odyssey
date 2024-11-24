document.getElementById("prevDialogue").addEventListener("click", (e) => {
	if (player.interactionAsset.dialogueIndex > 0) {
		player.interactionAsset.dialogueIndex--;
		updateDialogue();
	}
    e.target.blur();
});

document.getElementById("nextDialogue").addEventListener("click", (e) => {
	if (
		player.interactionAsset.dialogueIndex <
		player.interactionAsset.dialogue.length - 1
	) {
		player.interactionAsset.dialogueIndex++;
		updateDialogue();
	}
    e.target.blur();
});

function typeText(text, elementId) {
	let i = 0;
	const element = document.getElementById(elementId);
	element.innerHTML = ""; // 清空之前的內容

	const interval = setInterval(() => {
		if (i < text.length) {
			element.innerHTML += text.charAt(i); // 逐字顯示
			i++;
		} else {
			clearInterval(interval); // 結束動畫
		}
	}, 50); // 每個字的間隔（毫秒）
}

function updateDialogue() {
	const dialogueContent = document.getElementById("dialogueContent");

	const dialogue =
		player.interactionAsset.dialogue[player.interactionAsset.dialogueIndex];
	dialogueContent.textContent = dialogue;

    if(player.interactionAsset.dialogueIndex===player.interactionAsset.AI_panel_index){
        start_AI_panel(player.interactionAsset.AI_panel_type)
      }else{
        // 圖片展示
        start_AI_panel(0)
    }
}

function exit_conversation(aiPanelType) {
	document.querySelector("#characterDialogueBox").style.display = "none";
	document.querySelector("#npcImageContainer").style.display = "none";
	document.getElementById("aiPanelContainer").style.display = "none";
	if (aiPanelType === 1) {
		exit_image_recognition();
	}
}

function start_conversation(Asset) {
	document.querySelector("#npcImageContainer").style.display = "block";
	document.querySelector("#npcImage").src = Asset.style_image;
	document.getElementById("npcName").textContent = Asset.name;
	document.getElementById("npcDescription").textContent = Asset.description;
}

function start_AI_panel(aiPanelType) {
	const aiPanelContainer = document.getElementById("aiPanelContainer");

	// 清空之前的 AI 功能面板內容
	aiPanelContainer.innerHTML = "";

	switch (aiPanelType) {
		case 0: //示意圖
			const currentImage =
				player.interactionAsset.conversation_img_data[
					player.interactionAsset.dialogueIndex
				] || "";
			aiPanelContainer.innerHTML = `
        <div id="image-panel">
            <img src="${currentImage}" alt="示意圖" id="conversation-image">
            <p id="image-caption">示意圖</p>
        </div>
    `;
			break;

		case 1: // 影像辨識
			aiPanelContainer.innerHTML = `
<div id="recognition-panel">
	<video id="webcam" autoplay muted></video>
	<div id="dataCollector-container"></div>
	<div id="addCollector-container">
		<input type="text" id="addInput" placeholder="輸入資料名稱">
		<button id="addButton">新增標籤</button>
	</div>
</div>
<div id="recognition-controls">
	<button id="loadImageModel">載入預訓練模型</button>
	<button id="enableCam">啟用攝影機</button>
	<button id="train">開始訓練!</button>
</div>
<p id="aiStatus">選擇標籤後，載入預訓練模型，開啟你的AI影像辨識奇幻之旅吧🧚‍♀️</p>
            `;
			loadImageRecognition(); // 初始化影像辨識功能
			break;

		case 2: // 影像辨識自選圖片
			aiPanelContainer.innerHTML = `
                <div id="image-generation-panel">
                    <textarea id="imagePrompt" placeholder="輸入圖像生成的提示..."></textarea>
                    <button id="generateImage">生成圖像</button>
                    <div id="imagePreview"></div>
                </div>
            `;
			break;

		case 3: // 圖像生成
			aiPanelContainer.innerHTML = `
                <div id="image-generation-panel">
                    <textarea id="imagePrompt" placeholder="輸入圖像生成的提示..."></textarea>
                    <button id="generateImage">生成圖像</button>
                    <div id="imagePreview"></div>
                </div>
            `;
			break;

		case 4: // 音樂生成
			aiPanelContainer.innerHTML = `
                <div id="music-generation-panel">
                    <textarea id="musicPrompt" placeholder="輸入音樂生成的提示..."></textarea>
                    <button id="generateMusic">生成音樂</button>
                    <audio id="musicPreview" controls></audio>
                </div>
            `;
			break;

		default:
			console.error("Undefined AI panel type");
	}

	aiPanelContainer.style.display = "block"; // 顯示懸浮窗
}
