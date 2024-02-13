// Import the http module
const http = require("http");
const routes = require("./routes");
// const path = require("path");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Every time the subscribe route is accessed, subscribeEvent is emitted (a console.log stating please subscribe is logged to the console).
myEmitter.on("subscribeEvent", () => {
  console.log("Please subscribe");
});

// Every time the products route is accessed, buyProductEvent is emitted (a console.log stating please buy my products is logged to the console).
myEmitter.on("buyProductEvent", () => {
  console.log("Please buy my products");
});

// Every time the about route is accessed, aboutEvent is emitted (a console.log stating "please learn things about my products and then subscribe" is logged to the console).
myEmitter.on("aboutEvent", () => {
  console.log("Please learn things about my products and then subscribe");
});

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
      myEmitter.emit("aboutEvent");
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
      myEmitter.emit("buyProductEvent");
      break;
    case "/subscribe":
      console.log("Subscribe Page");
      filePath += "/subscribe.html";
      routes.subscribePage(filePath, response);
      myEmitter.emit("subscribeEvent");
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
