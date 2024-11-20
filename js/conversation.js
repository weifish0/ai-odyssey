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

function start_AI_panel(){
    document.getElementById('aiPanelContainer').style.display = 'block'; // 顯示懸浮窗
}