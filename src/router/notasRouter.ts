import { Router } from "express";
import validateToken from "../middleware/verifyToken";
import { isDoctor, isPatient } from "../middleware/hasRole";
import controllerNotas from "../controller/notasController";

const router = Router();
const controller = new controllerNotas

router.post('/createNota', validateToken, isDoctor, controller.createNotas);
router.get('/getNotasDoctor', validateToken, isDoctor, controller.getNotasMedicas )
router.get('/getNotasPaciente', validateToken, isPatient, controller.getNotasByPatient);

export default router;