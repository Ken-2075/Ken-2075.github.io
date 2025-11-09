document.addEventListener('DOMContentLoaded', function() {
    const usernameElement = document.getElementById('username');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizContainer = document.getElementById('quizContainer');
    const endQuizBtnContainer = document.getElementById('endQuizBtnContainer');
    const endQuizBtn = document.getElementById('endQuizBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn'); // 次の問題ボタン
    const startQuizBtn = document.getElementById('startQuizBtn'); // クイズ開始ボタン

    // ローカルストレージから保存されたクイズデータを取得
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {}; // quizzesが無ければ空のオブジェクト

    // ローカルストレージから現在の質問番号を取得
    let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;

    // 現在のカテゴリを取得
    const selectedCategory = localStorage.getItem('selectedCategory');
    
    // スコアの初期化（正解数）
    let score = parseInt(localStorage.getItem('score')) || 0;

    // 正解数を保存（正解の数）
    let correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;

    // 総問題数を保存
    let totalQuestions = 0; // 初期値は0

    // クイズを表示する関数
    function displayQuiz(selectedCategory, savedQuizzes) {
        quizContainer.innerHTML = ''; // 前のデータをリセット

        if (savedQuizzes[selectedCategory] && savedQuizzes[selectedCategory].length > 0) {
            const quizzes = savedQuizzes[selectedCategory];
            
            // 総問題数を保存（最初に1回だけセット）
            if (totalQuestions === 0) {
                totalQuestions = quizzes.length;
                localStorage.setItem('totalQuestions', totalQuestions); // ローカルストレージに保存
            }

            // 現在の質問が存在するか確認
            if (currentQuestionIndex < quizzes.length) {
                const quiz = quizzes[currentQuestionIndex];
                const quizItem = document.createElement('div');
                quizItem.innerHTML = `
                    <h4>${quiz.question}</h4>
                    <form id="quizForm">
                        ${quiz.choices.map((choice, index) => `
                            <label>
                                <input type="radio" name="choice" value="${index + 1}" class="choice">
                                ${choice}
                            </label><br>
                        `).join('')}
                    </form>
                    <button id="submitAnswerBtn">回答する</button>
                    <p class="sentakushi"><strong>正解:</strong> 選択肢${quiz.correctAnswer}</p>
                `;
                quizContainer.appendChild(quizItem);

                const submitAnswerBtn = quizItem.querySelector('#submitAnswerBtn');
                const quizForm = quizItem.querySelector('#quizForm');

                // 「回答する」ボタンのクリックイベント
                submitAnswerBtn.addEventListener('click', function(event) {
                    event.preventDefault(); // ボタンのデフォルト動作（フォーム送信）を防ぐ

                    // ユーザーが選択したラジオボタンを取得
                    const selectedAnswer = quizForm.querySelector('input[name="choice"]:checked')?.value;

                    if (!selectedAnswer) {
                        alert('選択肢を選んでください');
                        return;
                    }

                    // 正誤判定
                    const selectedAnswerInt = parseInt(selectedAnswer);
                    const correctAnswerInt = parseInt(quiz.correctAnswer); // 正解も数値に変換

                    if (selectedAnswerInt === correctAnswerInt) {
                        alert('正解です！');
                        score++; // 正解したらスコアを増やす
                        correctAnswers++; // 正解数も増やす
                        localStorage.setItem('score', score); // スコアをlocalStorageに保存
                        localStorage.setItem('correctAnswers', correctAnswers); // 正解数をlocalStorageに保存
                    } else {
                        alert('不正解です。');
                    }

                    // 正解後に次のページへ遷移（次の問題へ進む）
                    setTimeout(function() {
                        currentQuestionIndex++;
                        if (currentQuestionIndex < quizzes.length) {
                            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
                            displayQuiz(selectedCategory, savedQuizzes);
                        } else {
                            // クイズが全て終わったら結果ページに遷移
                            alert('クイズ終了！');
                            localStorage.removeItem('currentQuestionIndex');   
                            window.location.href = 'result.html'; // 結果ページに遷移
                        }
                    }, 500); // 0.5秒後に遷移（アラートの後に遷移するようにタイマーを設定）
                });
            } else {
                quizContainer.innerHTML = '<p>クイズは全て終了しました。</p>';
            }
        } else {
            quizContainer.innerHTML = '<p>選択されたカテゴリにクイズがありません。</p>';
        }
    }

    // 終了ボタンの処理（追加）
    if (endQuizBtn) {
        endQuizBtn.addEventListener('click', function() {
            alert('クイズを終了しました');
            localStorage.removeItem('currentQuestionIndex'); // クイズ進行状況をリセット
            window.location.href = 'index.html'; // ホームページに戻る
        });
    }

    // クイズを表示
    if (selectedCategory) {
        displayQuiz(selectedCategory, savedQuizzes);
    } else {
        alert('カテゴリーが選択されていません。');
        window.location.href = 'index.html';
    }
});
