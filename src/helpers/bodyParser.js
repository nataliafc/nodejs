function bodyParser(req, callback) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    body = JSON.parse(body);
    req.body = body;
    callback();
  });
}

module.exports = bodyParser;

// bodyParser é um helper a ser chamado toda vez que um método PUT ou POST for executado, a fim de reduzir repetição de código
