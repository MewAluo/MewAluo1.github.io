// 恐龙数据可继续添加图片，恐龙素材网站：http://www.cdkf.cn/tupian-List-285-2.html
const dinosaurs = [
    { name: '剑龙', image: 'http://www.cdkf.cn/uploadfile/20190102151931727.jpg' },
    { name: '特异龙', image: 'http://www.cdkf.cn/uploadfile/20210402123216413.jpg' },
    { name: '蛇颈龙', image: 'http://www.cdkf.cn/uploadfile/20210402123626781.jpg' },
    { name: '三角龙', image: 'http://www.cdkf.cn/uploadfile/20210324161731314.jpg' },
    { name: '始祖鸟', image: 'http://www.cdkf.cn/uploadfile/20210324162016768.jpg' },
    { name: '瑞氏幽灵猎龙', image: 'http://www.cdkf.cn/uploadfile/20220222152856524001.jpg' },
    { name: '鸭嘴龙', image: 'http://www.cdkf.cn/uploadfile/20210409155429644.jpg' },
    { name: '厚鼻龙宝宝', image: 'http://www.cdkf.cn/uploadfile/20210402124120892.jpg' }
];

// 游戏分数
let score = 0;
// 当前选择的恐龙
let currentdinosaur;
// 已回答问题数量
let questionsAnswered = 0;
// 游戏问题数量，可修改
const totalQuestions = 6;

function generateQuestion() {
    // 随机选择一个恐龙
    currentdinosaur = dinosaurs[Math.floor(Math.random() * dinosaurs.length)];
    
    // 生成错误选项
    const wrongOptions = dinosaurs
        .filter(a => a.name !== currentdinosaur.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(a => a.name);

    // 合并选项并随机排序
    const options = [currentdinosaur.name, ...wrongOptions].sort(() => Math.random() - 0.5);

    // 更新轮换图片
    document.getElementById('dinosaur-image').src = currentdinosaur.image;

    // 生成选项按钮
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = options
        .map(option => `<button class="option-btn" onclick="checkAnswer('${option}')">${option}</button>`)
        .join('');
}

// 检查答案, 正确+10分
function checkAnswer(selectedAnswer) {
    questionsAnswered++;
    if (selectedAnswer === currentdinosaur.name) {
        score += 10;
        document.getElementById('score').textContent = score;
    }

    if (questionsAnswered < totalQuestions) {
        generateQuestion();
    } else {
        endGame();
    }
}

// 游戏结束
function endGame() {
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    document.getElementById('final-score').textContent = score;
}

// 开始游戏
generateQuestion();