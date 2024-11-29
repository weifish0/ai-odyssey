function rectangularCollision({ rectangle1, rectangle2 }) {
	return (
		rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
		rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
		rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
		rectangle1.position.y + rectangle1.height >= rectangle2.position.y
	);
}

function checkForCharacterCollision({
	characters,
	player,
	characterOffset = { x: 0, y: 0 },
}) {
	player.interactionAsset = null;
	// monitor for character collision
	for (let i = 0; i < characters.length; i++) {
		const character = characters[i];

		if (
			rectangularCollision({
				rectangle1: player,
				rectangle2: {
					...character,
					position: {
						x: character.position.x + characterOffset.x,
						y: character.position.y + characterOffset.y,
					},
				},
			})
		) {
			player.interactionAsset = character;
			break;
		}
	}
}

// 定義按鈕的事件監聽函式
function setupGamePadListeners(isComputer) {
	if (isComputer) {
		return;
	} else {
		const controlsContainer = document.querySelector(".control-buttons");
		controlsContainer.style.display = "flex";

		const circleButton = document.getElementById("circleButton");
    circleButton.style.display = "flex";
	}

	// 向上按鈕
	document.getElementById("upBtn").addEventListener("touchstart", (e) => {
		e.preventDefault(); // 防止點擊時畫面滑動
		keys.w.pressed = true;
		lastKey = "w";
	});
	document.getElementById("upBtn").addEventListener("touchend", () => {
		keys.w.pressed = false;
	});

	// 向左按鈕
	document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
		e.preventDefault(); // 防止點擊時畫面滑動
		keys.a.pressed = true;
		lastKey = "a";
	});
	document.getElementById("leftBtn").addEventListener("touchend", () => {
		keys.a.pressed = false;
	});

	// 向下按鈕
	document.getElementById("downBtn").addEventListener("touchstart", (e) => {
		e.preventDefault(); // 防止點擊時畫面滑動
		keys.s.pressed = true;
		lastKey = "s";
	});
	document.getElementById("downBtn").addEventListener("touchend", () => {
		keys.s.pressed = false;
	});

	// 向右按鈕
	document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
		e.preventDefault(); // 防止點擊時畫面滑動
		keys.d.pressed = true;
		lastKey = "d";
	});
	document.getElementById("rightBtn").addEventListener("touchend", () => {
		keys.d.pressed = false;
	});

	// 模擬按下空白鍵
	circleButton.addEventListener("click", () => {
		const spacebarEvent = new KeyboardEvent("keydown", {
			key: " ",
			code: "Space",
			keyCode: 32,
			bubbles: true,
		});
		document.dispatchEvent(spacebarEvent);
	});
}

// 設置 canvas 的初始比例為 16:9，並根據螢幕寬度自動調整
function resizeCanvas() {
	const width = window.innerWidth - 100;
	const height = window.innerHeight - 100;
	const aspectRatio = 16 / 9;

	if (width / height > aspectRatio) {
		// 螢幕過寬時，以高度為基準
		canvas.height = height;
		canvas.width = height * aspectRatio;
	} else {
		// 螢幕過高時，以寬度為基準
		canvas.width = width;
		canvas.height = width / aspectRatio;
	}

	// 重繪畫布（如果需要）
	drawScene();
}

// 繪製場景的函式（僅示範，請根據實際場景更新）
function drawScene() {
	// 清除畫布
	c.clearRect(0, 0, canvas.width, canvas.height);

	// 在這裡加入場景繪製程式碼
}
