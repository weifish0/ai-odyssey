// ref: https://codelabs.developers.google.com/tensorflowjs-transfer-learning-teachable-machine?authuser=0#0
const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;
const CLASS_NAMES = [];
const COLOR_CHANNEL = 3; // RGB
const EPOCHS_NUM = 10;

// camera
let videoPlaying = false;

let mobilenet = undefined;
let gatherDataState = STOP_DATA_GATHER;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let examplesCount = [];
let predict = false;
let model;

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
		loadImageModel();
		e.target.blur();
	});

  init_dataCollectorButtons()
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
			video: true,
			width: 640,
			height: 480,
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

function init_dataCollectorButtons() {
	let dataCollectorButtons = document.querySelectorAll("button.dataCollector");
	for (let i = 0; i < dataCollectorButtons.length; i++) {
		dataCollectorButtons[i].addEventListener("mousedown", gatherDataForClass);
		dataCollectorButtons[i].addEventListener("mouseup", gatherDataForClass);
		// Populate the human readable names for classes.
		CLASS_NAMES.push(dataCollectorButtons[i].getAttribute("data-name"));
	}
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

function loadImageModel() {
	STATUS.innerText = "等待 AI 預模型載入...";

	// Call the function immediately to start loading.
	loadMobileNetFeatureModel();

	model = tf.sequential();
	model.add(
		tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" })
	);
	model.add(
		tf.layers.dense({ units: CLASS_NAMES.length, activation: "softmax" })
	);

	model.summary();

	// Compile the model with the defined optimizer and specify a loss function to use.
	model.compile({
		// Adam changes the learning rate over time which is useful.
		optimizer: "adam",
		// Use the correct loss function. If 2 classes of data, must use binaryCrossentropy.
		// Else categoricalCrossentropy is used if more than 2 classes.
		loss:
			CLASS_NAMES.length === 2
				? "binaryCrossentropy"
				: "categoricalCrossentropy",
		// As this is a classification problem you can record accuracy in the logs too!
		metrics: ["accuracy"],
	});
}

function exit_image_recognition() {
	stopCamera();
	STATUS.innerText = "載入預訓練模型，開啟你的AI影像辨識奇幻之旅吧⭐️";
}
