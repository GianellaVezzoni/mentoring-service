import { DependencyManager } from "../dependencyManager";
import getUserRoutes from "../modules/users/infrastructure/routes/UserRoutes";
import getPasswordSetupRoutes from "../modules/users/infrastructure/routes/PasswordSetupRoutes";
import getReportRoutes from "../modules/reports/infrastructure/routes/ReportRoutes";
import getProgressRoutes from "../modules/progress/infrastructure/routes/ProgressRoutes";
import getMetricRoutes from "../modules/metrics/infrastructure/routes/MetricRoutes";
const prefix = "/api/v1";
const ReduceRouters = (
  app: { use: (arg0: string, arg1: any) => void },
  dependencyManager: DependencyManager
) => {
  app.use(prefix, getUserRoutes(dependencyManager));
  app.use(prefix, getPasswordSetupRoutes(dependencyManager));
  app.use(prefix, getReportRoutes(dependencyManager));
  app.use(prefix, getProgressRoutes(dependencyManager));
  app.use(prefix, getMetricRoutes(dependencyManager));
};

export default ReduceRouters;
