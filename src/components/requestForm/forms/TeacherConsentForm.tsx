// src/components/request/forms/TeacherConsentForm.tsx
import React, { useCallback, ChangeEvent, useState, useEffect } from 'react'
import { ITeacherConsent } from '../../../interfaces/ITeacherConsent'
import { getDisciplines, getTeachers } from '../../../utils/debouncedUpdateTeachers';
import '../../../styles/request/TeacherConsentForm.css'
import { IDiscipline } from '../../../interfaces/IDiscipline';
import { ITeacher } from '../../../interfaces/ITeacher';

export const createTeacherConsentItem = (): ITeacherConsent => ({
  id: Date.now(),
  teacher: { id: 0 } as ITeacher,
  discipline: { id: 0 } as IDiscipline,
  date: '',
  timeIn: '',
  timeOut: '',
})

interface TeacherConsentFormProps {
  consents: ITeacherConsent[]
  setConsents: React.Dispatch<React.SetStateAction<ITeacherConsent[]>>
}

const TeacherConsentForm: React.FC<TeacherConsentFormProps> = ({ consents, setConsents }) => {
  const [disciplineSuggestions, setDisciplineSuggestions] = useState<IDiscipline[]>([]);
  const [teacherList, setTeacherList] = useState<ITeacher[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const teachersData = await getTeachers()
        const disciplineData = await getDisciplines()

        console.log('❌ TeacherConsentForm.tsx: teachersData: ', teachersData)
        console.log('❌ TeacherConsentForm.tsx: disciplineData: ', disciplineData?.disciplines)

        setTeacherList(teachersData?.teachers || [])
        // Extrai as disciplinas de todos os professores
        const disciplines = teachersData?.teachers?.flatMap((teacher: { disciplines: any; }) => teacher.disciplines || []);
        setDisciplineSuggestions(disciplines || [])
        console.log('❌ TeacherConsentForm.tsx: disciplines: ', disciplines)
      } catch (error) {
        console.error('Erro ao carregar a lista de professores:', error)
      }
    }
    fetchTeachers()
  }, [])

  // Função auxiliar para obter as disciplinas do professor selecionado
  const getDisciplineOptions = (teacherName?: string): IDiscipline[] => {
    if (!teacherName) return [];

    const teacherFound = teacherList.find(
      teacher => teacher.name.toLowerCase() === teacherName.toLowerCase()
    );
    return teacherFound?.disciplines || [];
  };

  const addTeacherConsent = useCallback(() => {
    setConsents(prev => [...prev, createTeacherConsentItem()])
  }, [setConsents])

  const updateConsent = useCallback(
    (id: number, field: keyof Omit<ITeacherConsent, 'id'>, value: any) => {
      setConsents(prev =>
        prev.map(consent =>
          consent.id === id ? { ...consent, [field]: value } : consent
        )
      )
    }, [setConsents])

  const removeConsent = useCallback(
    (id: number, index: number) => {
      if (index === 0) return
      setConsents(prev => prev.filter((consent, i) => i === 0 || consent.id !== id))
    }, [setConsents])

  const handleTeacherNameChange = useCallback(
    (id: number, value: string) => {
      // Buscar professor pelo nome
      const teacherFound = teacherList.find(
        teacher => teacher.name?.toLowerCase() === value.toLowerCase()
      );

      if (teacherFound) {
        // Atualiza armazenando o objeto completo
        updateConsent(id, 'teacher', teacherFound);
        setDisciplineSuggestions(teacherFound.disciplines || []);
      } else {
        updateConsent(id, 'teacher', { id: 0 })
        setDisciplineSuggestions([]);
      }

      updateConsent(id, 'discipline', { id: 0 })
    }, [teacherList, updateConsent]);

  const handleDisciplineChange = useCallback(
    (id: number, value: string) => {
      const disciplineFound = disciplineSuggestions.find(
        discipline => discipline.name.toLowerCase() === value.toLowerCase()
      );

      if (disciplineFound) {
        updateConsent(id, 'discipline', disciplineFound);
      } else {
        updateConsent(id, 'discipline', { id: 0 })
      }
    }, [disciplineSuggestions, updateConsent]);


  return (
    <fieldset>
      <div id="teacherConsent" className="form-section">
        <legend>6 - Anuência dos Professores</legend>
        {consents.map((consent, index) => (
          <div key={consent.id} className="teacher">
            <div className="form-group input-group">
              <label htmlFor={`teacherName-${consent.id}`}>Nome do Professor:</label>
              <input
                id={`teacherName-${consent.id}`}
                type="text"
                name="teacherName"
                placeholder="Nome do professor"
                list={`teacherSuggestionsConsent-${consent.id}`}
                value={
                  teacherList.find(teacher => teacher.id === consent.teacher?.id)?.name || ''
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleTeacherNameChange(consent.id, e.target.value)
                }
              />
              <datalist id={`teacherSuggestionsConsent-${consent.id}`}>
                {teacherList.map(teacher => (
                  <option key={teacher.id} value={teacher.name} />
                ))}
              </datalist>
            </div>

            <div className="form-group input-group">
              <label htmlFor={`subjectConsent-${consent.id}`}>Disciplina:</label>
              <input
                id={`subjectConsent-${consent.id}`}
                type="text"
                name="subjectConsent"
                placeholder="Nome da disciplina"
                value={
                  disciplineSuggestions.find(d => d.id === consent.discipline?.id)?.name || ''
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDisciplineChange(consent.id, e.target.value)
                }
                list={`disciplineSuggestions-teacherConsent-${consent.id}`}
              />
              <datalist id={`disciplineSuggestions-teacherConsent-${consent.id}`}>
                {consent.teacher?.name &&
                  getDisciplineOptions(consent.teacher.name).map(discipline => (
                    <option key={discipline.id} value={discipline.name} />
                  ))
                }
              </datalist>
            </div>

            <div className="form-group input-group">
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
            </div>
            <div className="form-group input-group">
              <label htmlFor={`time1-${consent.id}`}>Horário de incio:</label>
              <input
                id={`time1-${consent.id}`}
                type="time"
                name="time"
                value={consent.timeIn}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateConsent(consent.id, 'timeIn', e.target.value)
                }
              />
            </div>
            <div className="form-group input-group">
              <label htmlFor={`time2-${consent.id}`}>Horário do fim:</label>
              <input
                id={`time2-${consent.id}`}
                type="time"
                name="time"
                value={consent.timeOut}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateConsent(consent.id, 'timeOut', e.target.value)
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

      <button
        type="button"
        className="add-btn"
        onClick={addTeacherConsent}>
        Adicionar Anuência
      </button>
    </fieldset>
  )
}

export default TeacherConsentForm
