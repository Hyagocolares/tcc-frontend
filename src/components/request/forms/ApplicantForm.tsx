// src/components/request/forms/SolicitanteForm.tsx
import React, { useState, useCallback, useEffect } from 'react'
import { IUserApplicant } from '../../../interfaces/IUserApplicant'
import '../../../styles/request/SolicitanteForm.css'

export const createApplicant = (): IUserApplicant => ({
  id: Date.now(),
  name: '',
})

interface ApplicantFormProps {
  applicants: IUserApplicant[]
  setApplicants: React.Dispatch<React.SetStateAction<IUserApplicant[]>>
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ setApplicants }) => {
  const [professorApplicant, setProfessorApplicant] = useState<string>('')
  const [outrosApplicant, setOutrosApplicant] = useState<IUserApplicant[]>([createApplicant()])

  const handleProfessorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProfessorApplicant(e.target.value)
  }, [])

  const addSolicitante = useCallback(() => {
    setOutrosApplicant(prev => [...prev, createApplicant()])
  }, [])

  const updateSolicitante = useCallback(
    (id: number, newNome: string) => {
      setOutrosApplicant((prev) => prev.map(solicitante => (solicitante.id === id ? { ...solicitante, name: newNome } : solicitante))
      )
    }, [])

  const deleteSolicitante = useCallback((id: number) => {
    setOutrosApplicant((prev) => prev.filter(solicitante => solicitante.id !== id))
  }, [])

  useEffect(() => {
    const allApplicants = professorApplicant
      ? [{ id: Date.now(), name: professorApplicant }, ...outrosApplicant]
      : [...outrosApplicant]
    setApplicants(allApplicants)
  }, [professorApplicant, outrosApplicant, setApplicants])

  return (
    <div>
      <h2>1 - Solicitantes (Professores)</h2>
      <div className="form-section">
        <h3 className="section-title">
          Nome do(s) Solicitante(s)
        </h3>
        <div className="form-group">
          <label>Professor Solicitante:</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite o nome do professor solicitante"
              value={professorApplicant}
              onChange={handleProfessorChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Outros Solicitantes:</label>
          {outrosApplicant.map((solicitante) => (
            <div key={solicitante.id} className="input-group">
              <input
                type="text"
                placeholder="Digite o nome do solicitante"
                value={solicitante.name}
                onChange={(e) => updateSolicitante(solicitante.id, e.target.value)}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => deleteSolicitante(solicitante.id)}
              >
                Excluir
              </button>
            </div>
          ))}
          <button type="button" onClick={addSolicitante}>
            Adicionar + Solicitantes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicantForm
