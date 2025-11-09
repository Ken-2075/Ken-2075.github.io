function loginUser() {

   

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // 'userData' キーで保存されているデータを取得
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    // ユーザー情報が存在しない場合
    if (!storedUser) {
        alert("ユーザーが登録されていません。新規登録を行ってください。");
        console.log("保存されているユーザー情報:", storedUser);
        return;
    }
 
    // 入力されたユーザー名とパスワードが一致するか確認
    if (username === storedUser.username && password === storedUser.password) {
    // ログイン成功 → ログイン情報をlocalStorageに保存
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loggedInUser', JSON.stringify(storedUser));  // ユーザー情報を保存
    alert("ログイン成功！");
    window.location.href = "login_2.html"; // ホームページにリダイレクト
}
}
