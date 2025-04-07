// src/components/request/forms/ItineraryForm.tsx
import React, { useCallback, ChangeEvent } from 'react'
import { IItineraryItem } from '../../../interfaces/IItineraryItem'
import '../../../styles/request/ItineraryForm.css'

export const createItineraryItem = (): IItineraryItem => ({
  id: Date.now(),
  date: '',
  origin: '',
  destination: '',
  activity: '',
  departureTime: '',
  arrivalTime: '',
  unpavedRoadKm: false,
  kilometers: 0,
  roadCondition: 'Boa',
  hasWoodenBridge: false,
  hasFerry: false,
  hasToll: false,
})

interface ItineraryFormProps {
  itinerary: IItineraryItem[]
  setItinerary: React.Dispatch<React.SetStateAction<IItineraryItem[]>>
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ itinerary, setItinerary }) => {
  const addTrip = useCallback(() => {
    setItinerary(prev => [...prev, createItineraryItem()])
  }, [setItinerary])

  const updateTrip = useCallback(
    (id: number, field: keyof Omit<IItineraryItem, 'id'>, value: string | number | boolean) => {
      setItinerary(prev =>
        prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
      )
    }, [setItinerary])

  const removeTrip = useCallback(
    (id: number, index: number) => {
      if (index === 0) return
      setItinerary(prev => prev.filter((_, idx) => idx === 0 || _.id !== id))
    }, [setItinerary])

  return (
    <fieldset>
      <div id="itineraryTable" className="form-section">
        <legend>4 - Roteiro da Viagem</legend>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Atividade</th>
              <th>Hora de Saída</th>
              <th>Hora de Chegada</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody id="itinerary">
            {itinerary.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTrip(item.id, 'date', e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    placeholder="Origem"
                    value={item.origin}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTrip(item.id, 'origin', e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    placeholder="Destino"
                    value={item.destination}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTrip(item.id, 'destination', e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    placeholder="Atividade"
                    value={item.activity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTrip(item.id, 'activity', e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="time"
                    value={item.departureTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTrip(item.id, 'departureTime', e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="time"
                    value={item.arrivalTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTrip(item.id, 'arrivalTime', e.target.value)
                    }
                  />
                </td>

                <td>
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeTrip(item.id, index)}
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={addTrip}>
        Adicionar Roteiro
      </button>

      <div className='form-section'>
        <div className='itineraryForm'>
          <label>O ônibus percorrerá estradas sem asfalto?</label>
          <select
            name="unpavedRoad"
            value={itinerary[0]?.unpavedRoadKm ? 'true' : 'false'}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              updateTrip(itinerary[0]?.id || 0, 'unpavedRoadKm', e.target.value === 'true')
            }
          >
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>
        </div>

        <div className="itineraryForm">
          <label>Quantos Km?</label>
          <input
            type="number"
            name="kilometers"
            value={itinerary[0]?.kilometers || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateTrip(itinerary[0]?.id || 0, 'kilometers', Number(e.target.value))
            }
            placeholder="Digite a distância"
          />
        </div>

        <div className='itineraryForm'>
          <label>Quais as condições da estrada?</label>
          <select
            name="roadCondition"
            value={itinerary[0]?.roadCondition || 'Boa'}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              updateTrip(itinerary[0]?.id || 0, 'roadCondition', e.target.value as "Boa" | "Regular" | "Ruim")
            }
          >
            <option value="Boa">Boa</option>
            <option value="Regular">Regular</option>
            <option value="Ruim">Ruim</option>
          </select>
        </div>

        <div className='itineraryForm'>
          <label>Existe ponte de madeira no trajeto?</label>
          <select
            name="hasWoodenBridge"
            value={itinerary[0]?.hasWoodenBridge ? 'true' : 'false'}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              updateTrip(itinerary[0]?.id || 0, 'hasWoodenBridge', e.target.value === 'true')
            }
          >
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>
        </div>

        <div className='itineraryForm'>
          <label>Existe balsa no trajeto?</label>
          <select
            name="hasFerry"
            value={itinerary[0]?.hasFerry ? 'true' : 'false'}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              updateTrip(itinerary[0]?.id || 0, 'hasFerry', e.target.value === 'true')
            }
          >
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>
        </div>

        <div className='itineraryForm'>
          <label>Existe pedágio no trajeto?</label>
          <select
            name="hasToll"
            value={itinerary[0]?.hasToll ? 'true' : 'false'}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              updateTrip(itinerary[0]?.id || 0, 'hasToll', e.target.value === 'true')
            }
          >
            <option value="false">Não</option>
            <option value="true">Sim</option>
          </select>
        </div>
      </div>
    </fieldset>
  )
}

export default ItineraryForm
