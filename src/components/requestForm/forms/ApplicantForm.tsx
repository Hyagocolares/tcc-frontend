// src/components/requestForm/forms/ApplicantForm.tsx
import React, { useState, useCallback, useEffect } from 'react'
import { IUserApplicant } from '../../../interfaces/IUserApplicant'
import { getTeachers, getUser } from '../../../utils/debouncedUpdateTeachers';
import { jwtDecode } from 'jwt-decode';
import '../../../styles/request/SolicitanteForm.css'

export const createApplicant = (): IUserApplicant => ({
  id: Date.now(),
  name: '',
});

interface ApplicantFormProps {
  applicants: IUserApplicant[]
  setApplicants: React.Dispatch<React.SetStateAction<IUserApplicant[]>>
}

interface DecodedToken {
  id: number
  email: string
  category: string
  iat: number
  exp: number
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ setApplicants }) => {
  const [professorApplicant, setProfessorApplicant] = useState<IUserApplicant | undefined>(undefined);
  const [teacherList, setTeacherList] = useState<IUserApplicant[]>([]);
  const [outrosApplicant, setOutrosApplicant] = useState<IUserApplicant[]>([createApplicant()])

  // Carregar dados do usuário
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado');

        const decoded = jwtDecode<DecodedToken>(token);
        const [userData, teachersData] = await Promise.all([
          getUser(decoded.id),
          getTeachers(),
        ]);

        setProfessorApplicant(userData?.user || null);
        setTeacherList(teachersData?.teachers || []);
        // console.log("Dados do usuário carregados:", userData?.user);
        // console.log("Lista de professores carregada:", teachersData?.teachers);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        window.location.href = '/login';
      }
    };

    loadInitialData();
  }, []);

  // Manipulação de solicitantes [Adição]
  const addSolicitante = useCallback(() => {
    setOutrosApplicant(prev => [...prev, createApplicant()]);
  }, []);

  // Manipulação de solicitantes [Update]
  const updateSolicitante = useCallback((index: number, newName: string) => {
    // Agora, ao atualizar, verificamos se o nome digitado corresponde a um professor da teacherList
    setOutrosApplicant(prev =>
      prev.map((solicitante, i) => {
        if (i === index) {
          // Se o nome corresponder a um professor da lista, atualizamos com o id real
          const teacher = teacherList.find(t => t.name === newName);
          return teacher
            ? { ...solicitante, name: teacher.name, id: teacher.id }
            : { ...solicitante, name: newName, id: 0 };
        }
        return solicitante;
      })
    );
  }, [teacherList]);

  // Manipulação de solicitantes [Delete]
  const deleteSolicitante = useCallback((index: number) => {
    setOutrosApplicant(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Sincronizar estados
  useEffect(() => {
    const allApplicants = [
      ...(professorApplicant ? [professorApplicant] : []),
      ...outrosApplicant,
    ];

    // Mapeia para enviar somente os campos necessários
    const transformedApplicants = allApplicants.map(({ id }) => ({ id }));

    // console.log('transformedApplicants: ', transformedApplicants);
    setApplicants(transformedApplicants);
  }, [professorApplicant, outrosApplicant, setApplicants]);

  return (
    <fieldset>
      <div className="form-section">
        <legend>1 - Solicitantes (Professores)</legend>

        <div className="form-group">
          <label>Professor Solicitante:</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite o nome do professor solicitante"
              value={professorApplicant?.name ?? ''}
              disabled
            />
          </div>
        </div>

        <div className="form-group">
          <label>Outros Solicitantes:</label>
          {outrosApplicant.map((solicitante, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                placeholder="Digite o nome do solicitante ou Adicionar professor"
                value={solicitante.name}
                onChange={(e) => updateSolicitante(index, e.target.value)}
                onBlur={(e) => {
                  const teacher = teacherList.find(t => t.name === e.target.value);
                  if (teacher) {
                    updateSolicitante(index, teacher.name ?? '');
                  }
                }}
                list="teacherSuggestions"
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => deleteSolicitante(index)}
                aria-label="Remover professor"
              >
                ×
              </button>
            </div>
          ))}

          <datalist id="teacherSuggestions">
            {teacherList.map((teacher) => (
              <option key={teacher.id} value={teacher.name} />
            ))}
          </datalist>

          <button
            type="button"
            className="add-btn"
            onClick={addSolicitante}
            aria-label="Adicionar novo professor">
            + Adicionar Solicitante
          </button>
        </div>

      </div>
    </fieldset>
  )
}

export default ApplicantForm
