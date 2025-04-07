// src/components/requestForm/forms/SubjectsForms.tsx
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ISubject } from '../../../interfaces/ISubject'
import '../../../styles/request/SubjectsForms.css'
import { IUserApplicant } from '../../../interfaces/IUserApplicant'
import { IDiscipline } from '../../../interfaces/IDiscipline'
import { getDisciplines } from '../../../utils/debouncedUpdateTeachers'

export const createSubject = (applicantIds: number[]): ISubject => ({
  id: Date.now(),
  subject: { id: 0 },
  classGroup: '',
  studentCount: 0,
  workload: 0,
  fileData: '',
  fileName: '',
  fileType: 'application/octet-stream',
  applicantId: applicantIds,
})

interface SubjectsFormProps {
  subjects: ISubject[]
  setSubjects: React.Dispatch<React.SetStateAction<ISubject[]>>
  applicants: IUserApplicant[]
}

const SubjectsForm: React.FC<SubjectsFormProps> = ({ subjects, setSubjects, applicants }) => {
  const [subjectInputs, setSubjectInputs] = useState<{ [key: number]: string }>({});
  const [disciplinesList, setDisciplinesList] = useState<IDiscipline[]>([]);
  const [filteredDisciplines, setFilteredDisciplines] = useState<IDiscipline[]>([]);

  useEffect(() => {
    async function fetchDisciplines() {
      try {
        const data = await getDisciplines();
        setDisciplinesList(data.disciplines || []);
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
      }
    }
    fetchDisciplines();
  }, []);

  useEffect(() => {
    if (applicants.length === 0) {
      console.warn("Nenhum applicant encontrado!");
    }
  }, [applicants]);

  const addSubject = useCallback(() => {
    setSubjects(prev => [...prev, createSubject(applicants.map(applicant => applicant.id))]);
  }, [setSubjects]);

  const updateSubject = useCallback((id: number, field: keyof Omit<ISubject, 'id'>, value: any) => {
    setSubjects(prev =>
      prev.map(subject => subject.id === id ? { ...subject, [field]: value } : subject)
    );
  }, [setSubjects]);

  const deleteSubject = useCallback((id: number) => {
    if (subjects.length === 1) return;
    setSubjects(prev => prev.filter(subject => subject.id !== id));
    setSubjectInputs(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }, [subjects, setSubjects]);

  const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert('Arquivo muito grande! Tamanho máximo permitido: 5MB');
        return;
      }

      try {
        const base64 = await convertFileToBase64(file);
        updateSubject(id, 'fileData', base64);
        updateSubject(id, 'fileName', file.name);
        updateSubject(id, 'fileType', file.type);
      } catch (error) {
        alert('Erro ao ler o arquivo');
        updateSubject(id, 'fileData', '');
      }
    } else {
      updateSubject(id, 'fileData', '');
      updateSubject(id, 'fileName', '');
      updateSubject(id, 'fileType', '');
    }
  }, [updateSubject]);

  const getFileIcon = (fileType: string): string => {
    const typeMap: { [key: string]: string } = {
      'application/pdf': '📄',
      'image/': '🖼️',
      'video/': '🎥',
      'audio/': '🎵',
      'text/': '📝',
      'application/zip': '📦',
      'default': '📁'
    }

    const match = Object.keys(typeMap).find(key => fileType.startsWith(key))
    return match ? typeMap[match] : typeMap.default
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = error => reject(error)
    })
  }

  const downloadFile = (base64: string, fileName: string, mimeType: string) => {
    const link = document.createElement('a')
    link.href = `data:${mimeType};base64,${base64}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const filteredDisciplines = disciplinesList.filter(discipline =>
      Array.isArray(discipline.teachers) &&
      discipline.teachers.some(teacher =>
        applicants.some(applicant => teacher.id === applicant.id)
      )
    );

    setFilteredDisciplines(filteredDisciplines);
  }, [applicants, disciplinesList]);

  return (
    <fieldset>
      <div id="subjects" className="form-section">
        <legend>2 - Disciplinas Contempladas</legend>
        {subjects.map((subject, index) => (
          <div key={subject.id} className="form-group subject">
            <div className='input-group'>
              <label htmlFor={`subject-${subject.id}`}>Disciplina:</label>
              <input
                id={`subject-${subject.id}`}
                type="text"
                name="subject"
                placeholder="Nome da disciplina"
                value={subjectInputs[subject.id] || ''}
                list={`disciplineList-${subject.id}`}
                onChange={(e) => {
                  setSubjectInputs(prev => ({ ...prev, [subject.id]: e.target.value }));
                }}
                onBlur={() => {
                  const inputVal = subjectInputs[subject.id];
                  const selectedDiscipline = disciplinesList.find((d: any) => d.name === inputVal);
                  if (selectedDiscipline) {
                    updateSubject(subject.id, 'subject', { id: selectedDiscipline.id });
                  } else {
                    setSubjectInputs(prev => ({ ...prev, [subject.id]: '' }));
                    updateSubject(subject.id, 'subject', { id: 0 });
                  }
                }}
              />
              <datalist id={`disciplineList-${subject.id}`}>
                {filteredDisciplines.map(discipline => (
                  <option key={discipline.id} value={discipline.name} />
                ))}
              </datalist>
            </div>

            <div className='input-group'>
              <label htmlFor={`classGroup-${subject.id}`}>Turma:</label>
              <input
                id={`classGroup-${subject.id}`}
                type="text"
                name="classGroup"
                placeholder="Turma"
                value={subject.classGroup}
                onChange={(e) =>
                  updateSubject(subject.id, 'classGroup', e.target.value)
                } />
            </div>

            <div className='input-group'>
              <label htmlFor={`numberOfStudents-${subject.id}`}>
                Nº de Alunos:
              </label>
              <input id={`numberOfStudents-${subject.id}`}
                type="number"
                name="numberOfStudents"
                value={subject.studentCount}
                onChange={(e) =>
                  updateSubject(
                    subject.id,
                    'studentCount',
                    parseInt(e.target.value, 10) || 0
                  )
                } />
            </div>

            <div className='input-group'>
              <label htmlFor={`workload-${subject.id}`}>
                Carga Horária:
              </label>
              <input
                id={`workload-${subject.id}`}
                type="number"
                name="workload"
                value={subject.workload}
                onChange={(e) =>
                  updateSubject(
                    subject.id,
                    'workload',
                    parseInt(e.target.value, 10) || 0
                  )
                } />
            </div>

            <div className='file-group'>
              <div className='input-group'>
                <label htmlFor={`fileInput-${subject.id}`}>
                  Ficha de alunos:
                </label>

                <label htmlFor={`fileInput-${subject.id}`} className="custom-file-input">
                  <span className="upload-icon">📁</span>
                  {subject.fileData ? 'Alterar Arquivo' : 'Selecionar Arquivo'}
                </label>
              </div>

              <input id={`fileInput-${subject.id}`}
                type="file"
                onChange={(e) => handleFileChange(e, subject.id)}
                className="hidden-input"
              />

              {subject.fileData && (
                <div className="file-preview">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(subject.fileType)}</span>
                    <div className="file-details">
                      <span className="file-name">{subject.fileName}</span>
                      <span className="file-meta">
                        {subject.fileType} •
                        {(subject.fileData.length * 0.75 / 1024 / 1024).toFixed(2)}MB
                      </span>
                    </div>
                  </div>
                  <button
                    className="download-btn"
                    onClick={() => downloadFile(subject.fileData!, subject.fileName!, subject.fileType!)} >
                    ⬇️
                  </button>
                </div>
              )}

              <div className="file-requirements">
                Tipos permitidos: Qualquer tipo de arquivo (até 5MB)
              </div>
            </div>

            {index > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => deleteSubject(subject.id)}>
                Excluir
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={addSubject}>
        Adicionar Disciplina
      </button>
    </fieldset>
  )
}

export default SubjectsForm
