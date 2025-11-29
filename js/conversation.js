// 全局變量來追蹤當前的打字動畫
let currentTypingAnimation = null;

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
	// 清除之前的動畫
	if (currentTypingAnimation) {
		clearInterval(currentTypingAnimation);
		currentTypingAnimation = null;
	}
	
	let i = 0;
	const element = document.getElementById(elementId);
	element.innerHTML = ""; // 清空之前的內容

	currentTypingAnimation = setInterval(() => {
		if (i < text.length) {
			element.innerHTML += text.charAt(i); // 逐字顯示
			i++;
		} else {
			clearInterval(currentTypingAnimation); // 結束動畫
			currentTypingAnimation = null;
		}
	}, 50); // 每個字的間隔（毫秒）
}

// 立即完成當前打字動畫的函數
function completeTypingAnimation() {
	if (currentTypingAnimation) {
		clearInterval(currentTypingAnimation);
		currentTypingAnimation = null;
		
		// 立即顯示完整的對話文字
		const dialogueContent = document.getElementById("dialogueContent");
		if (dialogueContent && player.interactionAsset) {
			let dialogue = player.interactionAsset.dialogue[player.interactionAsset.dialogueIndex];
			
			// 如果有語言管理器，使用翻譯後的對話
			if (window.languageManager && player.interactionAsset.dialogueKeys) {
				const dialogueKey = player.interactionAsset.dialogueKeys[player.interactionAsset.dialogueIndex];
				if (dialogueKey) {
					const translatedDialogue = window.languageManager.getText(dialogueKey);
					if (translatedDialogue && translatedDialogue !== dialogueKey) {
						dialogue = translatedDialogue;
					}
				}
			}
			
			dialogueContent.innerHTML = dialogue;
		}
		return true; // 表示有動畫被完成
	}
	return false; // 表示沒有動畫在進行
}

function updateDialogue() {
	const dialogueContent = document.getElementById("dialogueContent");

	// 清除任何正在進行的打字動畫
	if (currentTypingAnimation) {
		clearInterval(currentTypingAnimation);
		currentTypingAnimation = null;
	}

	// 獲取當前對話內容
	let dialogue = player.interactionAsset.dialogue[player.interactionAsset.dialogueIndex];
	
	// 調試信息
	console.log('updateDialogue called');
	console.log('languageManager exists:', !!window.languageManager);
	console.log('languageManager currentLanguage:', window.languageManager?.currentLanguage);
	console.log('dialogueKeys exists:', !!player.interactionAsset.dialogueKeys);
	console.log('dialogueKeys array:', player.interactionAsset.dialogueKeys);
	console.log('current dialogueIndex:', player.interactionAsset.dialogueIndex);
	
	// 如果有語言管理器和對話鍵值，嘗試獲取翻譯後的對話
	if (window.languageManager && player.interactionAsset.dialogueKeys) {
		const dialogueKey = player.interactionAsset.dialogueKeys[player.interactionAsset.dialogueIndex];
		console.log('dialogueKey:', dialogueKey);
		
		if (dialogueKey) {
			const translatedDialogue = window.languageManager.getText(dialogueKey);
			console.log('translatedDialogue:', translatedDialogue);
			console.log('original dialogue:', dialogue);
			
			// 如果翻譯成功（不是返回原始鍵值），使用翻譯後的對話
			if (translatedDialogue && translatedDialogue !== dialogueKey) {
				dialogue = translatedDialogue;
				console.log('Using translated dialogue:', dialogue);
			} else {
				console.log('Translation failed, using original dialogue');
			}
		}
	} else {
		console.log('No language manager or dialogueKeys available');
	}
	
	// 使用 typeText 函數來顯示打字效果
	typeText(dialogue, "dialogueContent");

	if (
		player.interactionAsset.dialogueIndex ===
		player.interactionAsset.AI_panel_index
	) {
		start_AI_panel(player.interactionAsset.AI_panel_type);
	} else {
		// 圖片展示
		start_AI_panel(0);
	}
}

function exit_conversation(aiPanelType) {
	document.querySelector("#characterDialogueBox").style.display = "none";
	document.querySelector("#npcImageContainer").style.display = "none";
	document.getElementById("aiPanelContainer").style.display = "none";
	if (aiPanelType === 1) {
		exit_image_recognition();
        CLASS_NAMES = [];
	}
    if(aiPanelType === 2){
        CLASS_NAMES = [];
        resetStaticImageRecognition();
    }
}

