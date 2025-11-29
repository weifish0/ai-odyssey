let isComputer =
	!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

// 操作搖桿
setupGamePadListeners(isComputer);

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// 調整大小
resizeCanvas();

// 當視窗大小變動時更新 canvas 大小
window.addEventListener("resize", resizeCanvas);

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
	collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
	battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 70) {
	charactersMap.push(charactersMapData.slice(i, 70 + i));
}
// console.log(charactersMap)

const boundaries = [];

let offset;
switch(mapNum){
  case 0:
    offset = {
      x: 40,
      y: -250,
    };
    break;
  case 1:
    offset = {
      x: -900,
      y: -210
    };
    break;
}


collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 1025)
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width + offset.x,
						y: i * Boundary.height + offset.y,
					},
				})
			);
	});
});

const battleZones = [];

battleZonesMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 1025)
			battleZones.push(
				new Boundary({
					position: {
						x: j * Boundary.width + offset.x,
						y: i * Boundary.height + offset.y,
					},
				})
			);
	});
});

const characters = [];

charactersMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		let position = {
			x: j * Boundary.width + offset.x,
			y: i * Boundary.height + offset.y,
		};

		// 1026 === villager
		if (symbol === 1026) {
			characters.push(
				new Character(characters_data.villager1(position))
			);
		}
		// 1031 === oldMan
		else if (symbol === 1031) {
			characters.push(
				new Character(characters_data.oldman(position))
			);
		}
		// 1024 === wizard
		else if (symbol === 1024) {
			characters.push(
				new Character(characters_data.wizard(position))
			);
		}
		// 1025 === knight
		else if (symbol === 1025) {
			characters.push(
				new Character(characters_data.knight(position))
			);
		}
		// 1027 === assassin
		else if (symbol === 1027) {
			characters.push(
				new Character(characters_data.assassin(position))
			);
		}

		if (symbol !== 0) {
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width + offset.x,
						y: i * Boundary.height + offset.y,
					},
				})
			);
		}
	});
});

const image = new Image();
switch (mapNum) {
	case 0:
		image.src = "./img/Pellet Town.png";
		break;
	case 1:
		image.src = "./img/port.png";
		break;
}

const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/initplayer/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/initplayer/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/initplayer/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/initplayer/playerRight.png";

const fairy = new Image();
fairy.src = "./img/fairy.png"

let player;
let player_speed = 6;
switch (mapNum) {
	case 0:
		player = new Sprite({
			position: {
				x: canvas.width / 2 - 192 / 4 / 2,
				y: canvas.height / 2 - 68 / 2,
			},
			image: playerDownImage,
			frames: {
				max: 4,
				hold: 5,
			},
			sprites: {
				up: playerUpImage,
				left: playerLeftImage,
				right: playerRightImage,
				down: playerDownImage,
			},
		});
		break;
  case 1:
    player = new Sprite({
			position: {
				x: canvas.width / 2 - 360 / 2 / 2,
				y: canvas.height / 2 - 280 / 2,
			},
			image: fairy,
			frames: {
				max: 2,
				hold: 3,
			},
			sprites: {
				up: fairy,
				left: fairy,
				right: fairy,
				down: fairy,
			},
		});
		break;
}

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: image,
});

const foreground = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: foregroundImage,
});

let movables;
let renderable;
if (mapNum == 0) {
	movables = [
		background,
		...boundaries,
		foreground,
		...battleZones,
		...characters,
	];
	renderables = [
		background,
		...boundaries,
		...battleZones,
		...characters,
		player,
		foreground,
	];
} else {
	movables = [background, ...boundaries, ...battleZones, ...characters];
	renderables = [
		background,
		...boundaries,
		...battleZones,
		...characters,
		player,
	];
}

const battle = {
	initiated: false,
};

