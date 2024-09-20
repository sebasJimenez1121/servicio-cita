import { Request, Response } from "express";
import NotaMedicaDto from "../Dto/notas/notasDto";
import notasService from "../service/notasService";

export default class controllerNotas {
        private notaMedica = new NotaMedicaDto();
        private service = new notasService();

        createNotas = async (req: Request, res: Response) => {
            try {
                this.notaMedica.descripcion = req.body.descripcion;
                this.notaMedica.fkCodigoCita = req.body.fkCodigoCita;
    
                const create = await this.service.createNotas(this.notaMedica);
                if (create.create) {
                    res.status(202).json({message: create.message})
                }
            } catch (error) {
                res.status(500).json({
                    message: "Error al crear la nota: " + error.message
                });
            }
        }

        getNotasMedicas = async (req: Request, res: Response) => {
            try {
                const codigoCita = req.params.codigoCita;
                const IdPaciente = req.params.IdPaciente;
                const IdDoctor = req.body.ID;
    
                const getByIdMedico = await this.service.getNotasByIdDoctor(codigoCita, IdPaciente, IdDoctor)
                res.status(202).json({
                    notas: getByIdMedico
                })
            } catch (error) {
                res.status(500).json({
                    message: "Error al traer las notas del doctor: " + error.message
                });
            }
        }

        getNotasByPatient = async (req: Request, res : Response) => {
            try {
                const IdPaciente = req.body.ID;
                const getByIdPaciente = this.service.getNotasByIdPaciente(IdPaciente);
    
                res.status(202).json({
                    notas: getByIdPaciente
                })
            } catch (error) {
                res.status(500).json({
                    message: "Error al traer las notas del paciente: " + error.message
                });
            }
        }
}