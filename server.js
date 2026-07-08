import http from "http";
import routers from "./routers.js";

const server = http.createServer();

server.on("request", (req, res) => {
  res.writeHead(200,{'content-type': 'application/json'})  
  const url = new URL(req.url, "http://" + req.headers.host);
  const metode = req.method;
  const reqSegment = url.pathname.split("/").filter(Boolean);
  const query_path = Object.fromEntries(url.searchParams)

  let foundHendler = null;
  req.params = {};

  const rotFromMetod = routers[metode];
  const allroters = Object.keys(rotFromMetod);

  for (const router of allroters) {
    const rotSegment = router.split("/").filter(Boolean);

    if (reqSegment.length !== rotSegment.length) continue;
    let isMatch = true;
    let tempParams = {};

    for (let i = 0; i < rotSegment.length; i++) {
      if (rotSegment[i].startsWith(":")) {
        const paramName = rotSegment[i].slice(1);
        tempParams[paramName] = reqSegment[i];
      } else if (rotSegment[i] !== reqSegment[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      foundHendler = rotFromMetod[router];
      req.params = tempParams;
      break;
    }
  }

  if (foundHendler) {
    req.query = query_path 
    foundHendler(req, res);
  } else {
    res.end(" error:404 --- the router not found");
  }
});

server.listen(3000, () => {
  console.log("listen on port 3000");
});
