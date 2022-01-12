module.exports = {
    HTML: function (title, head, body) {
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
      
              * {
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
              <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                  <div class="container-fluid">
                      <a class="navbar-brand" href="/"><strong>Crystal Gallery</strong></a>
                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarCollapse">
                          <ul class="navbar-nav me-auto mb-2 mb-md-0">
                          <a class="nav-link active" aria-current="page" href="#">Auction</a>
                          <a class="nav-link active" aria-current="page" href="#">About</a>
                          </ul>
                          <form action="/search" method="post" class="d-flex mb-2 mb-md-0">
                              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search">
                              <input class="btn btn-outline-success" type="submit" value="Search">
                          </form>
                      </div>
                  </div>
              </nav>
          </header>
          ${body} 
          <footer class="footer mt-auto py-3 bg-light">
              <div class="container">
                  <span class="text-muted">
                      <center>crystal gallery 경매 체험 사이트로, 각 작품의 저작권은 게재자에게 있습니다. 작가의 동의 없는 무단배포는 저작권법에 의해 법적 처벌을 받을 수 있습니다.</center>
                  </span>
              </div>
          </footer>
      </body>
      </html>      
      `;
    }
}