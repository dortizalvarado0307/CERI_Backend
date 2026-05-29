import express from 'express';
import prisma from './config/db.js';
console.log('SERVER NUEVO');
const app = express();

app.use(express.json());

app.get('/', async (_req, res) => {

  try {

    const users = await prisma.user.findMany();

    res.json({
      prueba: 'ESTE ES EL SERVER NUEVO'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      error: 'Error conectando a la base'
    });

  }

});

app.listen(3000, () => {
  console.log('Servidor nuevo');
});