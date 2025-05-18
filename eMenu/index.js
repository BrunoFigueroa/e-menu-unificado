import app from "./app.js";
import userRouter from "./routes/user.js";
import mainRouter from "./routes/main.js";
import orderRouter from "./routes/order.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const port = 8080;

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(userRouter);
app.use(mainRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
