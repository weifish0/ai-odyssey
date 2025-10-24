// ref: https://codelabs.developers.google.com/tensorflowjs-transfer-learning-teachable-machine?authuser=0#0
const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;
const COLOR_CHANNEL = 3; // RGB
const EPOCHS_NUM = 10;

let CLASS_NAMES = [];

// camera
let videoPlaying = false;

let mobilenet = undefined;
let gatherDataState = STOP_DATA_GATHER;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let examplesCount = [];
let predict = false;
let model;

let STATUS;
let VIDEO;
let ENABLE_CAM_BUTTON;
let LOAD_IMAGE_MODEL;
let TRAIN_BUTTON;

let dataCollectorContainer;
let addInput;
let addButton;
let nextClassIndex = 0; // 從0開始計算 class 數量

// static img recognition
let currentImageIndex = 1;
const totalImages = 10;
let static_img;
let imagePreviewContainer;
let CV_folder_num;
let class1Button;
let class2Button;
let resetImgLabel;
let nextVideoButton;
let currentVideoIndex = 0;

function loadImageRecognition() {
	STATUS = document.getElementById("aiStatus");
	VIDEO = document.getElementById("webcam");
	ENABLE_CAM_BUTTON = document.getElementById("enableCam");
	LOAD_IMAGE_MODEL = document.getElementById("loadImageModel");
	TRAIN_BUTTON = document.getElementById("train");

	ENABLE_CAM_BUTTON.addEventListener("click", (e) => {
		toggleCam();
		e.target.blur(); // 移除焦點
	});

	TRAIN_BUTTON.addEventListener("click", (e) => {
		trainAndPredict();
		e.target.blur();
	});

	LOAD_IMAGE_MODEL.addEventListener("click", (e) => {
		loadImageModel(CLASS_NAMES.length);
		e.target.blur();
	});

	dataCollectorContainer = document.getElementById("dataCollector-container");
	addInput = document.getElementById("addInput");
	addButton = document.getElementById("addButton");

	// 監聽全域範圍的 mouseup
	window.addEventListener("mouseup", () => {
		gatherDataState = STOP_DATA_GATHER; // 停止蒐集資料
	});
	new_data_button();
}


function loadStaticImageRecognition(folderNum) {
	CV_folder_num = folderNum
	STATUS = document.getElementById("aiStatus");
	imagePreviewContainer = document.getElementById(
		"imagePreviewContainer"
	);
	class1Button = document.getElementById("labelClass1");
	class2Button = document.getElementById("labelClass2");
	resetImgLabel = document.getElementById("resetImgLabel")

	CLASS_NAMES.push(player.interactionAsset.CV_data_label[0]);
	CLASS_NAMES.push(player.interactionAsset.CV_data_label[1]);

	updateImage();

	class1Button.addEventListener("click", (e) =>{
		handleLabelClick(0)
		e.target.blur()
	});
	class2Button.addEventListener("click", (e) =>{
		handleLabelClick(1)
		e.target.blur()
	});
	resetImgLabel.addEventListener("click", (e) =>{
		resetStaticImageRecognition()
		e.target.blur()
	})

	loadImageModel(CLASS_NAMES.length);
}

function resetStaticImageRecognition(){
	currentImageIndex=1
	reset()
	class1Button.style.display = "block"
	class2Button.style.display = "block"
	TRAIN_BUTTON.style.display = "none"
	nextVideoButton.style.display = "none"
	currentVideoIndex = 0
	updateImage()
}

function updateImage() {
	imagePreviewContainer.innerHTML = "";
	static_img = document.createElement("img");
	static_img.src = `./CV-data/${CV_folder_num}/train/image${currentImageIndex}.jpg`;
	imagePreviewContainer.appendChild(static_img);
}

function playVideo() {
    // 清空 container 的內容
    imagePreviewContainer.innerHTML = "";

    // 建立 VIDEO 元素
    VIDEO = document.createElement("video");
    VIDEO.id = "videoPreview";
    VIDEO.src = `./CV-data/${CV_folder_num}/valid/${CLASS_NAMES[0]}.mp4`;
    VIDEO.controls = true; // 添加控制功能
    VIDEO.autoplay = true; // 自動播放
	imagePreviewContainer.appendChild(VIDEO);

    // 建立切換按鈕
    nextVideoButton = document.getElementById("nextVideoButton")
	nextVideoButton.style.display = "block"

    // 添加按鈕點擊事件，切換影片
    nextVideoButton.addEventListener("click", () => {
        currentVideoIndex++;
        if (currentVideoIndex >= CLASS_NAMES.length) {
            currentVideoIndex = 0; // 如果超出範圍，循環播放
        }
        VIDEO.src = `./CV-data/${CV_folder_num}/valid/${CLASS_NAMES[currentVideoIndex]}.mp4`;
        VIDEO.play(); // 切換後自動播放
    });
}

