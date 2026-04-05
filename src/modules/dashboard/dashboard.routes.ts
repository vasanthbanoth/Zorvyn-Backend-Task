import { Router } from 'express';
import * as dashboardController from './dashboard.controller';
import { protect } from '../../middlewares/authMiddleware';
import { restrictTo } from '../../middlewares/roleMiddleware';

const router = Router();

router.use(protect);

router.get('/summary', dashboardController.getSummary);
router.get('/recent-activity', dashboardController.getRecentActivity);

router.get('/category-breakdown', restrictTo('ADMIN', 'ANALYST'), dashboardController.getCategoryBreakdown);
router.get('/monthly-trends', restrictTo('ADMIN', 'ANALYST'), dashboardController.getMonthlyTrends);
router.get('/weekly-summary', restrictTo('ADMIN', 'ANALYST'), dashboardController.getWeeklySummary);

export default router;
