// use the http.createServer()to build a multi-route web server with node

// Import the http module
const http = require("http");
const routes = require("./routes");
// const path = require("path");

// Create a server
const server = http.createServer((request, response) => {
  let filePath = "./views";
  console.log(request.url);
  switch (request.url) {
    case "":
    case "/home":
    case "/":
      console.log("Home Page");
      filePath += "/home.html";
      routes.homePage(filePath, response);
      break;
    case "/about":
      console.log("About Page");
      filePath += "/about.html";
      routes.aboutPage(filePath, response);
      break;
    case "/contacts":
      console.log("Contacts Page");
      filePath += "/contacts.html";
      routes.contactsPage(filePath, response);
      break;
    case "/products":
      console.log("Products Page");
      filePath += "/products.html";
      routes.productsPage(filePath, response);
      break;
    case "/subscribe":
      console.log("Subscribe Page");
      filePath += "/subscribe.html";
      routes.subscribePage(filePath, response);
      break;
    default:
      console.log("404 Page Not Found");
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 Page Not Found");
  }
});

// Listen on port 3000

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
