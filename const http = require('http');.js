const http = require('http');
const fs = require('fs');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Serve the HTML form
    fs.readFile('registration_form.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    // Process form data when form is submitted
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');

      // You can process the form data further here, such as saving to a database.
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<p>Registration successful! Name: ${firstName} ${lastName}, Email: ${email}</p>`);
    });
  }
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