function start_conversation(Asset) {
	document.querySelector("#npcImageContainer").style.display = "block";
	document.querySelector("#npcImage").src = Asset.style_image;
	
	// 使用語言管理器更新角色名稱和描述
	if (window.languageManager) {
		document.getElementById("npcName").textContent = window.languageManager.getText(Asset.nameKey || 'char.ayong.name');
		document.getElementById("npcDescription").textContent = window.languageManager.getText(Asset.descriptionKey || 'char.ayong.description_short');
	} else {
		// 如果語言管理器未載入，使用預設值
		document.getElementById("npcName").textContent = Asset.name;
		document.getElementById("npcDescription").textContent = Asset.description;
	}
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
				] || "./other/poster.png";

			if (currentImage.startsWith("https://")) {
				// 如果是 YouTube 影片，刷新為 iframe
				const videoCaption = window.languageManager ? window.languageManager.getText('ai.video_caption') : '示意影片';
				aiPanelContainer.innerHTML = `
            <div id="video-panel">
                <iframe 
                    id="youtube-video" 
                    src="${currentImage}" 
                    title="YouTube video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <p id="video-caption">${videoCaption}</p>
            </div>
        `;
			} else {
				// 否則顯示圖片
				const imageCaption = window.languageManager ? window.languageManager.getText('ai.image_caption') : '示意圖';
				aiPanelContainer.innerHTML = `
            <div id="image-panel">
                <img src="${currentImage}" alt="示意圖" id="conversation-image">
                <p id="image-caption">${imageCaption}</p>
            </div>
        `;
			}
			break;

		case 1: // 影像辨識
			const dataNamePlaceholder = window.languageManager ? window.languageManager.getText('ai.data_name_placeholder') : '輸入資料名稱';
			const addLabelText = window.languageManager ? window.languageManager.getText('ai.add_label') : '新增標籤';
			const loadModelText = window.languageManager ? window.languageManager.getText('ai.load_model') : '載入預訓練模型';
			const enableCamText = window.languageManager ? window.languageManager.getText('ai.enable_camera') : '啟用攝影機';
			const startTrainingText = window.languageManager ? window.languageManager.getText('ai.start_training') : '開始訓練!';
			const aiStatusText = window.languageManager ? window.languageManager.getText('ai.ai_status') : '選擇標籤後，載入預訓練模型，開啟你的AI影像辨識奇幻之旅吧🧚‍♀️';
			
			aiPanelContainer.innerHTML = `
<div id="recognition-panel">
	<video id="webcam" autoplay muted></video>
	<div id="dataCollector-container"></div>
</div>
<div id="recognition-controls">
	<div id="addCollector-container">
		<input type="text" id="addInput" placeholder="${dataNamePlaceholder}">
		<button id="addButton">${addLabelText}</button>
	</div>
	<div id="recognition-button-container">
		<button id="loadImageModel">${loadModelText}</button>
		<button id="enableCam">${enableCamText}</button>
		<button id="train">${startTrainingText}</button>
	</div>
</div>
<p id="aiStatus">${aiStatusText}</p>
            `;
			loadImageRecognition(); // 初始化影像辨識功能
			break;

		case 2: // 影像辨識不用鏡頭自選圖片
			const resetText = window.languageManager ? window.languageManager.getText('ai.reset') : '重置';
			const trainModelText = window.languageManager ? window.languageManager.getText('ai.train_model') : '訓練模型';
			const nextText = window.languageManager ? window.languageManager.getText('ai.next') : '下一個';
			
			aiPanelContainer.innerHTML = `
        <div id="local-image-panel">
            <div id="imagePreviewContainer"></div>
            <div id="classification-buttons">
                <button id="labelClass1">${player.interactionAsset.CV_data_label[0]}</button>
                <button id="labelClass2">${player.interactionAsset.CV_data_label[1]}</button>
                <button id="resetImgLabel">${resetText}</button>
            </div>
        </div>
        <div id="recognition-controls">
	        <button id="train" style="display: none;">${trainModelText}</button>
	        <button id="nextVideoButton" style="display: none;">${nextText}</button>
        </div>
        <p id="aiStatus"></p>
</div>
            `;
			loadStaticImageRecognition(player.interactionAsset.CV_data_num);
			break;

		case 3: // 圖像生成
			const imagePlaceholder = window.languageManager ? window.languageManager.getText('ai.input_placeholder') : '輸入圖像生成的提示...';
			const generateImageText = window.languageManager ? window.languageManager.getText('ai.generate_image') : '生成圖像';
			aiPanelContainer.innerHTML = `
                <div id="image-generation-panel">
                    <textarea id="imagePrompt" placeholder="${imagePlaceholder}"></textarea>
                    <button id="generateImage">${generateImageText}</button>
                    <div id="imagePreview"></div>
                </div>
            `;
			break;

		case 4: // 音樂生成
			const musicPlaceholder = window.languageManager ? window.languageManager.getText('ai.music_placeholder') : '輸入音樂生成的提示...';
			const generateMusicText = window.languageManager ? window.languageManager.getText('ai.generate_music') : '生成音樂';
			aiPanelContainer.innerHTML = `
                <div id="music-generation-panel">
                    <textarea id="musicPrompt" placeholder="${musicPlaceholder}"></textarea>
                    <button id="generateMusic">${generateMusicText}</button>
                    <audio id="musicPreview" controls></audio>
                </div>
            `;
			break;

		default:
			console.error("Undefined AI panel type");
	}

	aiPanelContainer.style.display = "block"; // 顯示懸浮窗
}

// 將函數設為全局可訪問
window.updateDialogue = updateDialogue;
window.completeTypingAnimation = completeTypingAnimation;
