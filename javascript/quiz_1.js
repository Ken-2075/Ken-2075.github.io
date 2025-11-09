document.addEventListener('DOMContentLoaded', function() {
    const usernameElement = document.getElementById('username');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizContainer = document.getElementById('quizContainer');
    const categorySelect = document.getElementById('category');  // カテゴリ選択セレクトボックス
    const startQuizBtn = document.getElementById('startQuizBtn'); // クイズ開始ボタン

    // 最初にカテゴリーのデータを設定
    const categories = ["ゲーム", "動物", "スポーツ"]; // ここでカテゴリーを定義

    // カテゴリーの選択肢を動的に追加
    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
   
    // ログイン状態を確認
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const loggedInUser = loggedIn ? JSON.parse(localStorage.getItem('loggedInUser')) : null;

    if (loggedIn) {
        // ログインしている場合、ユーザー名を表示
        usernameElement.textContent = loggedInUser.username;
    } else {
        // ゲストとして表示
        usernameElement.textContent = "ゲスト";
    }

    // ログアウト処理
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('loggedInUser');
            alert("ログアウトしました。");
            window.location.href = "login.html";  // ログイン画面に遷移
        });
    }

    // クイズ開始ボタンの処理
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            const selectedCategory = categorySelect.value;
            console.log('選択されたカテゴリー:', selectedCategory); // デバッグ用

            if (selectedCategory) {
                // カテゴリをlocalStorageに保存
                localStorage.setItem('selectedCategory', selectedCategory);

                // quiz.htmlに遷移
                window.location.href = 'quiz.html';
            } else {
                alert('カテゴリーを選択してください');
            }
        });
    }
    });
/*
    // ローカルストレージから保存されたクイズデータを取得
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {}; // quizzesが無ければ空のオブジェクト

    // クイズのカテゴリ選択を取得し、表示
    const selectedCategory = localStorage.getItem('selectedCategory');
    console.log('選択されたカテゴリー (localStorageから取得):', selectedCategory); // デバッグ用

    if (selectedCategory) {
        // クイズを表示
        displayQuiz(selectedCategory, savedQuizzes);
    } else {
        alert('カテゴリーが選択されていません。');
        window.location.href = 'home.html';
    }

    // クイズを表示する関数
    function displayQuiz(selectedCategory, savedQuizzes) {
        quizContainer.innerHTML = ''; // 前のデータをリセット

        // カテゴリごとに保存されたクイズを表示
        if (savedQuizzes[selectedCategory] && savedQuizzes[selectedCategory].length > 0) {
            const quizzes = savedQuizzes[selectedCategory];
            quizzes.forEach((quiz, index) => {
                const quizItem = document.createElement('div');
                quizItem.innerHTML = `
                    <h4>${quiz.question}</h4>
                    <ul>
                        ${quiz.choices.map((choice, choiceIndex) => `
                            <li>
                                <label>
                                    <input type="radio" name="quiz${index}" value="${choiceIndex + 1}">
                                    ${choice}
                                </label>
                            </li>
                        `).join('')}
                    </ul>
                    <button class="submitAnswerBtn">回答する</button>
                    <p id="feedback-${index}"></p>
                `;
                quizContainer.appendChild(quizItem);

                // 回答するボタンのクリックイベント
                const submitAnswerBtn = quizItem.querySelector('.submitAnswerBtn');
                submitAnswerBtn.addEventListener('click', function() {
                    const selectedOption = quizItem.querySelector('input[type="radio"]:checked');
                    if (selectedOption) {
                        const userAnswer = selectedOption.value;
                        const correctAnswer = quiz.correctAnswer;

                        // 正誤判定
                        const feedback = document.getElementById(`feedback-${index}`);
                        if (userAnswer === correctAnswer) {
                            feedback.textContent = '正解!';
                            feedback.style.color = 'green';
                        } else {
                            feedback.textContent = '不正解';
                            feedback.style.color = 'red';
                        }

                        // 次の問題に進む処理（追加する場合）
                        // 例えば、次の問題を表示するボタンを出すなど
                    } else {
                        alert('選択肢を選んでください');
                    }
                });
            });
        } else {
            quizContainer.innerHTML = '<p>選択されたカテゴリにクイズがありません。</p>';
        }
    }
});
*/