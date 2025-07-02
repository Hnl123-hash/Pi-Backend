import express from "express";
import taxonomiaRouter from "./presentation/taxonomia/taxonomia.route";
import cors from "cors";
import usuarioRouter from "./presentation/usuario/usuario.route";
import exemplaresRouter from "./presentation/exemplares/exemplares.routes";

const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());
app.use(taxonomiaRouter);
app.use(usuarioRouter);
app.use(exemplaresRouter);

export const startServer = () => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
