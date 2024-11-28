const villagerImg = new Image()
villagerImg.src = './img/villager/i.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/i.png'

const wizardImg = new Image()
wizardImg.src = './img/wizard/idle.png'

const assassinImg = new Image()
assassinImg.src = './img/assassin/idle.png'

const knightImg = new Image()
knightImg.src = './img/knight/idle.png'

const characters_data = {
  villager1: (position)=>({
    image: villagerImg,
    style_image: './img/villager/villager_style.png',
    name: '阿勇',
    description: '對AI十分有興趣的年輕人',
    AI_panel_index: 6,
    AI_panel_type: 2,
    CV_data_num: 0,
    CV_data_label: ["狼","狐狸"],
    position,
    frames: {
      max: 4,
      hold: 60
    },
    scale: 3,
    animate: true,
    dialogue: [
      '你好，冒險者！我們的村莊最近遭遇了一些麻煩，特別是在森林邊緣。',
      '有隻狼經常在夜裡出沒，嚇壞了村民們，我們需要辨別牠的位置來保護大家。',
      '不過，有時候在昏暗中也會誤以為是狐狸。牠們的身影很難分清。',
      '幸好，我們村裡有一個影像辨識模型，能幫助我們快速判斷到底是狼還是狐狸。',
      '影像辨識模型就像一雙智慧的眼睛，能看出細微的差異。',
      '我們需要先將模型訓練好，提供一些狼和狐狸的影像給它學習。',
      '來吧，跟我一起操作！首先，把這些拍攝的狼和狐狸的影像加入訓練模型。',
      '當模型完成訓練後，你就可以讓它幫助我們分析新影像了。',
      '看看這些模糊的森林攝影畫面，試試用模型來判斷這次出現的是狼還是狐狸吧！',
      '如果你成功了，就能幫助村莊守護這片安寧！讓我們一起試試看吧！'
    ],
    conversation_img_data: [
      './conversation_img_data/1.png',
      'https://www.youtube.com/embed/GNUdbs8MWcs',
      'https://www.youtube.com/embed/GNUdbs8MWcs',
    ]
  }),
  oldman: (position)=>({
    image: oldManImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '村長',
    description: '負責村莊的大小事務',
    style_image: './img/oldMan/oldman.png',
    position,
    scale: 3,
    animate: true,
    dialogue: [
      '歡迎，冒險者！阿健讓你來找我了解影像辨識？',
      '影像辨識就像是教機器‘看見’東西。它能幫助我們分辨不同的物體和場景。',
      '比如說，我們可以訓練影像辨識系統，識別村外常出現的野狼和狐狸。',
      '影像辨識系統會將攝影機拍到的畫面，轉換成資料，並進行分析。',
      '這樣我們就能自動識別不同物體，並且及時做出反應。',
      '影像辨識常使用AI技術訓練模型。模型越準確，識別就越精確。',
      '所以，如果我們教這個系統更多影像，它的識別能力會越來越強。',
      '未來，我們也希望這項技術能幫助村民更好地保護自己！有興趣一起試試嗎？'
    ]
  }),
  wizard: (position)=>({
    image: wizardImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '村長',
    description: '負責村莊的大小事務',
    style_image: './img/oldMan/oldman.png',
    position,
    scale: 3,
    animate: true,
    dialogue: [
      '歡迎，冒險者！阿健讓你來找我了解影像辨識？',
      '影像辨識就像是教機器‘看見’東西。它能幫助我們分辨不同的物體和場景。',
      '比如說，我們可以訓練影像辨識系統，識別村外常出現的野狼和狐狸。',
      '影像辨識系統會將攝影機拍到的畫面，轉換成資料，並進行分析。',
      '這樣我們就能自動識別不同物體，並且及時做出反應。',
      '影像辨識常使用AI技術訓練模型。模型越準確，識別就越精確。',
      '所以，如果我們教這個系統更多影像，它的識別能力會越來越強。',
      '未來，我們也希望這項技術能幫助村民更好地保護自己！有興趣一起試試嗎？'
    ]
  }),
  assassin: (position)=>({
    image: assassinImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '村長',
    description: '負責村莊的大小事務',
    style_image: './img/oldMan/oldman.png',
    position,
    scale: 3,
    animate:true,
    dialogue: [
      '歡迎，冒險者！阿健讓你來找我了解影像辨識？',
      '影像辨識就像是教機器‘看見’東西。它能幫助我們分辨不同的物體和場景。',
      '比如說，我們可以訓練影像辨識系統，識別村外常出現的野狼和狐狸。',
      '影像辨識系統會將攝影機拍到的畫面，轉換成資料，並進行分析。',
      '這樣我們就能自動識別不同物體，並且及時做出反應。',
      '影像辨識常使用AI技術訓練模型。模型越準確，識別就越精確。',
      '所以，如果我們教這個系統更多影像，它的識別能力會越來越強。',
      '未來，我們也希望這項技術能幫助村民更好地保護自己！有興趣一起試試嗎？'
    ]
  }),
  knight: (position)=>({
    image: knightImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '村長',
    description: '負責村莊的大小事務',
    style_image: './img/oldMan/oldman.png',
    position,
    scale: 3,
    animate:true,
    dialogue: [
      '歡迎，冒險者！阿健讓你來找我了解影像辨識？',
      '影像辨識就像是教機器‘看見’東西。它能幫助我們分辨不同的物體和場景。',
      '比如說，我們可以訓練影像辨識系統，識別村外常出現的野狼和狐狸。',
      '影像辨識系統會將攝影機拍到的畫面，轉換成資料，並進行分析。',
      '這樣我們就能自動識別不同物體，並且及時做出反應。',
      '影像辨識常使用AI技術訓練模型。模型越準確，識別就越精確。',
      '所以，如果我們教這個系統更多影像，它的識別能力會越來越強。',
      '未來，我們也希望這項技術能幫助村民更好地保護自己！有興趣一起試試嗎？'
    ]
  }),
}