function handleLabelClick(label_num) {
	let imageFeatures = tf.tidy(function () {
		let staticIMGFrameAsTensor = tf.browser.fromPixels(static_img);
		let resizedTensorFrame = tf.image.resizeBilinear(
			staticIMGFrameAsTensor,
			[MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
			true
		);
		let normalizedTensorFrame = resizedTensorFrame.div(255);
		return mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();
	});

	trainingDataInputs.push(imageFeatures);
	trainingDataOutputs.push(label_num);
	// Intialize array index element if currently undefined.
	if (examplesCount[label_num] === undefined) {
		examplesCount[label_num] = 0;
	}
	examplesCount[label_num]++;

	// 刷新 aistatus
	STATUS.innerText = "";
	for (let n = 0; n < CLASS_NAMES.length; n++) {
		if (examplesCount[n] === undefined) {
			STATUS.innerText += CLASS_NAMES[n] + " 資料數量: " + 0 + ".\n";
		} else {
			STATUS.innerText +=
				CLASS_NAMES[n] + " 資料數量: " + examplesCount[n] + ".\n";
		}
	}

	if (currentImageIndex < totalImages) {
		currentImageIndex++;
		updateImage();
	} else {
		STATUS.innerText = "已標記完所有圖片🎉"

		class1Button.style.display = "none"
		class2Button.style.display = "none"

		TRAIN_BUTTON = document.getElementById("train");
		TRAIN_BUTTON.style.display="block"
		TRAIN_BUTTON.addEventListener("click", (e) => {
			playVideo()
			TRAIN_BUTTON.style.display="none"
			trainAndPredict();
			e.target.blur();
		});
	}
}


function new_data_button() {
	addButton.addEventListener("click", () => {
		// 獲取輸入的資料名稱
		const dataName = addInput.value.trim();
		if (!dataName) {
			alert("請輸入資料名稱！");
			return;
		}

		// 創建新按鈕
		const newButton = document.createElement("button");
		newButton.classList.add("dataCollector");
		newButton.setAttribute("data-1hot", nextClassIndex);
		newButton.setAttribute("data-name", dataName);
		newButton.textContent = `蒐集資料：${dataName}`;

		// 將按鈕加入容器
		dataCollectorContainer.appendChild(newButton);

		// 更新 CLASS_NAMES 並添加事件監聽器
		CLASS_NAMES.push(dataName);
		newButton.addEventListener("mousedown", gatherDataForClass);
		newButton.addEventListener("mouseup", gatherDataForClass);

		// 清空輸入框
		addInput.value = "";

		// 更新索引
		nextClassIndex++;
	});
}

function hasGetUserMedia() {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function toggleCam() {
	if (videoPlaying) {
		stopCamera();
	} else {
		enableCam();
	}
}

function enableCam() {
	if (hasGetUserMedia()) {
		// getUsermedia parameters.
        const constraints = {
            video: {
                width: 640,
                height: 480,
            }, // 確保 `video` 的屬性在此指定
        };
		// Activate the webcam stream.
		navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
			VIDEO.srcObject = stream;
			VIDEO.addEventListener("loadeddata", function (e) {
				videoPlaying = true;
				ENABLE_CAM_BUTTON.innerText = "重置";
				e.target.blur(); // 移除焦點
			});
		});
	} else {
		console.warn("⚠️無法成功獲取攝影機權限");
	}
}

function stopCamera() {
	if (VIDEO.srcObject) {
		let tracks = VIDEO.srcObject.getTracks();
		tracks.forEach((track) => track.stop());
		VIDEO.srcObject = null;
		videoPlaying = false;
		ENABLE_CAM_BUTTON.innerText = "啟用攝影機";
	}
	reset();
}

async function trainAndPredict() {
	predict = false;
	tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);
	let outputsAsTensor = tf.tensor1d(trainingDataOutputs, "int32");
	let oneHotOutputs = tf.oneHot(outputsAsTensor, CLASS_NAMES.length);
	let inputsAsTensor = tf.stack(trainingDataInputs);

	let results = await model.fit(inputsAsTensor, oneHotOutputs, {
		shuffle: true,
		batchSize: 5,
		epochs: EPOCHS_NUM,
		callbacks: { onEpochEnd: logProgress },
	});

	outputsAsTensor.dispose();
	oneHotOutputs.dispose();
	inputsAsTensor.dispose();
	predict = true;
	predictLoop();
}

