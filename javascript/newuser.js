// ユーザー登録の処理
function registerUser() {
    // フォームから入力内容を取得
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // 入力チェック
    if (username === "" || password === "" || confirmPassword === "") {
        alert("すべてのフィールドを入力してください！");
        return;
    }

    // パスワード確認が一致するかチェック
    if (password !== confirmPassword) {
        alert("パスワードが一致しません！");
        return;
    }

    // ユーザー情報をローカルストレージに保存
    const user = {
        username: username,
        password: password
    };

    // ローカルストレージに保存 (キーは "userData")
    localStorage.setItem('userData', JSON.stringify(user));

    // 登録成功メッセージ
    alert("登録が成功しました！");
    window.location.href = "login.html";


    // フォームをリセット
    document.getElementById('registerForm').reset();
}
