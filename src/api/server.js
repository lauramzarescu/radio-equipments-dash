require("dotenv").config();

const express = require("express");
const fs = require("fs");
const AWS = require("aws-sdk");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const { uuid } = require("uuidv4");

const upload = multer({ dest: "uploads/" });

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// configurarea legaturii cu AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "eu-central-1",
});

//parametrii pe care ii vom folosi pentru conectarea la AWS
const params = {
  Bucket: "licenta",
  CreateBucketConfiguration: {
    LocationConstraint: "eu-central-1",
  },
};

const port = 3000;
const table = "equipments";

const pool = mysql.createPool({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PWD,
  database: process.env.REACT_APP_MYSQL_DB,
});

// ascultam request-urile trimise pe port-ul declarat mai sus
app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get("/", (req, res) => {
  pool.query(`select * from ${table}`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/api/create-equipment", (req, res) => {
  let equipmentName = req.body.name;
  let features = req.body.data;

  let equipmentParams = {
    Bucket: equipmentName,
    CreateBucketConfiguration: {
      LocationConstraint: "eu-central-1",
    },
  };

  // daca tipul de date este text, il transformam in varchar(100),
  // care este tipul acceptat de MySQL
  features.forEach((feature) => {
    if (feature.type === "text") {
      feature.type = "varchar(100)";
    }
  });

  const query_eq_list =
    "INSERT IGNORE INTO equipments (name, features) VALUES ('" +
    equipmentName +
    "', '" +
    JSON.stringify(features) +
    "');";

  pool.query(query_eq_list, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(equipmentParams);

      s3.createBucket(equipmentParams, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log("Bucket Created Successfully", data.Location);
      });
    }
  });
});

app.get("/api/get-all-equipments", (req, res) => {
  pool.query(`SELECT name FROM equipments`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/get-number-of-equipments", (req, res) => {
  pool.query(`SELECT count(*) FROM equipments`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/get-number-of-uploads", (req, res) => {
  pool.query(`SELECT count(*) FROM uploads`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/get-last-upload", (req, res) => {
  pool.query(`SELECT * FROM uploads ORDER BY id DESC LIMIT 1`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/get-table-simple-data", (req, res) => {
  const query = `select equipments.id, equipments.name, count(uploads.id) as number_of_uploads, 
    JSON_LENGTH(equipments.features) as number_of_features, uploads.created_date from equipments 
    left OUTER join uploads on (uploads.id_equipment = equipments.id)
    group by equipments.id
    having count(uploads.id) >= 0`;

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/api/get-equipment-uploads", (req, res) => {
  let equipmentName = req.query.name;

  const query =
    "select id from equipments where name = '" + equipmentName + "'";

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      pool.query(
        `SELECT * FROM uploads where id_equipment = ` +
          rows[0].id +
          ` ORDER BY id`,
        (err, rows) => {
          if (err) {
            res.send(err);
          } else {
            res.send(rows);
          }
        }
      );
    }
  });
});

app.get("/api/get-uploads", (req, res) => {
  let id = req.query.id;

  pool.query(
    `SELECT * FROM uploads where id_equipment = ` + id,
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/api/get-equipment-features", (req, res) => {
  let equipmentName = req.query.name;

  const query =
    "select features from equipments where name = '" + equipmentName + "'";

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post("/api/upload-data", upload.single("file"), (req, res) => {
  let file = req.file;
  let equipment = req.body.equipment;
  let records = req.body.records;
  const batch_uuid = uuid();

  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: equipment,
    Key: file.originalname,
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);

    const query = "select id from equipments where name = '" + equipment + "'";

    pool.query(query, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        const query_uploads =
          "INSERT INTO uploads (id_equipment, batch_uuid, aws_location, file_records) VALUES (?, ?, ?, ?);";
        pool.query(
          query_uploads,
          [rows[0].id, batch_uuid, data.Location, records],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    });
  });
});

app.get("/api/download-file", (req, res) => {
  let equipment = req.query.equipment;
  let file = req.query.file;

  var options = {
    Bucket: equipment,
    Key: file,
  };

  const url = s3.getSignedUrl("getObject", {
    Bucket: equipment,
    Key: file,
    Expires: 300,
  });

  res.send(url);
});

app.get("/api/get-last-week", (req, res) => {
  let equipment = req.query.equipment;

  const query =
    `SELECT count(*) AS count FROM uploads
  WHERE created_date >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY
  AND created_date < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY 
  AND id_equipment = ` + equipment;

  pool.query(query, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});
