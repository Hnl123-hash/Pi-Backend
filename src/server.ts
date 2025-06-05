import express from "express";
import taxonomiaRouter from "./presentation/taxonomia/taxonomia.route";
import cors from "cors";
import usuarioRouter from "./presentation/usuario/usuario.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(taxonomiaRouter);
app.use(usuarioRouter);

export const startServer = () => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