function animate() {
	const animationId = window.requestAnimationFrame(animate);
	renderables.forEach((renderable) => {
		renderable.draw();
	});

	let moving = true;
	player.animate = false;

	if (battle.initiated) return;

	// activate a battle
	if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
		for (let i = 0; i < battleZones.length; i++) {
			const battleZone = battleZones[i];
			const overlappingArea =
				(Math.min(
					player.position.x + player.width,
					battleZone.position.x + battleZone.width
				) -
					Math.max(player.position.x, battleZone.position.x)) *
				(Math.min(
					player.position.y + player.height,
					battleZone.position.y + battleZone.height
				) -
					Math.max(player.position.y, battleZone.position.y));
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: battleZone,
				}) &&
				overlappingArea > (player.width * player.height) / 2 &&
				Math.random() < 0.01
			) {
				// deactivate current animation loop
				window.cancelAnimationFrame(animationId);

				audio.Map.stop();
				audio.initBattle.play();
				audio.battle.play();

				battle.initiated = true;
				gsap.to("#overlappingDiv", {
					opacity: 1,
					repeat: 3,
					yoyo: true,
					duration: 0.4,
					onComplete() {
						gsap.to("#overlappingDiv", {
							opacity: 1,
							duration: 0.4,
							onComplete() {
								// activate a new animation loop
								initBattle();
								animateBattle();
								gsap.to("#overlappingDiv", {
									opacity: 0,
									duration: 0.4,
								});
							},
						});
					},
				});
				break;
			}
		}
	}

	if (keys.w.pressed && lastKey === "w") {
		player.animate = true;
		player.image = player.sprites.up;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 0, y: player_speed },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x,
							y: boundary.position.y + player_speed,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.y += player_speed;
			});
	} else if (keys.a.pressed && lastKey === "a") {
		player.animate = true;
		player.image = player.sprites.left;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: player_speed, y: 0 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x + player_speed,
							y: boundary.position.y,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.x += player_speed;
			});
	} else if (keys.s.pressed && lastKey === "s") {
		player.animate = true;
		player.image = player.sprites.down;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 0, y: -player_speed },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x,
							y: boundary.position.y - player_speed,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.y -= player_speed;
			});
	} else if (keys.d.pressed && lastKey === "d") {
		player.animate = true;
		player.image = player.sprites.right;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: -player_speed, y: 0 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x - player_speed,
							y: boundary.position.y,
						},
					},
				})
			) {
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.x -= player_speed;
			});
	}
}
let lastKey = "";
window.addEventListener("keydown", (e) => {
	// 檢查是否正在輸入文字，如果是則不處理移動事件
	if (e.target.id === "userInput") return;

	if (player.isInteracting) {
		switch (e.key) {
			case " ":
				// 如果當前有打字動畫正在進行，先完成它
				if (window.completeTypingAnimation) {
					window.completeTypingAnimation();
				}
				
				// 繼續執行對話邏輯
				player.interactionAsset.dialogueIndex++;
				const { dialogueIndex, dialogue } = player.interactionAsset;

				if (dialogueIndex === player.interactionAsset.AI_panel_index) {
					start_AI_panel(player.interactionAsset.AI_panel_type);
				} else {
					// 圖片展示
					start_AI_panel(0);
				}

				if (dialogueIndex <= dialogue.length - 1) {
					updateDialogue();
					return;
				}
				// finish conversation
				player.isInteracting = false;
				player.interactionAsset.dialogueIndex = 0;
				exit_conversation(player.interactionAsset.AI_panel_type);
				break;
		}
		return;
	}
	switch (e.key) {
		case " ":
			if (!player.interactionAsset) return;

			// beginning the conversation
			player.interactionAsset.dialogueIndex = 0;
			updateDialogue();
			document.querySelector("#characterDialogueBox").style.display = "flex";
			player.isInteracting = true;

			start_conversation(player.interactionAsset);

			// 圖片展示
			start_AI_panel(0);
			break;
		case "w":
			keys.w.pressed = true;
			lastKey = "w";
			break;
		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			break;

		case "s":
			keys.s.pressed = true;
			lastKey = "s";
			break;

		case "d":
			keys.d.pressed = true;
			lastKey = "d";
			break;
	}
});

window.addEventListener("keyup", (e) => {
	switch (e.key) {
		case "w":
			keys.w.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "s":
			keys.s.pressed = false;
			break;
		case "d":
			keys.d.pressed = false;
			break;
	}
});

const toggleMusicIcon = document.getElementById("toggleMusicIcon");
let isMusicPlaying = false; // 用於追蹤音樂是否正在播放

// 設定按鈕切換音樂播放狀態
toggleMusicIcon.addEventListener("click", () => {
	if (isMusicPlaying) {
		// 停止音樂
		audio.Map.pause();
		toggleMusicIcon.src = "./img/mainpage/playmusic-icon.png"; // 切換成播放圖示
	} else {
		// 播放音樂
		audio.Map.play();
		toggleMusicIcon.src = "./img/mainpage/pause-button.png"; // 切換成暫停圖示
	}
	isMusicPlaying = !isMusicPlaying; // 切換狀態
});
