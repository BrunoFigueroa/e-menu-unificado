import app from "./app.js";
import userRouter from "./routes/user.js";
import mainRouter from "./routes/main.js";
import orderRouter from "./routes/order.js";
import dbRouter from "./routes/db_endpoints.js";

const port = 8080;

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(userRouter);
app.use(mainRouter);
app.use(orderRouter);
app.use(dbRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
