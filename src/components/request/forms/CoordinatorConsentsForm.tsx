// src/components/request/forms/CoordinatorConsentsForm.tsx
import React, { useCallback, ChangeEvent } from 'react'
import { ICoordinatorConsent } from '../../../interfaces/ICoordinatorConsent';
import '../../../styles/request/TeacherConsentForm.css'

export const createCoordinatorConsentItem = (): ICoordinatorConsent => ({
  id: Date.now(),
  opinion: '',
  request: { id: 0 },
  createdAt: new Date()
})

interface CoordinatorConsentFormProps {
  consents: ICoordinatorConsent[]
  setConsents: React.Dispatch<React.SetStateAction<ICoordinatorConsent[]>>
}

const CoordinatorConsentsForm: React.FC<CoordinatorConsentFormProps> = ({ consents, setConsents }) => {
  const addCoordinatorConsent = useCallback(() => {
    setConsents(prev => [...prev, createCoordinatorConsentItem()])
  }, [setConsents])

  const updateConsent = useCallback(
    (id: number, field: keyof Omit<ICoordinatorConsent, 'id' | 'request' | 'createdAt'>, value: string) => {
      setConsents(prev =>
        prev.map(consent =>
          consent.id === id ? { ...consent, [field]: value } : consent
        )
      );
    },
    [setConsents]
  );

  const removeConsent = useCallback(
    (id: number, index: number) => {
      if (index === 0) return;
      setConsents(prev => prev.filter((consent, i) => i === 0 || consent.id !== id));
    },
    [setConsents]
  );

  return (
    <div>
      <h2>7 - Consentimento do Coordenador</h2>
      <div id="coordinatorConsent" className="form-section coordinator-consents">
        {consents.map((consent, index) => (
          <div key={consent.id} className="form-group consent-group">
            <div className="input-group">
              <label htmlFor={`opinion-${consent.id}`}>Opinião:</label>
              <input
                id={`opinion-${consent.id}`}
                type="text"
                name="opinion"
                placeholder="Insira sua opinião"
                value={consent.opinion}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateConsent(consent.id, 'opinion', e.target.value)
                }
              />
            </div>
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
      <button type="button" className="add-btn" onClick={addCoordinatorConsent}>
        Adicionar Consentimento
      </button>
    </div>
  );
}

export default CoordinatorConsentsForm

