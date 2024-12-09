import dotenv from "dotenv";
import connectToMongo from "./db/db.js";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});

connectToMongo()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Can't connect to mongoDB!!! ", error);
  });
