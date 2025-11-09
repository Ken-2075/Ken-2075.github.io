// 最初にカテゴリーのデータを設定
const categories = ["ゲーム", "動物", "スポーツ"];

// ページが読み込まれた時にカテゴリーを読み込み
window.onload = function() {
    const categorySelect = document.getElementById('category');

    // 初期のカテゴリーを追加
    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // ローカルストレージから保存されたクイズデータを取得
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    
    // ページに保存されたクイズをセット
    if (savedQuizzes) {
        displaySavedQuizzes(savedQuizzes);
    }
};

// カテゴリー追加ボタンがクリックされたとき
document.getElementById('addCategoryButton').addEventListener('click', function() {
    const newCategoryInput = document.getElementById('newCategory');
    const newCategory = newCategoryInput.value.trim();

    // 新しいカテゴリーが入力された場合
    if (newCategory && !categories.includes(newCategory)) {
        // カテゴリーをリストに追加
        categories.push(newCategory);

        // セレクトボックスに新しいカテゴリーを追加
        const option = document.createElement('option');
        option.value = newCategory;
        option.textContent = newCategory;
        document.getElementById('category').appendChild(option);

        // 入力フィールドをクリア
        newCategoryInput.value = '';
    } else {
        alert('カテゴリーがすでに存在するか、入力が無効です。');
    }
});

// クイズ登録ボタンがクリックされた時
function submitQuiz() {
    // フォームの入力内容を取得
    const category = document.getElementById('category').value;
    const question = document.getElementById('question').value;
    const choice1 = document.getElementById('choice1').value;
    const choice2 = document.getElementById('choice2').value;
    const choice3 = document.getElementById('choice3').value;
    const choice4 = document.getElementById('choice4').value;
    const correctAnswer = document.getElementById('correct_answer').value;

    // 取得した情報を表示
    const quizInfo = {
        category,
        question,
        choices: [choice1, choice2, choice3, choice4],
        correctAnswer
    };

    // ローカルストレージにクイズデータを保存
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    
    // カテゴリーがまだ保存されていない場合は空の配列を作成
    if (!savedQuizzes[category]) {
        savedQuizzes[category] = [];
    }

    // 新しいクイズを保存
    savedQuizzes[category].push(quizInfo);

    // 保存したクイズデータをローカルストレージに更新
    localStorage.setItem('quizzes', JSON.stringify(savedQuizzes));

    // 結果をHTMLに表示
    const output = document.getElementById('quizOutput');
    output.textContent = JSON.stringify(quizInfo, null, 2);
}

// 保存されたクイズを画面に表示する関数
function displaySavedQuizzes(savedQuizzes) {
    const quizContainer = document.getElementById('quizOutput');
    quizContainer.innerHTML = ''; // 前のデータをリセット

    for (const category in savedQuizzes) {
        const categoryDiv = document.createElement('div');
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const quizList = document.createElement('ul');
        savedQuizzes[category].forEach(quiz => {
            const quizItem = document.createElement('li');
            quizItem.textContent = `Q: ${quiz.question}`;
            quizList.appendChild(quizItem);
        });

        categoryDiv.appendChild(quizList);
        quizContainer.appendChild(categoryDiv);
    }
}