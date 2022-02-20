module.exports = {
    HTML: function(
        title,
        head,
        body,
        authStatusUI = '<li class="nav-item"><a class="nav-link" href="/login">로그인</a></li><li class="nav-item"><a class="nav-link" href="/signup">회원가입</a></li>'
    ) {
        return `
      <html>
      <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-uWxY/CJNBR+1z내jPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">
         <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer-navbar/">

          <meta name="viewport" content="width=device-width, initial-scale=1">

          <style>
          @import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
      
              header {
                  font-family: 'NanumSquareRound';
              }
      
              main>.container {
                  padding: 60px 15px 0;
              }

          </style>
          ${head}
      </head>
      
      <body class="d-flex flex-column h-100" id = "wrapper">
          <header>
              <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-black">
                  <div class="container-fluid">
                      <a class="navbar-brand" href="/"><strong>Crystal Gallery</strong></a>
                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarCollapse">
                          <ul class="navbar-nav me-auto mb-2 mb-md-0">
                          <a class="nav-link active" aria-current="page" href="/artwork_list">Auction</a>
                          <a class="nav-link active" aria-current="page" href="#">About</a>
                          ${authStatusUI}
                          </ul>
                          <form action="/search" method="get" class="d-flex mb-2 mb-md-0">
                              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search_word">
                              <input class="btn btn-outline-success" type="submit" value="Search">
                          </form>
                      </div>
                  </div>
              </nav>
          </header>
          ${body} 
          <footer class="footer mt-auto py-1 bg-black">
              <div class="container" style = "color : white;">
                <img src="images/logo.png" style = "width : 80px; float : left; margin-right : 20px;"> 
                About us<br> FAQ<br> Contact us 
              </div>
          </footer>
      </body>
      </html>      
      `;
    },
};