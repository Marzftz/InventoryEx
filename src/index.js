const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

//inicializar procesos
const app = express();

//Configuraciones del servidor
app.set("port", process.env.PORT || 3500);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
    helpers: require("./public/lib/handlebars"),
  })
);

app.set("view engine", ".hbs");

//**************MIDDLEWARE*****************//

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//**************VARIABLES GLOBALES*****************//

app.use((rep, res, next) => {
  next();
});

//**************RUTAS*****************//
//Archivos controladores, para las peticiones (GET, POST) con el backend

app.use(require("./routes"));
app.use(require("./routes/links"));
app.use(require("./routes/controller_usuarios"));
app.use(require("./routes/controller_principal"));
app.use(require("./routes/controller_productos"));
app.use(require("./routes/controller_solicitudes"));
app.use(require("./routes/controller_solpendientes"));
app.use(require("./routes/controller_soldespachadas"));
app.use(require("./routes/controller_recuperarcontrasena"));
app.use(require("./routes/controller_informe"));
app.use(require("./routes/controller_informepersonalizado"));
app.use(require("./routes/controller_contrasena"));

//**************ARCHIVOS PUBLICOS*****************//

app.use(express.static(path.join(__dirname, "public")));

//**************INICIALIZAR SERVIDOR*****************//

app.listen(app.get("port"), () => {
  console.log("http://localhost:" + app.get("port"));
});
