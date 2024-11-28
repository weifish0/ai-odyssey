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
    AI_panel_index: 10,
    AI_panel_type: 1,
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
      "嘿，勇者！歡迎來到光影灣！我叫阿勇，是一個對影像辨識充滿好奇的學徒。",
      "聽說你擁有影像辨識的潛力，那可是一種能看穿世界的超能力！你準備好學習了嗎？",
      "首先，我們來聊聊什麼是人工智慧吧！旁邊的影片會告訴你，人工智慧就像是讓機器學習和思考的方法。快看看吧！",
      "了解了人工智慧的基礎，是不是覺得很有趣？接下來我們來看看它的應用！",
      "當我們專注於讓機器看懂圖片的時候，就會用到影像辨識！它可以讓機器辨識出圖片中的物品，甚至了解場景哦。你也可以在旁邊的影片裡學到更多。",
      "還記得二分法嗎？這是一種簡單的分類方式，幫助我們快速把事情分成兩類。快點擊影片，了解它怎麼幫助我們進一步學習吧！",
      "分類是人工智慧學習的重要環節。記住了嗎？接下來我們要認識數據和特徵，這是關鍵哦！",
      "接下來，我們需要認識數據和特徵。數據是機器學習的材料，而特徵是能幫助分類的關鍵資訊。影片會幫你理解這些重要概念！",
      "當我們整理好特徵後，就可以進行分類了。這就像給每件東西貼上標籤一樣，超有趣的！快看看影片裡是怎麼做到的！",
      "你可能會聽說“監督式學習”，其實這就像老師教你如何分辨對與錯。影片裡會告訴你這背後的魔法！",
      '恭喜你，學會了影像辨識的基礎知識，現在來訓練一個你自己的影像辨識模型吧!',
      "太棒了！你現在已經是一個具有影像辨識能力的勇者了！擁有了這項技能，就像拿到了一把無敵的武器！",
      "對了，村長最近提到有些神秘的問題，他可能需要你的幫助。趕快去找他看看吧！"
    ],
    conversation_img_data: [
      './conversation_img_data/villager/0.png',
      './conversation_img_data/villager/1.png',
      'https://www.youtube.com/embed/GNUdbs8MWcs',
      './conversation_img_data/villager/4.png', // 影片間的銜接示意圖
      'https://www.youtube.com/embed/F2Hy33q_7Gk',
      'https://www.youtube.com/embed/0IJwzvwQAno',
      './conversation_img_data/villager/5.png',
      'https://www.youtube.com/embed/M8Zz5t-G0_c',
      'https://www.youtube.com/embed/kVU7GuTu5hg',
      'https://www.youtube.com/embed/y_GfibE4eYg',
      '',
      './conversation_img_data/villager/2.png',
      './conversation_img_data/villager/3.png'
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
    style_image: './img/oldMan/oldMan_style.png',
    position,  
    scale: 3,
    animate: true,
    AI_panel_index: 3,
    AI_panel_type: 2,
    CV_data_num: 0,
    CV_data_label: ["狼","狐狸"],
    dialogue: [
      "你好，勇者！聽說你已經掌握了影像辨識的強大能力，太好了！我們村莊最近遇到了一些棘手的問題，需要你的幫助。",
      "最近，我們的村莊經常有家畜被攻擊，村民們非常擔心。他們說有時看到像狐狸的身影，有時又像狼，但誰也說不準到底是什麼造成的。",
      "村民們過於害怕，現在連晚上也不敢出門。我們需要確定，到底是狐狸還是狼在威脅我們，這樣才能採取正確的措施保護村莊！",
      "幸運的是，我們有了一個強大的工具——右邊的AI魔法工具。你可以用它來幫忙訓練影像辨識模型，學習如何區分狐狸和狼。",
      "太棒了！你的模型成功辨認出了狐狸和狼，這幫助我們大大提高了防範的能力。村民們終於能放心了，真是多虧了你的智慧！",
      "對了，村莊中還有一位叫獨影的刺客。他最近提到他在尋找藥草時遇到了麻煩，或許他需要你的幫助。趕快去找他看看吧！"
    ],
    conversation_img_data: [
      './conversation_img_data/oldMan/0.png',
      './conversation_img_data/oldMan/1.png',
      './conversation_img_data/oldMan/2.png',
      '',
      './conversation_img_data/oldMan/3.png',
      './conversation_img_data/oldMan/4.png',
    ]
  }),
  wizard: (position)=>({
    image: wizardImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '洛瑪',
    description: '烹飪大師',
    style_image: './img/wizard/wizard_style.png',
    position,
    scale: 3,
    animate: true,
    AI_panel_index: 3,
    AI_panel_type: 0,
    dialogue: [
      "你好，勇者！我是洛瑪法師，負責為村莊準備宴會和管理漁獲。不過，最近我遇到了一個大麻煩！",
      "漁夫們反映，海灣裡的小捲和中卷被混捕得越來越嚴重。小卷還未成熟就被捕撈，這對生態平衡和漁業可持續性都是很大的威脅。",
      "我們需要你的幫助！用設計思考來幫助解決這個問題，讓我們的漁業變得更有秩序，並保護海洋生態。",
      "設計思考的第一步是同理心。你能想像嗎？漁夫們要在湍急的海水中快速分辨小捲和中卷，但它們看起來幾乎一模一樣。",
      "接著，我們要定義問題：我們需要一個能幫助漁夫快速且準確區分小捲和中卷的工具，減少濫捕現象。",
      "接下來是構思方案。我們可以用影像辨識技術訓練一個模型，讓AI學會分辨小捲和中卷的特徵，比如身體的大小、花紋和觸腕的形狀。",
      "準備好行動了嗎？使用右邊的AI魔法工具，挑選小捲和中卷的圖片，幫助AI識別它們的獨特特徵。",
      "當模型訓練完成後，我們來測試一下，看看AI是否能正確分類這些魚類。記住，這是為了保護海洋的可持續發展哦！",
      "如果測試結果不夠準確，別擔心！設計思考的最後一步是迭代優化。你可以挑選更多圖片，改進模型，直到達到滿意的結果。",
      "太棒了！你的模型成功幫助漁夫快速分辨小捲和中卷，村莊的宴會也能有序準備了。這對海洋保護意義非凡！",
    ],
    conversation_img_data: [
      './conversation_img_data/wizard/0.png',
      './conversation_img_data/wizard/1.png',
    ]

  }),
  assassin: (position)=>({
    image: assassinImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '獨影',
    description: '盡責的草藥師',
    style_image: './img/assassin/assassin_style.png',
    position,
    scale: 3,
    animate:true,
    AI_panel_index: 5,
    AI_panel_type: 2,
    CV_data_num: 1,
    CV_data_label: ["雙子葉","單子葉"],
    dialogue: [
      "勇者，你來得正好！我在尋找藥草時遇到了一個難題，需要你的幫助。",
      "在我們的森林裡，有許多藥用植物，有些是單子葉植物，有些是雙子葉植物。區分它們對於藥效的準確性至關重要。",
      "不過，有些植物的外觀十分相似，光靠肉眼很難準確分辨。我想利用你的影像辨識技能來幫助解決這個問題。",
      "此外，我還準備了一部關於被子植物的影片，能讓你更全面地了解這些植物的分類和特徵。記得觀看！",
      "你知道什麼是單子葉植物和雙子葉植物嗎？旁邊的對比圖會告訴你它們的不同之處，比如葉脈、種子的結構等等。快看看吧！",
      "現在，我們需要訓練一個AI模型，幫助我們準確地區分單子葉和雙子葉植物。",
      "太棒了！你的模型成功幫助我辨認了植物，這將為我們的藥草配方提供極大的幫助。真是多虧了你！",
      "村莊的村長一定也會為你的能力感到驕傲。現在，我得繼續我的藥草任務，而你還有更多冒險要去探索！"
    ],
    conversation_img_data: [
      './conversation_img_data/assassin/0.png',
      './conversation_img_data/assassin/1.png',
      './conversation_img_data/assassin/2.png',
      'https://www.youtube.com/embed/PAGVQvhViM0',
      './conversation_img_data/assassin/3.png',
      '',
      './conversation_img_data/assassin/4.png',
      './conversation_img_data/assassin/5.png',
    ]
  }),
  knight: (position)=>({
    image: knightImg,
    frames: {
      max: 4,
      hold: 60
    },
    name: '塔斯克',
    description: '回收達人',
    style_image: './img/knight/knight_style.png',
    position,
    scale: 3,
    animate:true,
    AI_panel_index: 9,
    AI_panel_type: 1,
    dialogue: [
      "你好，勇者！我是回收達人，負責村莊垃圾分類的工作。很高興見到你！",
      "你知道嗎？垃圾分類看似簡單，但如果做得不好，後果可能非常嚴重。 舉個例子，當塑膠袋、廚餘和玻璃瓶混在一起時，這些本來可以回收的材料全都變成了垃圾，最後只能被丟進垃圾場，永遠埋在地下。", 
      "來看看這張照片吧！ 這就是垃圾不分類的結果，垃圾堆越來越高，甚至影響到周圍的土地和水源。",
      "我們再來看看另一張照片。這些垃圾最終可能進入海洋，威脅魚類和海鳥的生命，甚至回到我們的餐桌上。",
      "現在村莊裡也面臨同樣的問題。很多村民不知道如何正確分類垃圾，尤其是像塑膠袋和紙袋，鋁罐和鐵罐這些外觀相似的物品。",
      "我們需要你的幫助！用設計思考的方式幫助村莊解決垃圾分類的問題。",
      "設計思考的第一步是同理心。想像一下，如果你是村民，每天面對一大堆垃圾，該如何快速又準確地分類呢？",
      "接下來，我們需要定義問題。 我們來一起想想看，現在垃圾回收的最大挑戰是什麼？是分類不清，還是處理不夠高效？你的看法呢？",
      "現在是構思方案的時候了！或許我們可以先在生活中找塑膠瓶與紙類，拍照，讓AI學會它們的特徵。",
      "如果結果不夠好，別擔心！設計思考的最後一步是迭代優化。你可以添加更多圖片，幫助AI學習得更好。",
      "太棒了！你的模型成功了！村莊的垃圾分類效率大幅提升，環境也變得更加乾淨！村民們一定會對你感激不盡！",
    ],
    conversation_img_data: [
    './conversation_img_data/knight/0.png',
    './conversation_img_data/knight/1.png',
    './conversation_img_data/knight/2.png',
    './conversation_img_data/knight/3.png',
    './conversation_img_data/knight/4.png',
    './conversation_img_data/knight/5.png',
    './conversation_img_data/knight/6.png',
    './conversation_img_data/knight/9.png',
    './conversation_img_data/knight/7.png',
    '',
    './conversation_img_data/knight/8.png',
    ]
  }),
}
