var express = require("express");
const bodyParser = require("body-parser");
var app = express();
const cors = require("cors");
const Pacijent = require("./models/pacijent");
const Terapija = require("./models/terapija");
const mongoose = require("mongoose"); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require("./config/database"); // Mongoose Config
// var corsOptions = {
//   origin: "http://localhost:4200",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors());
// // app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log("Could NOT connect to database: ", err);
  } else {
    console.log("Connected to database: " + config.db);
  }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/get", cors(), function (req, res) {
  console.log("stigo get reqq");
  Pacijent.find({}, (err, pacijenti) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!pacijenti) {
        res.json({ success: false, message: "Nema pronadjenih pacijenata" });
      } else {
        res.json({ success: true, pacijenti: pacijenti });
      }
    }
  });
});
app.get("/getTerapija", cors(), function (req, res) {
  console.log("stigo get reqq za terapije");
  Terapija.find({}, (err, terapije) => {
    console.log("ovoo  su nadjene terapije");
    console.log(terapije);
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!terapije) {
        res.json({ success: false, message: "Nema pronadjenih terapija." });
      } else {
        res.json({ success: true, terapije: terapije });
      }
    }
  });
});
app.post("/addTerapija", cors(), bodyParser.json(), (req, res) => {
  console.log("stigo terapija post request!!!");
  console.log(req.body);
  if (0) {
    res.json({ success: false, message: "" });
  } else {
    if (0) {
      res.json({ success: false, message: "" });
    } else {
      if (0) {
        res.json({
          success: false,
          message: "",
        });
      } else {
        const terapija = new Terapija(req.body);

        terapija.save((err) => {
          if (err) {
            if (err.errors) {
              if (err.errors.title) {
                res.json({
                  success: false,
                  message: err.errors.title.message,
                });
              } else {
                if (err.errors.body) {
                  res.json({
                    success: false,
                    message: err.errors.body.message,
                  });
                } else {
                  res.json({ success: false, message: err });
                }
              }
            } else {
              res.json({ success: false, message: err });
            }
          } else {
            res.json({ success: true, message: "Terapija saved!" });
          }
        });
      }
    }
  }
});
app.put("/editTerapija/:id", cors(), bodyParser.json(), (req, res) => {
  console.log("stigo terapija put request!!!");
  console.log(req.body);
  console.log(req.params.id);
  Terapija.findOne({ _id: req.params.id }, (err, terapija) => {
    if (err) {
      console.log("Eror kod pretrage");
      res.json({ success: false, message: "Not a valid terapija id" });
    } else {
      console.log("nema erora");
      if (!terapija) {
        res.json({ success: false, message: "terapija id was not found." });
      } else {
        terapija.naziv = req.body.naziv;
        terapija.trajanje = req.body.trajanje;
        terapija.opis = req.body.opis;

        terapija.save((err) => {
          if (err) {
            if (err.errors) {
              res.json({
                success: false,
                message: "Please ensure form is filled out properly",
              });
            } else {
              res.json({ success: false, message: err });
            }
          } else {
            console.log("uspjesno updateana terapija!!!!!");
            res.json({
              success: true,
              message: "terapija Updated!",
            });
          }
        });
      }
    }
  });
});

app.delete("/terapija/:id", cors(), bodyParser.json(), (req, res) => {
  console.log("delete ruta");
  Terapija.findOne({ _id: req.params.id }, (err, terapija) => {
    console.log("pronadjena terapija ovaj ispod");
    console.log(terapija);
    terapija.remove((err) => {
      if (err) {
        console.log("eror kod  brisanja");
        res.json({ success: false, message: err });
      } else {
        console.log("uspjesno pobrisan");
        res.json({
          success: true,
          message: "terapija deleted!",
        });
      }
    });
  });
});

app.post("/addPacijent", cors(), (req, res) => {
  console.log("stigo post request za pacijent!!!");
  console.log(req.body);
  if (0) {
    res.json({ success: false, message: "" });
  } else {
    console.log("usli u else");
    if (0) {
      res.json({ success: false, message: "" });
    } else {
      console.log("usli u else 2");
      if (0) {
        res.json({
          success: false,
          message: "",
        });
      } else {
        console.log("mora ovo ispšisata");
        const pacijent = new Pacijent(req.body);
        console.log("napravljen project objectttttttttttt");
        pacijent.save((err) => {
          if (err) {
            console.log("error kod saveaaaaaaaaa");
            if (err.errors) {
              if (err.errors.title) {
                res.json({
                  success: false,
                  message: err.errors.title.message,
                });
              } else {
                if (err.errors.body) {
                  res.json({
                    success: false,
                    message: err.errors.body.message,
                  });
                } else {
                  res.json({ success: false, message: err });
                }
              }
            } else {
              console.log("neki errrrororror");
              res.json({ success: false, message: err });
            }
          } else {
            console.log("uspjesno dodan pacijent!");
            res.json({ success: true, message: "pacijent dodan!" });
          }
        });
      }
    }
  }
});

app.delete("/pacijent/:id", cors(), bodyParser.json(), (req, res) => {
  console.log("delete ruta pacijent");
  Pacijent.findOne({ _id: req.params.id }, (err, pacijent) => {
    console.log("pronadjen paciejnt");
    console.log(pacijent);
    pacijent.remove((err) => {
      if (err) {
        console.log("eror kod  prisanja");
        res.json({ success: false, message: err });
      } else {
        console.log("uspjesno pobrisan");
        res.json({
          success: true,
          message: "pacijent deleted!",
        });
      }
    });
  });
});

app.put("/editPacijent/:id", cors(), bodyParser.json(), (req, res) => {
  console.log("stigo pacijent put request!!!");
  console.log(req.body);
  console.log(req.params.id);
  Pacijent.findOne({ _id: req.params.id }, (err, pacijent) => {
    if (err) {
      console.log("Eror kod pretrage");
      res.json({ success: false, message: "Not a valid pacijent id" });
    } else {
      console.log("nema erora");
      if (!pacijent) {
        res.json({ success: false, message: "pacijent id was not found." });
      } else {
        console.log("dovdje smo dosli");
        pacijent.ime = req.body.ime;
        pacijent.prezime = req.body.prezime;
        pacijent.datumRodjenja = req.body.datumRodjenja;
        pacijent.grad = req.body.grad;
        pacijent.zdravstveniKarton = req.body.zdravstveniKarton;
        pacijent.terapija = req.body.terapija;

        console.log("pacijent objekt je:");
        console.log(pacijent);
        pacijent.save((err) => {
          if (err) {
            console.log("desio se error");
            if (err.errors) {
              console.log("error messsssage");
              console.log(err.errors);
              res.json({
                success: false,
                message: "Please ensure form is filled out properly",
              });
            } else {
              res.json({ success: false, message: err });
            }
          } else {
            console.log("uspjesno updatean pacijent!!!!!");
            res.json({
              success: true,
              message: "pacijent Updated!",
            });
          }
        });
      }
    }
  });
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
