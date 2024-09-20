import { Router } from "express";
import controllerMedicamentos from "../controller/medicamentosController";
import validateToken from "../middleware/verifyToken";
import { isDoctor, isPatient } from "../middleware/hasRole";

const router = Router();
const controller = new controllerMedicamentos();

router.post('/createMedicamento', validateToken, isDoctor, controller.createMedicamento);
router.get('/getMedicamentos', validateToken, isDoctor,controller.getMedicamentos);
router.put('/activeAlarms', validateToken, isPatient,controller.updateStatus);
router.get('/getAlarms', controller.getAlarms);
router.get('/recetaPacinete', validateToken, isPatient, controller.getByIdPacienteMedicamento)

export default router;
