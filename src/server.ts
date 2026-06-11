import express from 'express';

import userRoutes from './routes/usersRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import universityRoutes from './routes/universityRoutes.js';
import universitiesBodyRoutes from './routes/universitiesBodyRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/auth', loginRoutes);

app.use('/api/universitiesBody', universitiesBodyRoutes);

app.use('/api/universities',universityRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'API funcionando 🚀'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});