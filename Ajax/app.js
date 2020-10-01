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
app.use(express.static("views"));
app.set("view engine", "ejs");

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

app.get("/", cors(), function (req, res) {
  console.log("stigo get reqq");
  Pacijent.find({}, (err, pacijenti) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!pacijenti) {
        res.json({ success: false, message: "Nema pronadjenih pacijenata" });
      } else {
        res.render("patients", { pacijenti: pacijenti });
      }
    }
  });
});

app.get("/pacijent/add", cors(), function (req, res) {
  console.log("stigo get reqq");
  res.render("addPatient");
});

app.post("/pacijenti/get", cors(), function (req, res) {
  console.log(req.body.query);
  if (req.body.query == undefined) {
  } else {
    const regex = new RegExp(escapeRegex(req.body.query), "gi");

    var query = Pacijent.find({ $or: [{ ime: regex }, { prezime: regex }] })
      .sort({ updated_at: -1 })
      .sort({ created_at: -1 })
      .limit(10);
    query.exec(function (err, users) {
      if (!err) {
        console.log(users);
        res.send(
          users,
          {
            "Content-Type": "application/json",
          },
          200
        );
      } else {
        res.send(
          JSON.stringify(err),
          {
            "Content-Type": "application/json",
          },
          404
        );
      }
    });
  }
});
app.post("/pacijenti/getOne", cors(), function (req, res) {
  console.log("req body jeeee::");
  console.log(req.body);
  console.log(req.body.id);
  if (req.body == undefined) {
    console.log("Error");
    res.send("Error");
  } else {
    var query = Pacijent.find({ _id: req.body.id })
      .sort({ updated_at: -1 })
      .sort({ created_at: -1 })
      .limit(10);
    query.exec(function (err, users) {
      if (!err) {
        console.log("NEma erora pronadjen je pacijent:");
        console.log(users);
        res.send(
          users,
          {
            "Content-Type": "application/json",
          },
          200
        );
      } else {
        console.log("doslo do erora");
        res.send(
          JSON.stringify(err),
          {
            "Content-Type": "application/json",
          },
          404
        );
      }
    });
  }
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

  var newPatient = new Object({
    ime: req.body.ime,
    prezime: req.body.prezime,
    datumRodjenja: req.body.datumRodjenja,
    grad: req.body.grad,
    zdravstveniKarton: req.body.zdravstveniKarton,
    terapija: {
      naziv: req.body.naziv,
      trajanje: req.body.trajanje,
      opis: req.body.opis,
    },
  });
  console.log(newPatient);
  console.log("novi zinad pacijent");
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
        const pacijent = new Pacijent(newPatient);
        console.log("napravljen project objectttttttttttt");
        pacijent.save((err) => {
          if (err) {
            console.log("error kod saveaaaaaaaaa");
            console.log(err);
            if (err.errors) {
              var i = 1;
              if (err.errors.title) {
                console.log("Error broj " + i++);
                console.log(err.errors.title.message);
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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
