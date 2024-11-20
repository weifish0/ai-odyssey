const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

const characters_data = {
  villager1: (position)=>({
    image: villagerImg,
    style_image: '/img/villager/villager_style.png',
    name: '阿勇',
    description: '對AI十分有興趣的年輕人',
    AI_panel_index: 3,
    position,
    frames: {
      max: 4,
      hold: 60
    },
    scale: 3,
    animate: true,
    dialogue: [
      '嘿，年輕的冒險者！你知道嗎，村莊最近遇到了一些奇怪的現象。',
      '我們常常需要辨別村外的物體，有時是可疑的動物，有時是遠方的陌生人。',
      '但靠肉眼並不總是可靠，特別是距離較遠或環境昏暗時。',
      '但靠肉眼並不總是可靠，特別是距離較遠或環境昏暗時。',
      '我聽說有一種技術叫做影像辨識，能夠幫助我們分辨出不同的物體。',
      '你聽過影像辨識嗎？它可以透過分析影像，幫助我們識別特定的物體。',
      '如果你想了解更多，去找村裡的村長，他研究過影像辨識技術！'
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
    style_image: '/img/oldMan/oldman.png',
    position,
    scale: 3,
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
  })
}
