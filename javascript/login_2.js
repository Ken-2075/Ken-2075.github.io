window.onload = function() {
    // ログイン状態を確認
    const loggedIn = localStorage.getItem('loggedIn');
    
    // ログインしている場合
    if (loggedIn === 'true') {
        // localStorage からログインユーザー情報を取得
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
        // ユーザー名
        document.getElementById('username').textContent = loggedInUser.username;
        
        
        // ログアウトボタンを表示
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'block';

            // ログアウトボタンのクリックイベントを設定
            logoutBtn.addEventListener('click', function() {
                // ログイン情報を削除
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('loggedInUser');
                alert("ログアウトしました。");

                // 少し遅れてからログインページにリダイレクト
                setTimeout(function() {
                    window.location.href = "login.html";
                }, 500); // 500ms後にリダイレクト
            });
        }
    } else {
        // ログインしていない場合はログインページにリダイレクト
        window.location.href = "login.html";
    }
};
