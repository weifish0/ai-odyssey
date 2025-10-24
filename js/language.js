// 語言管理系統
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'zh-TW';
        this.translations = {
            'zh-TW': {
                // 導航欄
                'nav.home': '首頁',
                'nav.blog': 'Blog',
                'nav.login': '登入',
                'nav.loginTitle': '帳號登入',
                'nav.username': '使用者名稱/電子信箱',
                'nav.password': '密碼',
                'nav.loginButton': '登入',
                'nav.help': '遇到問題',
                'nav.register': '立即註冊',
                'nav.moreLogin': '更多登入方式',
                
                // 首頁內容
                'home.title': 'AI Odyssey',
                'home.subtitle': '開啟屬於你的 AI 冒險',
                
                // 角色頁面
                'char.ayong.name': '阿勇',
                'char.ayong.title': '光影啟蒙：解析影像奧秘',
                'char.ayong.description': '阿勇是一名充滿好奇心的年輕學徒，剛開始接觸影像辨識技術。他需要玩家幫忙整理一本《影像辨識基礎手冊》，以便教導村莊居民如何辨識常見物件。',
                'char.ayong.description_short': '對AI十分有興趣的年輕人',
                
                // 阿勇對話
                'dialogue.ayong.1': '嘿，勇者！歡迎來到光影灣！我叫阿勇，是一個對影像辨識充滿好奇的學徒。',
                'dialogue.ayong.2': '聽說你擁有影像辨識的潛力，那可是一種能看穿世界的超能力！你準備好學習了嗎？',
                'dialogue.ayong.3': '首先，我們來聊聊什麼是人工智慧吧！旁邊的影片會告訴你，人工智慧就像是讓機器學習和思考的方法。快看看吧！',
                'dialogue.ayong.4': '了解了人工智慧的基礎，是不是覺得很有趣？接下來我們來看看它的應用！',
                'dialogue.ayong.5': '當我們專注於讓機器看懂圖片的時候，就會用到影像辨識！它可以讓機器辨識出圖片中的物品，甚至了解場景哦。你也可以在旁邊的影片裡學到更多。',
                
                'char.village_chief.name': '村長',
                'char.village_chief.title': '謎影解密：揭開失落的線索',
                'char.village_chief.description': '村莊內的儲藏室裡最近出現了一些奇怪的物件，村長無法辨識它們的來源。他請求玩家協助使用影像辨識技術來找出這些物件的用途與背後的秘密。',
                'char.village_chief.description_short': '負責村莊的大小事務',
                
                // 村長對話
                'dialogue.village_chief.1': '你好，勇者！聽說你已經掌握了影像辨識的強大能力，太好了！我們村莊最近遇到了一些棘手的問題，需要你的幫助。',
                'dialogue.village_chief.2': '最近，我們的村莊經常有家畜被攻擊，村民們非常擔心。他們說有時看到像狐狸的身影，有時又像狼，但誰也說不準到底是什麼造成的。',
                'dialogue.village_chief.3': '村民們過於害怕，現在連晚上也不敢出門。我們需要確定，到底是狐狸還是狼在威脅我們，這樣才能採取正確的措施保護村莊！',
                'dialogue.village_chief.4': '幸運的是，我們有了一個強大的工具——右邊的AI魔法工具。你可以用它來幫忙訓練影像辨識模型，學習如何區分狐狸和狼。',
                'dialogue.village_chief.5': '太棒了！你的模型成功辨認出了狐狸和狼，這幫助我們大大提高了防範的能力。村民們終於能放心了，真是多虧了你的智慧！',
                'dialogue.village_chief.6': '對了，村莊中還有一位叫獨影的刺客。他最近提到他在尋找藥草時遇到了麻煩，或許他需要你的幫助。趕快去找他看看吧！',
                
                'char.duying.name': '獨影',
                'char.duying.title': '葉脈之謎：草藥師的隱秘挑戰',
                'char.duying.description': '作為村莊中的神秘守護者，獨影需要準備一批草藥來治療村莊的病人。然而，單葉與複葉的區分對他來說是一個難題。他請求玩家使用影像辨識技術幫助他快速分辨植物，讓他能在最短時間內完成草藥的準備。',
                'char.duying.description_short': '盡責的草藥師',
                
                // 獨影對話
                'dialogue.duying.1': '勇者，你來得正好！我在尋找藥草時遇到了一個難題，需要你的幫助。',
                'dialogue.duying.2': '在我們的森林裡，有許多藥用植物，有些是單子葉植物，有些是雙子葉植物。區分它們對於藥效的準確性至關重要。',
                'dialogue.duying.3': '不過，有些植物的外觀十分相似，光靠肉眼很難準確分辨。我想利用你的影像辨識技能來幫助解決這個問題。',
                'dialogue.duying.4': '此外，我還準備了一部關於被子植物的影片，能讓你更全面地了解這些植物的分類和特徵。記得觀看！',
                'dialogue.duying.5': '你知道什麼是單子葉植物和雙子葉植物嗎？旁邊的對比圖會告訴你它們的不同之處，比如葉脈、種子的結構等等。快看看吧！',
                'dialogue.duying.6': '現在，我們需要訓練一個AI模型，幫助我們準確地區分單子葉和雙子葉植物。',
                'dialogue.duying.7': '太棒了！你的模型成功幫助我辨認了植物，這將為我們的藥草配方提供極大的幫助。真是多虧了你！',
                'dialogue.duying.8': '村莊的村長一定也會為你的能力感到驕傲。現在，我得繼續我的藥草任務，而你還有更多冒險要去探索！',
                
                'char.task.name': '塔斯克',
                'char.task.title': '環保使命：守護光影的潔淨',
                'char.task.description': '作為村莊的守衛，塔斯克每天都會巡視村莊，卻發現垃圾問題日益嚴重。為了保護村莊的環境，他請玩家幫助他學會如何使用影像辨識技術來快速分類垃圾，並設置更有效的回收系統。',
                'char.task.description_short': '回收達人',
                
                // 塔斯克對話
                'dialogue.task.1': '你好，勇者！我是回收達人，負責村莊垃圾分類的工作。很高興見到你！',
                'dialogue.task.2': '你知道嗎？垃圾分類看似簡單，但如果做得不好，後果可能非常嚴重。 舉個例子，當塑膠袋、廚餘和玻璃瓶混在一起時，這些本來可以回收的材料全都變成了垃圾，最後只能被丟進垃圾場，永遠埋在地下。',
                'dialogue.task.3': '來看看這張照片吧！ 這就是垃圾不分類的結果，垃圾堆越來越高，甚至影響到周圍的土地和水源。',
                'dialogue.task.4': '我們再來看看另一張照片。這些垃圾最終可能進入海洋，威脅魚類和海鳥的生命，甚至回到我們的餐桌上。',
                'dialogue.task.5': '現在村莊裡也面臨同樣的問題。很多村民不知道如何正確分類垃圾，尤其是像塑膠袋和紙袋，鋁罐和鐵罐這些外觀相似的物品。',
                'dialogue.task.6': '我們需要你的幫助！用設計思考的方式幫助村莊解決垃圾分類的問題。',
                'dialogue.task.7': '設計思考的第一步是同理心。想像一下，如果你是村民，每天面對一大堆垃圾，該如何快速又準確地分類呢？',
                'dialogue.task.8': '接下來，我們需要定義問題。 我們來一起想想看，現在垃圾回收的最大挑戰是什麼？是分類不清，還是處理不夠高效？你的看法呢？',
                'dialogue.task.9': '現在是構思方案的時候了！或許我們可以先在生活中找塑膠瓶與紙類，拍照，讓AI學會它們的特徵。',
                'dialogue.task.10': '如果結果不夠好，別擔心！設計思考的最後一步是迭代優化。你可以添加更多圖片，幫助AI學習得更好。',
                'dialogue.task.11': '太棒了！你的模型成功了！村莊的垃圾分類效率大幅提升，環境也變得更加乾淨！村民們一定會對你感激不盡！',
                
                'char.loma.name': '洛瑪',
                'char.loma.title': '海味抉擇：烹飪的智慧試煉',
                'char.loma.description': '洛瑪法師是一名擅長烹飪的研究者，正在準備一次大型宴會。他需要精準區分魷魚與中卷，因為兩種食材的烹飪方式完全不同。他請求玩家用影像辨識技術來幫助他完成這個困難的挑戰。',
                'char.loma.description_short': '烹飪大師',
                
                // 洛瑪對話
                'dialogue.loma.1': '你好，勇者！我是洛瑪法師，負責為村莊準備宴會和管理漁獲。不過，最近我遇到了一個大麻煩！',
                'dialogue.loma.2': '漁夫們反映，海灣裡的小捲和中卷被混捕得越來越嚴重。小卷還未成熟就被捕撈，這對生態平衡和漁業可持續性都是很大的威脅。',
                'dialogue.loma.3': '我們需要你的幫助！用設計思考來幫助解決這個問題，讓我們的漁業變得更有秩序，並保護海洋生態。',
                'dialogue.loma.4': '設計思考的第一步是同理心。你能想像嗎？漁夫們要在湍急的海水中快速分辨小捲和中卷，但它們看起來幾乎一模一樣。',
                'dialogue.loma.5': '接著，我們要定義問題：我們需要一個能幫助漁夫快速且準確區分小捲和中卷的工具，減少濫捕現象。',
                'dialogue.loma.6': '接下來是構思方案。我們可以用影像辨識技術訓練一個模型，讓AI學會分辨小捲和中卷的特徵，比如身體的大小、花紋和觸腕的形狀。',
                'dialogue.loma.7': '準備好行動了嗎？使用右邊的AI魔法工具，挑選小捲和中卷的圖片，幫助AI識別它們的獨特特徵。',
                'dialogue.loma.8': '當模型訓練完成後，我們來測試一下，看看AI是否能正確分類這些魚類。記住，這是為了保護海洋的可持續發展哦！',
                'dialogue.loma.9': '如果測試結果不夠準確，別擔心！設計思考的最後一步是迭代優化。你可以挑選更多圖片，改進模型，直到達到滿意的結果。',
                'dialogue.loma.10': '太棒了！你的模型成功幫助漁夫快速分辨小捲和中卷，村莊的宴會也能有序準備了。這對海洋保護意義非凡！',
                
                'char.saen.name': '薩恩',
                'char.saen.title': '音波之舞：創造心靈樂章',
                'char.saen.description': '薩恩是一位擁有音樂魔法的靈體，能以聲波與旋律激發創作靈感。她發現港口的鐘聲失去了原有的和諧，無法再召喚漁船安全返航。她請求玩家使用音樂生成技術幫助她重新編織鐘聲的旋律，修復韻律之港的音樂之魂。',
                
                'char.xiuwen.name': '修文',
                'char.xiuwen.title': '詞語密林：語言智慧之試煉',
                'char.xiuwen.description': '修文是一位知識淵博的古代學者，負責守護詞境谷地中的語言之書。然而，近期一片詞語密林失去了其原有的結構，詞句顛倒、無法解讀。他需要玩家運用語言模型技術來重建密林的句子邏輯，恢復谷地的語言秩序。',
                
                'char.start_game': '開始遊戲',
                
                // 城市名稱
                'city.light_bay': '光影灣',
                'city.rhythm_port': '韻律之港',
                'city.word_valley': '詞境谷地',
                'city.coming_soon': '敬請期待',
                
                // 遊戲介面
                'game.user_title': '神奇弓箭手',
                'game.experience': '經驗值',
                'game.ai_bot_title': '傳說中的超級機器人，問他點什麼吧！',
                'game.input_placeholder': '輸入您的問題...',
                'game.send_button': '發送',
                'game.enemy_name': 'Draggle',
                'game.player_name': 'Emby',
                'game.attack_type': 'Attack Type',
                
                // 語言選擇器
                'lang.zh': '中文',
                'lang.en': 'English',
                
                // AI 面板相關
                'ai.video_caption': '示意影片',
                'ai.image_caption': '示意圖',
                'ai.input_placeholder': '輸入圖像生成的提示...',
                'ai.generate_image': '生成圖像',
                'ai.music_placeholder': '輸入音樂生成的提示...',
                'ai.generate_music': '生成音樂',
                'ai.data_name_placeholder': '輸入資料名稱',
                'ai.add_label': '新增標籤',
                'ai.load_model': '載入預訓練模型',
                'ai.enable_camera': '啟用攝影機',
                'ai.start_training': '開始訓練!',
                'ai.train_model': '訓練模型',
                'ai.ai_status': '選擇標籤後，載入預訓練模型，開啟你的AI影像辨識奇幻之旅吧🧚‍♀️',
                'ai.reset': '重置',
                'ai.next': '下一個'
            },
            'en': {
                // 導航欄
                'nav.home': 'Home',
                'nav.blog': 'Blog',
                'nav.login': 'Login',
                'nav.loginTitle': 'Account Login',
                'nav.username': 'Username/Email',
                'nav.password': 'Password',
                'nav.loginButton': 'Login',
                'nav.help': 'Need Help',
                'nav.register': 'Register Now',
                'nav.moreLogin': 'More Login Options',
                
                // 首頁內容
                'home.title': 'AI Odyssey',
                'home.subtitle': 'Begin Your AI Adventure',
                
                // 角色頁面
                'char.ayong.name': 'Ayong',
                'char.ayong.title': 'Light & Shadow Enlightenment: Deciphering Image Mysteries',
                'char.ayong.description': 'Ayong is a curious young apprentice who has just begun learning image recognition technology. He needs players to help him organize a "Basic Image Recognition Manual" to teach villagers how to identify common objects.',
                'char.ayong.description_short': 'A young person very interested in AI',
                
                // 阿勇對話
                'dialogue.ayong.1': 'Hey, hero! Welcome to Light Bay! I\'m Ayong, an apprentice who is very curious about image recognition.',
                'dialogue.ayong.2': 'I heard you have the potential for image recognition - that\'s like a superpower that can see through the world! Are you ready to learn?',
                'dialogue.ayong.3': 'First, let\'s talk about what artificial intelligence is! The video next to you will tell you that AI is like a method for machines to learn and think. Take a look!',
                'dialogue.ayong.4': 'Now that you understand the basics of AI, isn\'t it interesting? Next, let\'s look at its applications!',
                'dialogue.ayong.5': 'When we focus on making machines understand images, we use image recognition! It can help machines identify objects in pictures and even understand scenes. You can learn more from the video next to you.',
                'dialogue.ayong.6': 'Remember binary classification? It\'s a simple way to quickly divide things into two categories. Click the video to learn how it helps us learn further!',
                'dialogue.ayong.7': 'Classification is an important part of AI learning. Remember? Next, we need to understand data and features - this is key!',
                'dialogue.ayong.8': 'Next, we need to understand data and features. Data is the material for machine learning, and features are key information that helps with classification. The video will help you understand these important concepts!',
                'dialogue.ayong.9': 'When we organize the features, we can then classify. It\'s like labeling everything - super interesting! Check out how it\'s done in the video!',
                'dialogue.ayong.10': 'You might have heard of "supervised learning" - it\'s like a teacher teaching you how to distinguish right from wrong. The video will tell you the magic behind it!',
                'dialogue.ayong.11': 'Congratulations! You\'ve learned the basics of image recognition. Now let\'s train your own image recognition model!',
                'dialogue.ayong.12': 'Excellent! You\'re now a hero with image recognition abilities! Having this skill is like having an invincible weapon!',
                'dialogue.ayong.13': 'By the way, the village chief recently mentioned some mysterious problems. He might need your help. Go check him out!',
                
                'char.village_chief.name': 'Village Chief',
                'char.village_chief.title': 'Mystery Decryption: Uncovering Lost Clues',
                'char.village_chief.description': 'Recently, strange objects have appeared in the village storage room, and the village chief cannot identify their origin. He requests players to help him use image recognition technology to discover the purpose and secrets behind these objects.',
                'char.village_chief.description_short': 'Responsible for village affairs',
                
                // 村長對話
                'dialogue.village_chief.1': 'Hello, hero! I heard you have mastered the powerful ability of image recognition, that\'s great! Our village has recently encountered some tricky problems and needs your help.',
                'dialogue.village_chief.2': 'Recently, our village has been frequently attacked by livestock, and the villagers are very worried. They say they sometimes see figures like foxes, sometimes like wolves, but no one can tell for sure what is causing it.',
                'dialogue.village_chief.3': 'The villagers are too scared and now dare not go out even at night. We need to determine whether it\'s foxes or wolves threatening us, so we can take the right measures to protect the village!',
                'dialogue.village_chief.4': 'Fortunately, we have a powerful tool - the AI magic tool on the right. You can use it to help train an image recognition model to learn how to distinguish between foxes and wolves.',
                'dialogue.village_chief.5': 'Excellent! Your model successfully identified foxes and wolves, which greatly improved our defense capabilities. The villagers can finally rest assured, thanks to your wisdom!',
                'dialogue.village_chief.6': 'By the way, there\'s an assassin named Duying in the village. He recently mentioned that he encountered trouble while searching for herbs, and he might need your help. Go find him and take a look!',
                
                'char.duying.name': 'Duying',
                'char.duying.title': 'Leaf Vein Mystery: Herbalist\'s Secret Challenge',
                'char.duying.description': 'As a mysterious guardian of the village, Duying needs to prepare a batch of herbs to treat the villagers. However, distinguishing between simple and compound leaves is a challenge for him. He requests players to use image recognition technology to help him quickly identify plants, allowing him to complete herb preparation in the shortest time.',
                'char.duying.description_short': 'Dedicated herbalist',
                
                // 獨影對話
                'dialogue.duying.1': 'Hero, you\'ve come at the right time! I encountered a difficult problem while searching for herbs and need your help.',
                'dialogue.duying.2': 'In our forest, there are many medicinal plants, some are monocotyledons and some are dicotyledons. Distinguishing them is crucial for the accuracy of medicinal effects.',
                'dialogue.duying.3': 'However, some plants look very similar and are difficult to distinguish accurately with the naked eye. I want to use your image recognition skills to help solve this problem.',
                'dialogue.duying.4': 'In addition, I\'ve prepared a video about angiosperms that will give you a more comprehensive understanding of the classification and characteristics of these plants. Remember to watch it!',
                'dialogue.duying.5': 'Do you know what monocotyledons and dicotyledons are? The comparison chart next to you will show you their differences, such as leaf veins, seed structure, etc. Take a look!',
                'dialogue.duying.6': 'Now, we need to train an AI model to help us accurately distinguish between monocotyledons and dicotyledons.',
                'dialogue.duying.7': 'Excellent! Your model successfully helped me identify plants, which will greatly help our herbal formulas. Thanks to you!',
                'dialogue.duying.8': 'The village chief will surely be proud of your abilities. Now, I must continue my herbal tasks, and you have more adventures to explore!',
                
                'char.task.name': 'Task',
                'char.task.title': 'Environmental Mission: Protecting Light & Shadow\'s Purity',
                'char.task.description': 'As the village guard, Task patrols the village daily but finds that the garbage problem is becoming increasingly serious. To protect the village environment, he asks players to help him learn how to use image recognition technology to quickly sort garbage and set up a more effective recycling system.',
                'char.task.description_short': 'Recycling expert',
                
                // 塔斯克對話
                'dialogue.task.1': 'Hello, hero! I\'m the recycling expert, responsible for the village\'s waste sorting work. Nice to meet you!',
                'dialogue.task.2': 'You know what? Waste sorting seems simple, but if not done well, the consequences can be very serious. For example, when plastic bags, food waste, and glass bottles are mixed together, these originally recyclable materials all become garbage, and can only be thrown into landfills, buried underground forever.',
                'dialogue.task.3': 'Look at this photo! This is the result of not sorting garbage - the garbage pile gets higher and higher, even affecting the surrounding land and water sources.',
                'dialogue.task.4': 'Let\'s look at another photo. This garbage may eventually enter the ocean, threatening the lives of fish and seabirds, and even returning to our dining tables.',
                'dialogue.task.5': 'Now the village faces the same problem. Many villagers don\'t know how to properly sort garbage, especially items that look similar like plastic bags and paper bags, aluminum cans and iron cans.',
                'dialogue.task.6': 'We need your help! Use design thinking to help the village solve the waste sorting problem.',
                'dialogue.task.7': 'The first step of design thinking is empathy. Imagine if you were a villager, facing a large pile of garbage every day, how would you sort it quickly and accurately?',
                'dialogue.task.8': 'Next, we need to define the problem. Let\'s think together, what is the biggest challenge in waste recycling now? Is it unclear sorting or inefficient processing? What do you think?',
                'dialogue.task.9': 'Now it\'s time to brainstorm solutions! Maybe we can start by finding plastic bottles and paper in daily life, take photos, and let AI learn their features.',
                'dialogue.task.10': 'If the results aren\'t good enough, don\'t worry! The final step of design thinking is iterative optimization. You can add more images to help AI learn better.',
                'dialogue.task.11': 'Excellent! Your model succeeded! The village\'s waste sorting efficiency has greatly improved, and the environment has become cleaner! The villagers will definitely be grateful to you!',
                
                'char.loma.name': 'Loma',
                'char.loma.title': 'Seafood Choice: Culinary Wisdom Trial',
                'char.loma.description': 'Master Loma is a cooking researcher preparing for a grand banquet. He needs to accurately distinguish between squid and cuttlefish because the cooking methods for these two ingredients are completely different. He requests players to use image recognition technology to help him complete this challenging task.',
                'char.loma.description_short': 'Cooking master',
                
                // 洛瑪對話
                'dialogue.loma.1': 'Hello, hero! I\'m Master Loma, responsible for preparing banquets for the village and managing fishing. However, I\'ve encountered a big trouble recently!',
                'dialogue.loma.2': 'The fishermen report that the mixed fishing of small squid and cuttlefish in the bay is becoming increasingly serious. Small squid are being caught before they mature, which poses a great threat to ecological balance and fishery sustainability.',
                'dialogue.loma.3': 'We need your help! Use design thinking to help solve this problem, making our fishery more organized and protecting the marine ecosystem.',
                'dialogue.loma.4': 'The first step of design thinking is empathy. Can you imagine? Fishermen have to quickly distinguish between small squid and cuttlefish in turbulent seawater, but they look almost identical.',
                'dialogue.loma.5': 'Next, we need to define the problem: we need a tool that can help fishermen quickly and accurately distinguish between small squid and cuttlefish, reducing overfishing.',
                'dialogue.loma.6': 'Next is ideation. We can use image recognition technology to train a model that teaches AI to distinguish the characteristics of small squid and cuttlefish, such as body size, patterns, and tentacle shapes.',
                'dialogue.loma.7': 'Ready to take action? Use the AI magic tool on the right, select images of small squid and cuttlefish, and help AI identify their unique features.',
                'dialogue.loma.8': 'After the model training is complete, let\'s test it to see if AI can correctly classify these fish. Remember, this is for the sustainable development of the ocean!',
                'dialogue.loma.9': 'If the test results aren\'t accurate enough, don\'t worry! The final step of design thinking is iterative optimization. You can select more images to help AI learn better.',
                'dialogue.loma.10': 'Excellent! Your model successfully helped fishermen quickly distinguish between small squid and cuttlefish, and the village banquet can be prepared in an orderly manner. This is of great significance for marine protection!',
                
                'char.saen.name': 'Saen',
                'char.saen.title': 'Sound Wave Dance: Creating Soul Melodies',
                'char.saen.description': 'Saen is a spirit with musical magic who can inspire creativity through sound waves and melodies. She discovered that the harbor bells have lost their original harmony and can no longer summon fishing boats safely home. She requests players to use music generation technology to help her reweave the bell melodies and restore the musical soul of Rhythm Harbor.',
                
                'char.xiuwen.name': 'Xiuwen',
                'char.xiuwen.title': 'Word Forest: Language Wisdom Trial',
                'char.xiuwen.description': 'Xiuwen is a knowledgeable ancient scholar responsible for guarding the Book of Language in Word Valley. However, a word forest has recently lost its original structure, with sentences inverted and unreadable. He needs players to use language model technology to rebuild the forest\'s sentence logic and restore the valley\'s linguistic order.',
                
                'char.start_game': 'Start Game',
                
                // 城市名稱
                'city.light_bay': 'Light Bay',
                'city.rhythm_port': 'Rhythm Harbor',
                'city.word_valley': 'Word Valley',
                'city.coming_soon': 'Coming Soon',
                
                // 遊戲介面
                'game.user_title': 'Mystic Archer',
                'game.experience': 'Experience',
                'game.ai_bot_title': 'Legendary Super Robot, ask him anything!',
                'game.input_placeholder': 'Enter your question...',
                'game.send_button': 'Send',
                'game.enemy_name': 'Draggle',
                'game.player_name': 'Emby',
                'game.attack_type': 'Attack Type',
                
                // 語言選擇器
                'lang.zh': '中文',
                'lang.en': 'English',
                
                // AI 面板相關
                'ai.video_caption': 'Demo Video',
                'ai.image_caption': 'Demo Image',
                'ai.input_placeholder': 'Enter image generation prompt...',
                'ai.generate_image': 'Generate Image',
                'ai.music_placeholder': 'Enter music generation prompt...',
                'ai.generate_music': 'Generate Music',
                'ai.data_name_placeholder': 'Enter data name',
                'ai.add_label': 'Add Label',
                'ai.load_model': 'Load Pre-trained Model',
                'ai.enable_camera': 'Enable Camera',
                'ai.start_training': 'Start Training!',
                'ai.train_model': 'Train Model',
                'ai.ai_status': 'Select labels, load the pre-trained model, and start your AI image recognition adventure! 🧚‍♀️',
                'ai.reset': 'Reset',
                'ai.next': 'Next'
            }
        };
    }

    // 獲取儲存的語言設定
    getStoredLanguage() {
        return localStorage.getItem('ai-odyssey-language');
    }

    // 儲存語言設定
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('ai-odyssey-language', lang);
        this.updatePageContent();
        
        // 如果正在對話中，重新更新對話內容和 AI 面板
        if (typeof window !== 'undefined' && window.player && window.player.isInteracting && window.updateDialogue) {
            console.log('Language changed, updating dialogue and AI panel...');
            window.updateDialogue();
        }
    }

    // 獲取翻譯文字
    getText(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    // 更新頁面內容
    updatePageContent() {
        // 更新導航欄文字
        this.updateNavbarText();
        
        // 更新首頁內容
        this.updateHomeContent();
        
        // 更新語言選擇器狀態
        this.updateLanguageSelector();
    }

    // 更新導航欄文字
    updateNavbarText() {
        const homeLink = document.querySelector('.items a[href="./index.html"]');
        const blogLink = document.querySelector('.items a[href="./blog.html"]');
        const loginSpan = document.querySelector('.loginButton span');
        const loginTitle = document.querySelector('.login p');
        const usernameInput = document.querySelector('.login input[type="text"]');
        const passwordInput = document.querySelector('.login input[type="password"]');
        const loginButton = document.querySelector('.login button');
        const helpSpans = document.querySelectorAll('.help span');
        const moreText = document.querySelector('.more p');

        if (homeLink) homeLink.textContent = this.getText('nav.home');
        if (blogLink) blogLink.textContent = this.getText('nav.blog');
        if (loginSpan) loginSpan.textContent = this.getText('nav.login');
        if (loginTitle) loginTitle.textContent = this.getText('nav.loginTitle');
        if (usernameInput) usernameInput.placeholder = this.getText('nav.username');
        if (passwordInput) passwordInput.placeholder = this.getText('nav.password');
        if (loginButton) loginButton.textContent = this.getText('nav.loginButton');
        if (helpSpans[0]) helpSpans[0].textContent = this.getText('nav.help');
        if (helpSpans[1]) helpSpans[1].textContent = this.getText('nav.register');
        if (moreText) moreText.textContent = this.getText('nav.moreLogin');
    }

    // 更新首頁內容
    updateHomeContent() {
        // 更新所有帶有 data-text 屬性的元素
        const textElements = document.querySelectorAll('[data-text]');
        textElements.forEach(element => {
            const textKey = element.getAttribute('data-text');
            if (textKey) {
                // 如果是 input 元素，更新 placeholder 屬性
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = this.getText(textKey);
                } else {
                    element.textContent = this.getText(textKey);
                }
            }
        });
    }

    // 更新語言選擇器狀態
    updateLanguageSelector() {
        const languageButtons = document.querySelectorAll('.language-selector button');
        languageButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.lang === this.currentLanguage) {
                button.classList.add('active');
            }
        });
    }

    // 初始化語言系統
    init() {
        this.updatePageContent();
        this.setupLanguageSelector();
    }

    // 設置語言選擇器事件
    setupLanguageSelector() {
        // 使用事件委託來處理動態添加的按鈕
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('lang-btn')) {
                const selectedLang = event.target.dataset.lang;
                this.setLanguage(selectedLang);
            }
        });
    }
}

// 創建全域語言管理器實例
window.languageManager = new LanguageManager();

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    // 等待所有腳本載入完成後再初始化語言系統
    setTimeout(() => {
        window.languageManager.init();
        console.log('Language manager initialized after DOM loaded');
    }, 500);
});

// 延遲初始化語言管理器，確保所有腳本都已載入
setTimeout(() => {
    if (!window.languageManager.initialized) {
        window.languageManager.init();
        window.languageManager.initialized = true;
        console.log('Language manager initialized with delay');
    }
}, 1000);
