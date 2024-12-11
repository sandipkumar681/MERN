// import dotenv from "dotenv";

// dotenv.config({
//   path: "./.env",
// });
import "./src/loadEnv.js";

import connectToMongo from "./src/db/db.js";
import app from "./src/app.js";

connectToMongo()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Can't connect to mongoDB!!! ", error);
  });
