import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/usersRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import universityRoutes from './routes/universityRoutes.js';
import universitiesBodyRoutes from './routes/universitiesBodyRoutes.js';
import regionRoutes from './routes/regionRoutes.js';
import personInChargeRoutes from './routes/personInChargeRoutes.js';
import managementAreaRoutes from './routes/managementAreaRoutes.js';
import clasificationManagementAreaRoutes from './routes/clasificationManagementAreaRoutes.js';
import typeInitiativeRouter from './routes/typeInitiativeRouter.js';
import metaPopulationRoutes from './routes/metaPopulationRoutes.js';
import clasificationMetaPopulationRoutes from './routes/clasificationMetaPopulationRoutes.js';
import projectCommissionRoutes from './routes/projectCommissionRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    ok: false,
    message: 'Demasiados intentos de inicio de sesión. Intente nuevamente en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/regions', regionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', loginLimiter, loginRoutes);
app.use('/api/universitiesBody', universitiesBodyRoutes);
app.use('/api/universities',universityRoutes);
app.use('/api/personInCharge', personInChargeRoutes);
app.use('/api/managementArea', managementAreaRoutes);
app.use('/api/clasificationManagementArea', clasificationManagementAreaRoutes);
app.use('/api/typeInitiative', typeInitiativeRouter);
app.use('/api/metaPopulation', metaPopulationRoutes);
app.use('/api/clasificationMetaPopulation', clasificationMetaPopulationRoutes);
app.use('/api/projectCommission', projectCommissionRoutes);
app.use('/api/roles', roleRoutes);


app.get('/', (_req, res) => {
  res.json({
    ok: true,
    message: 'API funcionando 🚀'
  });
});

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Ruta no encontrada'
  });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    ok: false,
    message: 'Error interno del servidor'
  });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});