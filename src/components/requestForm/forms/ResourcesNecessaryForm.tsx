// src/components/requestForm/forms/ResourcesNecessaryForm.tsx
import React, { useCallback, ChangeEvent } from 'react'
import { IResource } from '../../../interfaces/IResource'
import '../../../styles/request/ResourcesNecessaryForm.css'

export const createResource = (): IResource => ({
  id: Date.now(),
  resource: '',
  quantity: 0,
  quantityPerDay: 0,
})

interface ResourcesNecessaryFormProps {
  resources: IResource[]
  setResources: React.Dispatch<React.SetStateAction<IResource[]>>
}

const ResourcesNecessaryForm: React.FC<ResourcesNecessaryFormProps> = ({ resources, setResources }) => {
  const addResource = useCallback(() => {
    setResources(prev => [...prev, createResource()])
  }, [setResources])

  const updateResource = useCallback(
    (id: number, field: keyof Omit<IResource, 'id'>, value: string | number) => {
      setResources(prev =>
        prev.map(res => (res.id === id ? { ...res, [field]: value } : res))
      )
    }, [setResources])

  const handleNumberChange = useCallback(
    (id: number, field: 'quantity' | 'quantityPerDay', e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value)
      updateResource(id, field, isNaN(value) ? 0 : value)
    }, [updateResource])

  const deleteResource = useCallback(
    (id: number, index: number) => {
      if (index === 0) return
      setResources(prev => prev.filter((res, idx) => idx === 0 || res.id !== id))
    }, [setResources])

  return (
    <fieldset>
      <div id="resources" className="form-section">
        <legend>5 - Recursos Necessários</legend>
        {resources.map((res, index) => (
          <div key={res.id} className="resource">
            <div className="form-group input-group">
              <label htmlFor={`resource-${res.id}`}>Recurso:</label>
              <input
                id={`resource-${res.id}`}
                type="text"
                name="resource"
                list="resourceList"
                placeholder="Selecione ou digite o recurso"
                value={res.resource}
                onChange={(e) =>
                  updateResource(res.id, 'resource', e.target.value)
                }
              />
              <datalist id="resourceList">
                <option value="Café" />
                <option value="Almoço" />
                <option value="Jantar" />
              </datalist>
            </div>
            <div className="form-group input-group">
              <label htmlFor={`quantity-${res.id}`}>Quantidade Pessoas:</label>
              <input
                id={`quantity-${res.id}`}
                type="number"
                name="quantity"
                value={res.quantity}
                onChange={(e) => handleNumberChange(res.id, 'quantity', e)}
              />
            </div>
            <div className="form-group input-group">
              <label htmlFor={`quantityDay-${res.id}`}>Quantidade Dias:</label>
              <input
                id={`quantityDay-${res.id}`}
                type="number"
                name="quantityDay"
                value={res.quantityPerDay}
                onChange={(e) => handleNumberChange(res.id, 'quantityPerDay', e)}
              />
            </div>

            {index > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => deleteResource(res.id, index)}
              >
                Excluir
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={addResource}>
        Adicionar Recurso
      </button>
    </fieldset>
  )
}

export default ResourcesNecessaryForm
