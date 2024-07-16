import http from "http";
import fs from "fs";
import crypto from "crypto";

const port = 5001;
const dir = "public";

const requestCounts = {}; // Store request counts for each client IP address
const rateLimit = 50; // Max requests per minute

setInterval(() => {
  for (const ip in requestCounts) {
    requestCounts[ip] = 0;
  }
}, 60000);

const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress;

  requestCounts[clientIp] = requestCounts[clientIp] || 0;
  
  if (requestCounts[clientIp] >= rateLimit) {
    res.writeHead(429, { "Content-Type": "text/plain" });
    res.end("Rate limit exceeded. Please try again later.");
    return;
  }

  requestCounts[clientIp]++;

  const requrl = req.url == "/" ? "/index.html" : req.url;
  const filePath = dir + requrl;
  console.log(req.url);

  if (requrl == "/api/ip-address") {
    const clientIP = req.socket.remoteAddress;
    console.log(clientIP);
    let ip = clientIP.split(":");
    ip = ip[ip.length - 1];
    const hash = crypto.createHash("sha256");
    hash.update(ip);
    const hashedIP = hash.digest("hex");
    const response = JSON.stringify({ hashedIP });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(response);
    res.end();
    return;
  } else if (requrl == "/data/projects.txt") {
    fs.readFile("./data/projects.txt", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File not found
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          // Other error
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("500 Internal Server Error");
        }
      } else {
        console.log(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(data);
        res.end();
      }
    });
    return;
  } else if (requrl == "/data/data.json") {
    fs.readFile("./data/data.json", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File not found
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          // Other error
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("500 Internal Server Error");
        }
      } else {
        console.log(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(data);
        res.end();
      }
    });
    return;
  }

  // Determine content type based on file extension
  let contentType = "text/html";
  if (req.url.endsWith(".css")) {
    contentType = "text/css";
  } else if (req.url.endsWith(".mjs")) {
    contentType = "application/javascript";
  } else if (req.url.endsWith(".js")) {
    contentType = "text/javascript";
  }

  // console.log(filePath)
  // Read the file asynchronously
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        // Other error
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
      } 
    } else {
      // console.log(contentType)
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    }
  });
});

server.listen(port);
