// src/components/request/forms/LocationsAndDatesForm.tsx
import React, { useCallback, ChangeEvent } from 'react'
import { ILocation } from '../../../interfaces/ILocation'
import '../../../styles/request/LocationsAndDatesForm.css'

export const createLocationData = (): ILocation => ({
  id: Date.now(),
  location: '',
  municipality: '',
  periodStart: '',
  periodEnd: '',
  totalDistanceKm: 0,
})

interface LocationsAndDatesFormProps {
  locations: ILocation[]
  setLocations: React.Dispatch<React.SetStateAction<ILocation[]>>
}

const LocationsAndDatesForm: React.FC<LocationsAndDatesFormProps> = ({ locations, setLocations }) => {
  const addLocation = useCallback(() => {
    setLocations(prev => [...prev, createLocationData()])
  }, [setLocations])

  const updateLocation = useCallback(
    (id: number, field: keyof Omit<ILocation, 'id'>, value: string | number) => {
      setLocations(prev =>
        prev.map(loc => (loc.id === id ? { ...loc, [field]: value } : loc))
      )
    }, [setLocations])

  const handleNumberChange = useCallback(
    (id: number, e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value)
      updateLocation(id, 'totalDistanceKm', isNaN(value) ? 0 : value)
    }, [updateLocation])

  const deleteLocation = useCallback((id: number) => {
    setLocations(prev => (prev.length === 1 ? prev : prev.filter((loc, index) => index === 0 || loc.id !== id)))
  }, [setLocations])

  return (
    <fieldset>
      <div id="locations" className="form-section">
        <legend>3 - Locais e Datas</legend>
        {locations.map((loc, index) => (
          <div key={loc.id} className="location">
            <div className="form-group input-group">
              <label htmlFor={`location-${loc.id}`}>Local:</label>
              <input
                id={`location-${loc.id}`}
                type="text"
                name="location"
                placeholder="Local"
                value={loc.location}
                onChange={(e) => loc.id !== undefined && updateLocation(loc.id, 'location', e.target.value)} />
            </div>

            <div className="form-group input-group">
              <label htmlFor={`municipality-${loc.id}`}>Município:</label>
              <input
                id={`municipality-${loc.id}`}
                type="text"
                name="municipality"
                placeholder="Município"
                value={loc.municipality}
                onChange={(e) => loc.id !== undefined && updateLocation(loc.id, 'municipality', e.target.value)} />
            </div>

            <div className="form-group input-group">
              <label htmlFor={`periodStart-${loc.id}`}>Período (Início):</label>
              <input
                id={`periodStart-${loc.id}`}
                type="date"
                name="periodStart"
                value={loc.periodStart instanceof Date ? loc.periodStart.toISOString().split('T')[0] : loc.periodStart}
                onChange={(e) => loc.id !== undefined && updateLocation(loc.id, 'periodStart', e.target.value)} />
            </div>

            <div className="form-group input-group">
              <label htmlFor={`periodEnd-${loc.id}`}>Período (Fim):</label>
              <input
                id={`periodEnd-${loc.id}`}
                type="date"
                name="periodEnd"
                value={loc.periodEnd instanceof Date ? loc.periodEnd.toISOString().split('T')[0] : loc.periodEnd}
                onChange={(e) => loc.id !== undefined && updateLocation(loc.id, 'periodEnd', e.target.value)} />
            </div>

            <div className="form-group input-group">
              <label htmlFor={`totalDistanceKm-${loc.id}`}>Quilometragem Total (Km):</label>
              <input
                id={`totalDistanceKm-${loc.id}`}
                type="number"
                name="totalDistanceKm"
                value={loc.totalDistanceKm}
                onChange={(e) => loc.id !== undefined && handleNumberChange(loc.id, e)} />
            </div>

            {index > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => loc.id !== undefined && deleteLocation(loc.id)} >
                Excluir
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={addLocation}>
        Adicionar Local
      </button>
    </fieldset>
  )
}

export default LocationsAndDatesForm
