import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import axios from 'axios';

dotenv.config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10102;
const HOSTCROON = process.env.HOST_CROON || "http://localhost:10102/medicamentos/getAlarms";

import citas from './router/citaRouter';
import pagos from './router/pagoRouter';
import medicamentos from './router/medicamentoRotuer';
import notas from './router/notasRouter'

app.use('/cita', citas);
app.use('/pago', pagos);
app.use('/medicamentos', medicamentos)
app.use('/notas', notas)

cron.schedule('* * * * *', async () => {
  try {
    await axios.get(HOSTCROON);
  } catch (error) {
    console.error('Error al verificar recordatorios:', error.message);
  }
});

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
