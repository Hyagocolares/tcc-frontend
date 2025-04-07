// src/components/registrations/RegisterCourse.tsx
import React, { useEffect, useState } from 'react'
import './RegisterCourse.css'

import api from '../../utils/API'
import Sidebar from '../home/sidebar/Siderbar'
import Header from '../home/header/Header'
import { clearCache, getCoordinator, getCourse, getDisciplines, getTeachers } from '../../utils/debouncedUpdateTeachers'
import { useNavigate, useParams } from 'react-router-dom'

interface User {
    id: number
    name: string
    email: string
}

interface Discipline {
    id: number
    name: string
    code: string
}

interface Course {
    name: string
    coordinators: string
    teachers: string
    disciplines: string
}

const RegisterCourse: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [coordinatorList, setCoordinatorList] = useState<User[]>([])
    const [teachersList, setTeachersList] = useState<User[]>([])
    const [disciplinesList, setDisciplinesList] = useState<Discipline[]>([])

    const [formData, setFormData] = useState<Course>({
        name: '',
        coordinators: '',
        teachers: '',
        disciplines: '',
    })

    // Estado para armazenar os dados brutos do curso
    const [courseFetched, setCourseFetched] = useState<any>(null)

    // Se existir id, busca os dados do curso para edição (sem converter ainda)
    useEffect(() => {
        if (id) {
            console.log(`Modo edição ativado para o curso com id: ${id}`)
            const fetchCourseData = async () => {
                try {
                    console.log(`Chamando getCourse(${id})...`)
                    const data = await getCourse(Number(id))
                    console.log('Dados recebidos do curso:', data)
                    const courseData = data.course ? data.course : data
                    // Armazena os dados brutos do curso para usar posteriormente
                    setCourseFetched(courseData)
                    // Preenche o nome, que não depende de conversão
                    setFormData(prev => ({ ...prev, name: courseData.name || '' }))
                } catch (error) {
                    console.error('Erro ao buscar dados do curso:', error)
                }
            }
            fetchCourseData()
        } else {
            console.log('Modo cadastro ativado para curso.')
        }
    }, [id])

    // Busca os dados de Coordenador
    useEffect(() => {
        const fetchCoordinatorData = async () => {
            try {
                console.log('Chamando getCoordinator...')
                const response = await getCoordinator()
                console.log('Coordinator response:', response)
                if (Array.isArray(response)) {
                    setCoordinatorList(response)
                } else if (response.coordinator && Array.isArray(response.coordinator)) {
                    setCoordinatorList(response.coordinator)
                } else {
                    setCoordinatorList([])
                }
            } catch (error) {
                console.error('Erro ao buscar coordinator:', error)
            }
        }
        fetchCoordinatorData()
    }, [])

    // Busca os dados de Professores
    useEffect(() => {
        const fetchTeachersData = async () => {
            try {
                console.log('Chamando getTeachers...')
                const response = await getTeachers()
                console.log('Teachers response:', response)
                if (Array.isArray(response)) {
                    setTeachersList(response)
                } else if (response.teachers && Array.isArray(response.teachers)) {
                    setTeachersList(response.teachers)
                } else {
                    setTeachersList([])
                }
            } catch (error) {
                console.error('Erro ao buscar teachers:', error)
            }
        }
        fetchTeachersData()
    }, [])

    // Busca os dados de Disciplinas
    useEffect(() => {
        const fetchDisciplinesData = async () => {
            try {
                console.log('Chamando getDisciplines...')
                const response = await getDisciplines()
                console.log('Disciplines response:', response)
                if (Array.isArray(response)) {
                    setDisciplinesList(response)
                } else if (response.disciplines && Array.isArray(response.disciplines)) {
                    setDisciplinesList(response.disciplines)
                } else {
                    setDisciplinesList([])
                }
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error)
            }
        }
        fetchDisciplinesData()
    }, [])

    useEffect(() => {
        if (courseFetched) {
            console.log('Convertendo IDs para nomes com base nas listas carregadas.')

            const coordinatorsStr = courseFetched.coordinators.length > 0
                ? courseFetched.coordinators.map((c: any) => {
                    const found = coordinatorList.find(item => item.id === c.id)
                    return found ? found.name : ''
                }).filter((name: string) => name !== '').join(', ')
                : ''

            const teachersStr = courseFetched.teachers.length > 0
                ? courseFetched.teachers.map((t: any) => {
                    const found = teachersList.find(item => item.id === t.id)
                    return found ? found.name : ''
                }).filter((name: string) => name !== '').join(', ')
                : ''

            const disciplinesStr = courseFetched.disciplines.length > 0
                ? courseFetched.disciplines.map((d: any) => {
                    const found = disciplinesList.find(item => item.id === d.id)
                    return found ? found.name : ''
                }).filter((name: string) => name !== '').join(', ')
                : ''

            setFormData(prev => ({
                ...prev,
                coordinators: coordinatorsStr,
                teachers: teachersStr,
                disciplines: disciplinesStr,
            }))

            console.log('Formulário atualizado com nomes:', {
                name: courseFetched.name,
                coordinators: coordinatorsStr,
                teachers: teachersStr,
                disciplines: disciplinesStr,
            })
        }
    }, [courseFetched, coordinatorList, teachersList, disciplinesList])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const coordinatorsArray = formData.coordinators
            .split(',')
            .map(name => name.trim())
            .filter(name => name !== '')
            .map(name => {
                const found = coordinatorList.find(c => c.name.toLowerCase() === name.toLowerCase())
                if (found) {
                    return { id: found.id }
                } else {
                    console.warn(`Coordenador com nome "${name}" não encontrado.`)
                    return null
                }
            })
            .filter(coordinator => coordinator !== null)

        const teachersArray = formData.teachers
            .split(',')
            .map(name => name.trim())
            .filter(name => name !== '')
            .map(name => {
                const found = teachersList.find(t => t.name.toLowerCase() === name.toLowerCase())
                if (found) {
                    return { id: found.id }
                } else {
                    console.warn(`Professor com nome "${name}" não encontrado.`)
                    return null
                }
            })
            .filter(teacher => teacher !== null)

        const disciplinesArray = formData.disciplines
            .split(',')
            .map(name => name.trim())
            .filter(name => name !== '')
            .map(name => {
                const found = disciplinesList.find(d => d.name.toLowerCase() === name.toLowerCase())
                if (found) {
                    return { id: found.id }
                } else {
                    console.warn(`Disciplina com nome "${name}" não encontrada.`)
                    return null
                }
            })
            .filter(discipline => discipline !== null)

        const payload = {
            name: formData.name,
            coordinators: coordinatorsArray,
            teachers: teachersArray,
            disciplines: disciplinesArray,
        }

        console.log('Payload a ser enviado:', payload)

        try {
            if (id) {
                console.log('Atualizando curso com id:', id)
                const response = await api.put(`/v1/courses/${id}`, payload)
                console.log('Curso atualizado com sucesso:', response.data)
            } else {
                console.log('Cadastrando novo curso com os dados:', payload)
                const response = await api.post('/v1/courses', payload)
                console.log('Curso cadastrado com sucesso:', response.data)
            }
            clearCache();
            navigate('/registrations')
        } catch (error) {
            console.error('Erro ao criar/atualizar curso:', error)
        }
    }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <div className="register-course-container">
                    <h1 className="register-course-title">
                        {id ? 'Editar Curso' : 'Cadastro de Curso'}
                    </h1>
                    <form className="register-course-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Nome:</label>
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Coordenadores (Nomes separados por vírgula):</label>
                            <input
                                className="form-input"
                                type="text"
                                name="coordinators"
                                list="coordinators-list"
                                placeholder='Digite o nome do coordenador ou selecione na lista'
                                value={formData.coordinators}
                                onChange={handleChange}
                            />
                            <datalist id="coordinators-list">
                                {coordinatorList.map(coordinato => (
                                    <option key={coordinato.id} value={coordinato.name}>
                                        {coordinato.name}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Professores (Nomes separados por vírgula):</label>
                            <input
                                className="form-input"
                                type="text"
                                name="teachers"
                                list="teachers-list"
                                value={formData.teachers}
                                onChange={handleChange}
                            />
                            <datalist id="teachers-list">
                                {teachersList.map(teacher => (
                                    <option key={teacher.id} value={teacher.name}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Disciplinas (Nomes separados por vírgula):</label>
                            <input
                                className="form-input"
                                type="text"
                                name="disciplines"
                                list="disciplines-list"
                                value={formData.disciplines}
                                onChange={handleChange}
                            />
                            <datalist id="disciplines-list">
                                {disciplinesList.map(discipline => (
                                    <option key={discipline.id} value={discipline.name}>
                                        {discipline.name}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <button className="form-submit-button" type="submit">
                            {id ? 'Atualizar Curso' : 'Cadastrar Curso'}
                        </button>
                        <button className="form-submit-button" onClick={() => navigate('/registrations')}>
                            Voltar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterCourse
