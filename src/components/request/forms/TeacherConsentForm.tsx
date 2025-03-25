// src/components/request/forms/TeacherConsentForm.tsx
import React, { useCallback, ChangeEvent } from 'react'
import { ITeacherConsent } from '../../../interfaces/ITeacherConsent'
import '../../../styles/request/TeacherConsentForm.css'

export const createTeacherConsentItem = (): ITeacherConsent => ({
  id: Date.now(),
  teacherName: '',
  disciplina: '',
  date: '',
  timeIn: '',
  timeOut: '',
  signature: '',
})

interface TeacherConsentFormProps {
  consents: ITeacherConsent[]
  setConsents: React.Dispatch<React.SetStateAction<ITeacherConsent[]>>
}

const TeacherConsentForm: React.FC<TeacherConsentFormProps> = ({ consents, setConsents }) => {
  const professorOptions = ['Professor A', 'Professor B', 'Professor C']

  const addTeacherConsent = useCallback(() => {
    setConsents(prev => [...prev, createTeacherConsentItem()])
  }, [setConsents])

  const updateConsent = useCallback((id: number, field: keyof Omit<ITeacherConsent, 'id'>, value: string) => {
    setConsents(prev =>
      prev.map(consent => consent.id === id ? { ...consent, [field]: value } : consent)
    )
  }, [setConsents])

  const handleTeacherNameChange = useCallback((id: number, value: string) => {
    updateConsent(id, 'teacherName', value)
    const newSubject = value ? `Disciplina de ${value}` : ''
    updateConsent(id, 'disciplina', newSubject)
  }, [updateConsent])

  const removeConsent = useCallback((id: number, index: number) => {
    if (index === 0) return
    setConsents(prev => prev.filter((consent, i) => i === 0 || consent.id !== id))
  }, [setConsents])

  return (
    <div>
      <h2>6 - Anuência dos Professores</h2>
      <div id="teacherConsent" className="form-section">
        {consents.map((consent, index) => (
          <div key={consent.id} className="teacher">
            <label htmlFor={`teacherName-${consent.id}`}>Nome do Professor:</label>
            <input
              id={`teacherName-${consent.id}`}
              type="text"
              name="teacherName"
              list="professorList"
              value={consent.teacherName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTeacherNameChange(consent.id, e.target.value)
              }
            />
            <datalist id="professorList">
              {professorOptions.map((option, idx) => (
                <option key={idx} value={option} />
              ))}
            </datalist>

            <label htmlFor={`subject-${consent.id}`}>Disciplina:</label>
            <input
              id={`subject-${consent.id}`}
              type="text"
              name="subject"
              value={consent.disciplina}
              disabled
            />

            <label htmlFor={`date-${consent.id}`}>Data:</label>
            <input
              id={`date-${consent.id}`}
              type="date"
              name="date"
              value={consent.date}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateConsent(consent.id, 'date', e.target.value)
              }
            />

            <label htmlFor={`time-${consent.id}`}>Horário de incio:</label>
            <input
              id={`time-${consent.id}`}
              type="time"
              name="time"
              value={consent.timeIn}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateConsent(consent.id, 'timeIn', e.target.value)
              }
            />

            <label htmlFor={`time-${consent.id}`}>Horário do fim:</label>
            <input
              id={`time-${consent.id}`}
              type="time"
              name="time"
              value={consent.timeOut}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateConsent(consent.id, 'timeOut', e.target.value)
              }
            />

            {consent.teacherName && (
              <div id={`signatureTeacher-${consent.id}`}>
                <label htmlFor={`signature-${consent.id}`}>Assinatura:</label>
                <input
                  id={`signature-${consent.id}`}
                  type="text"
                  name="signature"
                  value={consent.signature}
                  disabled
                />
              </div>
            )}

            {index > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeConsent(consent.id, index)}
              >
                Excluir
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={addTeacherConsent}>
        Adicionar Anuência
      </button>
    </div>
  )
}

export default TeacherConsentForm
