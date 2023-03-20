const http = require("http");
const { URL } = require("url");

const bodyParser = require("./helpers/bodyParser");
const routes = require("./routes");

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://localhost:3000${req.url}`);

  let id = null;
  let { pathname } = parsedUrl;
  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  console.log(
    `Request method: ${req.method} | Endpoint: ${parsedUrl.pathname}`
  );

  const route = routes.find(
    (routeObject) =>
      routeObject.endpoint === pathname && routeObject.method === req.method
  );

  if (route) {
    req.params = { id };
    req.query = Object.fromEntries(parsedUrl.searchParams);

    res.send = (statusCode, body) => {
      res.writeHead(statusCode, { "content-type": "application/json" });
      res.end(JSON.stringify(body));
    };

    if (["POST", "PUT"].includes(req.method)) {
      bodyParser(req, () => route.handler(req, res));
    } else {
      route.handler(req, res);
    }
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(`Cannot ${req.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () => console.log("server running at localhost:3000"));

// necessário para pegar as queries que estão na url
// Object.fromEntries serve para criar um objeto com a entrada iterable que estamos recebendo
// entrada iterable: { 'order' => 'asc' }
// objeto: { order: 'asc' }
