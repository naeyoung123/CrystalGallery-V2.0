module.exports = {
    isOwner:function(request, response) {
        if (request.session.is_logined) {
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(request, response) {
        var authStatusUI = '<li class="nav-item"><a class="nav-link" href="/login">로그인</a></li><li class="nav-item"><a class="nav-link" href="/signup">회원가입</a></li>'
        if (this.isOwner(request, response)) {
            authStatusUI = `<li class="nav-item">
                                <a class="nav-link" href="/mypage">마이페이지</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/logout_process">로그아웃</a>
                            </li>`;
        }
        return authStatusUI;
    }
}