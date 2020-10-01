const express = require("express");

const app = express();

app.get("/users", (req, res) => {
  const authorization = req.headers.authorization;
  console.log(authorization);

  if (authorization) {
    const userpass = authorization.split(" ")[1];
    const plaintext = Buffer.from(userpass, "base64").toString("ascii");

    const username = plaintext.split(":")[0];
    const password = plaintext.split(":")[1];

    if (username == "admin" && password == "admin123") {
      res.send("Uspjesna autorizacija");
    } else {
      res.send("Greška kod autorizacije");
    }
  } else {
    res.send("Greška kod autoriztacije");
  }
});

const PORT = 3000;
app.listen(PORT, console.log("Server listening on port: " + PORT));
