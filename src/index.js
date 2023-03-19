const http = require("http");

const routes = require("./routes");

const server = http.createServer((req, res) => {
  console.log(`Request method: ${req.method} | Endpoint: ${req.url}`);

  const route = routes.find(
    (routeObject) =>
      routeObject.endpoint === req.url && routeObject.method === req.method
  );

  if (route) {
    route.handler(req, res);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(`Cannot ${req.method} ${req.url}`);
  }

});

server.listen(3000, () => console.log("server running at localhost:3000"));
