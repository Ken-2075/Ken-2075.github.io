document.addEventListener('DOMContentLoaded', function() {
    // ローカルストレージからスコアを取得
    const score = localStorage.getItem('score') || 0;
    const totalQuestions = localStorage.getItem('totalQuestions') || 0; // 総問題数
    const correctAnswers = localStorage.getItem('correctAnswers') || 0; // 正解数

    // 結果を表示
    const scoreElement = document.getElementById('score');
    const correctAnswersElement = document.getElementById('correctAnswers');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const percentageElement = document.getElementById('percentage');

    scoreElement.textContent = score;
    correctAnswersElement.textContent = correctAnswers;
    totalQuestionsElement.textContent = totalQuestions;

    // 正解率を計算して表示
    if (totalQuestions > 0) {
        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        percentageElement.textContent = `${percentage}%`;
    } else {
        percentageElement.textContent = "0%";
    }

    // リセットボタンの処理
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // ローカルストレージからデータを削除
            localStorage.removeItem('score');
            localStorage.removeItem('correctAnswers');
            localStorage.removeItem('totalQuestions');

            // ホームページにリダイレクトする前に、ページをリロードして最新の状態にする
            location.reload(); // ページの再読み込み
        });
    }
});
