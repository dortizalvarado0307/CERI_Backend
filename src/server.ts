import express from 'express';

import userRoutes from './routes/usersRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/auth', loginRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'API funcionando 🚀'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});