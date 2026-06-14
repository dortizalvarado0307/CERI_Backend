import express from 'express';
import cors from 'cors';
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

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/regions', regionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/universitiesBody', universitiesBodyRoutes);
app.use('/api/universities',universityRoutes);
app.use('/api/personInCharge', personInChargeRoutes);
app.use('/api/managementArea', managementAreaRoutes);
app.use('/api/clasificationManagementArea', clasificationManagementAreaRoutes);
app.use('/api/typeInitiative', typeInitiativeRouter);
app.use('/api/metaPopulation', metaPopulationRoutes);
app.use('/api/clasificationMetaPopulation', clasificationMetaPopulationRoutes);
app.use('/api/projectCommission', projectCommissionRoutes);


app.get('/', (_req, res) => {
  res.json({
    message: 'API funcionando 🚀'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});