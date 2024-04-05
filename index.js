const http = require('http');
const url = require('url');

// Create a server
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  
  // Set up options for the destination server
  const options = {
    hostname: 'example.com', // Replace with your destination server hostname
    port: 80, // Replace with your destination server port
    path: parsedUrl.pathname + (parsedUrl.search || ''), // Include query parameters
    method: req.method,
    headers: req.headers
  };
  
  // Make a request to the destination server
  const proxyReq = http.request(options, (proxyRes) => {
    // Forward the response status and headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    // Forward the response body
    proxyRes.pipe(res, { end: true });
  });

  // Forward request body, if any
  req.pipe(proxyReq, { end: true });

  // Handle errors
  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy request error');
  });

});

// Start the server
const port = 3000; // Choose a port for your proxy server
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
