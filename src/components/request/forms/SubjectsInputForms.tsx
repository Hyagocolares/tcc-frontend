// src/components/request/forms/SubjectsInputForms.tsx
import React, { ChangeEvent, useCallback } from 'react'
import { ISubject } from '../../../interfaces/ISubject'
import '../../../styles/request/SubjectsForms.css'

interface SubjectsFormProps {
  subjects: ISubject[]
  setSubjects: React.Dispatch<React.SetStateAction<ISubject[]>>
}

export const createSubject = (): ISubject => ({
  id: Date.now(),
  subject: '',
  classGroup: '',
  numberOfStudents: 0,
  workload: 0,
  fileBase64: '',
  fileName: '',
  fileType: 'application/octet-stream'
})

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

const SubjectsForm: React.FC<SubjectsFormProps> = ({ subjects, setSubjects }) => {
  const addSubject = useCallback(() => {
    setSubjects(prev => [...prev, createSubject()])
  }, [setSubjects])

  const updateSubject = useCallback((id: number, field: keyof Omit<ISubject, 'id'>, value: any) => {
    setSubjects(prev =>
      prev.map(subject => subject.id === id ? { ...subject, [field]: value } : subject)
    )
  }, [setSubjects])

  const deleteSubject = useCallback((id: number) => {
    if (subjects.length === 1) return
    setSubjects(prev => prev.filter((subject, index) => index === 0 || subject.id !== id))
  }, [subjects, setSubjects])

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
        updateSubject(id, 'fileBase64', base64);
        updateSubject(id, 'fileName', file.name);
        updateSubject(id, 'fileType', file.type);
      } catch (error) {
        alert('Erro ao ler o arquivo');
        updateSubject(id, 'fileBase64', '');
      }
    } else {
      updateSubject(id, 'fileBase64', '');
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

  return (
    <div>
      <h2>2 - Disciplinas Contempladas</h2>
      <div id="subjects" className="form-section">
        {subjects.map((subject, index) => (
          <div key={subject.id} className="subject">
            <label htmlFor={`subject-${subject.id}`}>Disciplina:</label>
            <input
              id={`subject-${subject.id}`}
              type="text"
              name="subject"
              placeholder="Nome da disciplina"
              value={subject.subject}
              onChange={(e) =>
                updateSubject(subject.id, 'subject', e.target.value)
              }
            />

            <label htmlFor={`classGroup-${subject.id}`}>Turma:</label>
            <input
              id={`classGroup-${subject.id}`}
              type="text"
              name="classGroup"
              placeholder="Turma"
              value={subject.classGroup}
              onChange={(e) =>
                updateSubject(subject.id, 'classGroup', e.target.value)
              }
            />

            <label htmlFor={`numberOfStudents-${subject.id}`}>
              Nº de Alunos:
            </label>
            <input
              id={`numberOfStudents-${subject.id}`}
              type="number"
              name="numberOfStudents"
              value={subject.numberOfStudents}
              onChange={(e) =>
                updateSubject(
                  subject.id,
                  'numberOfStudents',
                  parseInt(e.target.value, 10) || 0
                )
              }
            />

            <label htmlFor={`workload-${subject.id}`}>Carga Horária:</label>
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
              }
            />

            <label htmlFor={`fileInput-${subject.id}`}>
              Ficha de alunos:
            </label>
            <div className="file-upload-container">
              <label htmlFor={`fileInput-${subject.id}`} className="custom-file-input">
                <span className="upload-icon">📁</span>
                {subject.fileBase64 ? 'Alterar Arquivo' : 'Selecionar Arquivo'}
              </label>
              <input
                id={`fileInput-${subject.id}`}
                type="file"
                onChange={(e) => handleFileChange(e, subject.id)}
                className="hidden-input"
              />

              {subject.fileBase64 && (
                <div className="file-preview">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(subject.fileType)}</span>
                    <div className="file-details">
                      <span className="file-name">{subject.fileName}</span>
                      <span className="file-meta">
                        {subject.fileType} • 
                        {(subject.fileBase64.length * 0.75 / 1024 / 1024).toFixed(2)}MB
                      </span>
                    </div>
                  </div>
                  <button
                    className="download-btn"
                    onClick={() => downloadFile(subject.fileBase64!, subject.fileName!, subject.fileType!)}
                  >
                    ⬇️
                  </button>
                </div>
              )}

              <div className="file-requirements">
                Tipos permitidos: Qualquer tipo de arquivo (até 5MB)
              </div>
            </div>

              {/* <div className="file-upload-container">
                <label 
                  htmlFor={`fileInput-${subject.id}`}
                  className="custom-file-input"
                >
                  <span className="upload-icon">📁</span>
                  {subject.fileBase64 ? 'Alterar Arquivo' : 'Selecionar Arquivo'}
                </label>
                <input
                  id={`fileInput-${subject.id}`}
                  type="file"
                  name="fileInput"
                  onChange={(e) => handleFileChange(e, subject.id)}
                  className="hidden-input"
                  accept=".pdf,.doc,.docx,.txt"
                />

                {subject.fileBase64 && (
                  <div className="file-preview">
                    <div className="file-info">
                      <span className="file-name">{subject.fileName}</span>
                      <span className="file-type">{subject.fileType}</span>
                      <span className="file-size">
                        ({(subject.fileBase64.length * 0.75 / 1024 / 1024).toFixed(2)}MB)
                      </span>
                    </div>
                    <button
                      onClick={() => downloadFile(subject.fileBase64!, subject.fileName!, subject.fileType!)}
                    >
                      Baixar
                    </button>
                  </div>
                )}

                <div className="file-requirements">
                  Tipos permitidos: PDF, DOC, DOCX, TXT (até 5MB)
                </div>
              </div> */}
            
            {/* Renderiza o botão de exclusão apenas para os itens adicionais */}
            {index > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => deleteSubject(subject.id)}
              >
                Excluir
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={addSubject}>
        Adicionar Disciplina
      </button>
    </div>
  )
}

export default SubjectsForm