function predictLoop() {
	if (predict) {
		if (VIDEO.readyState >= 2) { // readyState 2 表示已加載足夠的數據
		tf.tidy(function () {
			let videoFrameAsTensor = tf.browser.fromPixels(VIDEO).div(255);
			let resizedTensorFrame = tf.image.resizeBilinear(
				videoFrameAsTensor,
				[MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
				true
			);

			let imageFeatures = mobilenet.predict(resizedTensorFrame.expandDims());
			let prediction = model.predict(imageFeatures).squeeze();
			let highestIndex = prediction.argMax().arraySync();
			let predictionArray = prediction.arraySync();

			STATUS.innerText =
				"預測: " +
				CLASS_NAMES[highestIndex] +
				" 有 " +
				Math.floor(predictionArray[highestIndex] * 100) +
				"% 信心";
		});
	}

		window.requestAnimationFrame(predictLoop);
	}
}

function logProgress(epoch, logs) {
	STATUS.innerText = `模型訓練中: ${epoch}/${EPOCHS_NUM}...`;
	console.log("Data for epoch " + epoch, logs);
}

function reset() {
	predict = false;
	examplesCount.length = 0;
	let before_memory = tf.memory().numBytes;

	for (let i = 0; i < trainingDataInputs.length; i++) {
		trainingDataInputs[i].dispose();
	}
	trainingDataInputs.length = 0;
	trainingDataOutputs.length = 0;
	STATUS.innerText = `已清除快取 ${
		(before_memory - tf.memory().numBytes) / 1000
	}KB 🧹`;

	console.log(`Cleaned ${(before_memory - tf.memory().numBytes) / 1000}KB`);
}

function gatherDataForClass() {
	let classNumber = parseInt(this.getAttribute("data-1hot"));
	gatherDataState =
		gatherDataState === STOP_DATA_GATHER ? classNumber : STOP_DATA_GATHER;
	dataGatherLoop();
}

function dataGatherLoop() {
	if (videoPlaying && gatherDataState !== STOP_DATA_GATHER) {
		let imageFeatures = tf.tidy(function () {
			let videoFrameAsTensor = tf.browser.fromPixels(VIDEO);
			let resizedTensorFrame = tf.image.resizeBilinear(
				videoFrameAsTensor,
				[MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
				true
			);
			let normalizedTensorFrame = resizedTensorFrame.div(255);
			return mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();
		});

		trainingDataInputs.push(imageFeatures);
		trainingDataOutputs.push(gatherDataState);

		// Intialize array index element if currently undefined.
		if (examplesCount[gatherDataState] === undefined) {
			examplesCount[gatherDataState] = 0;
		}
		examplesCount[gatherDataState]++;

		STATUS.innerText = "";
		for (let n = 0; n < CLASS_NAMES.length; n++) {
			if (examplesCount[n] === undefined) {
				STATUS.innerText += CLASS_NAMES[n] + " 資料數量: " + 0 + ".\n";
			} else {
				STATUS.innerText +=
					CLASS_NAMES[n] + " 資料數量: " + examplesCount[n] + ".\n";
			}
		}
		window.requestAnimationFrame(dataGatherLoop);
	}
}

// Loads the MobileNet model and warms it up so ready for use.
async function loadMobileNetFeatureModel() {
	const URL =
		"https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";

	mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
	STATUS.innerText = "預訓練模型成功載入🎉";

	// Warm up the model by passing zeros through it once.
	tf.tidy(function () {
		let answer = mobilenet.predict(
			tf.zeros([
				1,
				MOBILE_NET_INPUT_HEIGHT,
				MOBILE_NET_INPUT_WIDTH,
				COLOR_CHANNEL,
			])
		);
		console.log(answer.shape);
	});
}

function loadImageModel(model_length) {
	STATUS.innerText = "等待 AI 預模型載入...";

	// Call the function immediately to start loading.
	loadMobileNetFeatureModel();

	model = tf.sequential();
	model.add(
		tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" })
	);
	model.add(tf.layers.dense({ units: model_length, activation: "softmax" }));

	model.summary();

	// Compile the model with the defined optimizer and specify a loss function to use.
	model.compile({
		// Adam changes the learning rate over time which is useful.
		optimizer: "adam",
		// Use the correct loss function. If 2 classes of data, must use binaryCrossentropy.
		// Else categoricalCrossentropy is used if more than 2 classes.
		loss: model_length === 2 ? "binaryCrossentropy" : "categoricalCrossentropy",
		// As this is a classification problem you can record accuracy in the logs too!
		metrics: ["accuracy"],
	});
}

function exit_image_recognition() {
	stopCamera();
	STATUS.innerText = "載入預訓練模型，開啟你的AI影像辨識奇幻之旅吧⭐️";
}