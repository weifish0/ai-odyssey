function exit_conversation(){
    document.querySelector('#characterDialogueBox').style.display = 'none'
    document.querySelector('#npcImageContainer').style.display = 'none'
    document.getElementById('aiPanelContainer').style.display = 'none'
    exit_image_recognition()
}

function start_conversation(Asset){
    document.querySelector('#npcImageContainer').style.display = 'block'
    document.querySelector('#npcImage').src = Asset.style_image
    document.getElementById('npcName').textContent = Asset.name;
    document.getElementById('npcDescription').textContent = Asset.description;
}

function start_AI_panel(aiPanelType) {
    const aiPanelContainer = document.getElementById('aiPanelContainer');

    // 清空之前的 AI 功能面板內容
    aiPanelContainer.innerHTML = '';

    switch (aiPanelType) {
        case 1: // 影像辨識
            aiPanelContainer.innerHTML = `
                <div id="recognition-panel">
                    <video id="webcam" autoplay muted></video>
                    <div id="recognition-controls">
                        <button id="loadImageModel">載入預訓練模型</button>
                        <button id="enableCam">啟用攝影機</button>
                        <button class="dataCollector" data-1hot="0" data-name="Class 1">蒐集資料1</button>
                        <button class="dataCollector" data-1hot="1" data-name="Class 2">蒐集資料2</button>
                        <button id="train">開始訓練!</button>
                    </div>
                </div>
                <p id="aiStatus">載入預訓練模型，開啟你的AI影像辨識奇幻之旅吧🧚‍♀️</p>
            `;
            loadImageRecognition(); // 初始化影像辨識功能
            break;

        case 2: // 圖像生成
            aiPanelContainer.innerHTML = `
                <div id="image-generation-panel">
                    <textarea id="imagePrompt" placeholder="輸入圖像生成的提示..."></textarea>
                    <button id="generateImage">生成圖像</button>
                    <div id="imagePreview"></div>
                </div>
            `;
            break;

        case 3: // 音樂生成
            aiPanelContainer.innerHTML = `
                <div id="music-generation-panel">
                    <textarea id="musicPrompt" placeholder="輸入音樂生成的提示..."></textarea>
                    <button id="generateMusic">生成音樂</button>
                    <audio id="musicPreview" controls></audio>
                </div>
            `;
            break;

        default:
            console.error('Undefined AI panel type');
    }

    aiPanelContainer.style.display = 'block'; // 顯示懸浮窗
}