// src/components/registrations/RegisterDiscipline.tsx
import React, { useEffect, useState } from 'react'
import './RegisterDiscipline.css'

import api from '../../utils/API'
import Sidebar from '../home/sidebar/Siderbar'
import Header from '../home/header/Header'
import { clearCache, getCoordinator, getCourses, getDiscipline, getTeachers } from '../../utils/debouncedUpdateTeachers'
import { useNavigate, useParams } from 'react-router-dom'

interface Course {
    id: number
    name: string
}

interface User {
    id: number
    name: string
    email: string
}

interface Discipline {
    name: string
    code: string
    workload: number
    courses: Course[]
    teachers: User[]
    coordinators: User[]
}

const RegisterDiscipline: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [coursesList, setCoursesList] = useState<Course[]>([])
    const [teachersList, setTeachersList] = useState<User[]>([])
    const [coordinatorsList, setCoordinatorsList] = useState<User[]>([])

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        workload: 0,
        courses: '',
        teachers: '',
        coordinators: '',
    })

    // Guarda os dados brutos da disciplina (usado para atualizar os relacionamentos sem sobrescrever outros campos)
    const [disciplineFetched, setDisciplineFetched] = useState<any>(null)

    // Primeiro efeito: busca os dados da disciplina se estivermos em modo edição e preenche todos os campos
    useEffect(() => {
        if (id) {
            const fetchDisciplineData = async () => {
                try {
                    console.log(`Modo edição ativado para disciplina com id: ${id}`)
                    const response = await getDiscipline(Number(id))
                    const disciplineData: Discipline = response.discipline ? response.discipline : response
                    console.log('Dados recebidos da disciplina:', disciplineData)
                    setDisciplineFetched(disciplineData)
                    // Preenche todos os campos – para os relacionamentos, converte para string (usando os IDs ou nomes, se disponíveis)
                    setFormData({
                        name: disciplineData.name || '',
                        code: disciplineData.code || '',
                        workload: disciplineData.workload || 0,
                        courses: disciplineData.courses && disciplineData.courses.length > 0
                            ? disciplineData.courses.map((course: Course) => course.name).join(', ')
                            : '',
                        teachers: disciplineData.teachers && disciplineData.teachers.length > 0
                            ? disciplineData.teachers.map((teacher: User) => teacher.name).join(', ')
                            : '',
                        coordinators: disciplineData.coordinators && disciplineData.coordinators.length > 0
                            ? disciplineData.coordinators.map((coord: User) => coord.name).join(', ')
                            : '',
                    })
                    console.log('Formulário pré-preenchido (todos os campos):', {
                        name: disciplineData.name,
                        code: disciplineData.code,
                        workload: disciplineData.workload,
                        courses: disciplineData.courses?.map((course: Course) => course.name).join(', '),
                        teachers: disciplineData.teachers?.map((teacher: User) => teacher.name).join(', '),
                        coordinators: disciplineData.coordinators?.map((coord: User) => coord.name).join(', '),
                    })
                } catch (error) {
                    console.error('Erro ao buscar dados da disciplina:', error)
                }
            }
            fetchDisciplineData()
        } else {
            console.log('Modo cadastro ativado.')
        }
    }, [id])

    // Carrega a lista de cursos
    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                console.log('Chamando getCourses...')
                const response = await getCourses()
                console.log('Courses response:', response)
                if (Array.isArray(response.courses)) {
                    setCoursesList(response.courses)
                } else if (response.courses && Array.isArray(response.courses)) {
                    setCoursesList(response.courses)
                } else {
                    setCoursesList([])
                }
            } catch (error) {
                console.error('Erro ao buscar courses:', error)
            }
        }
        fetchCoursesData()
    }, [])

    // Carrega a lista de professores
    useEffect(() => {
        const fetchTeachersData = async () => {
            try {
                console.log('Chamando getTeachers...')
                const response = await getTeachers()
                console.log('Teachers response:', response)
                if (Array.isArray(response.teachers)) {
                    setTeachersList(response.teachers)
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

    // Carrega a lista de coordenadores
    useEffect(() => {
        const fetchCoordinatorData = async () => {
            try {
                console.log('Chamando getCoordinator...')
                const response = await getCoordinator()
                console.log('Coordinator response:', response)
                if (Array.isArray(response.coordinator)) {
                    setCoordinatorsList(response.coordinator)
                } else if (response.coordinator && Array.isArray(response.coordinator)) {
                    setCoordinatorsList(response.coordinator)
                } else {
                    setCoordinatorsList([])
                }
            } catch (error) {
                console.error('Erro ao buscar coordinator:', error)
            }
        }
        fetchCoordinatorData()
    }, [])

    useEffect(() => {
        if (disciplineFetched) {
            console.log('Atualizando campos de relacionamento com base nas listas carregadas.')

            const coursesStr = disciplineFetched.courses.length > 0
                ? disciplineFetched.courses.map((c: any) => {
                    const found = coursesList.find(item => item.id === c.id)
                    return found ? found.name : ''
                }).filter((name: string) => name !== '').join(', ')
                : ''

            const teachersStr = disciplineFetched.teachers.length > 0
                ? disciplineFetched.teachers.map((t: any) => {
                    const found = teachersList.find(item => item.id === t.id)
                    return found ? found.name : ''
                }).filter((name: string) => name !== '').join(', ')
                : ''

            const coordinatorsStr = disciplineFetched.coordinators.length > 0
                ? disciplineFetched.coordinators.map((c: any) => {
                    const found = coordinatorsList.find(item => item.id === c.id)
                    return found ? found.name : ''
                }).filter((name: string) => name !== '').join(', ')
                : ''

            setFormData(prev => ({
                ...prev,
                courses: coursesStr,
                teachers: teachersStr,
                coordinators: coordinatorsStr,
            }))
            console.log('Campos de relacionamento atualizados:', {
                courses: coursesStr,
                teachers: teachersStr,
                coordinators: coordinatorsStr,
            })
        }
    }, [disciplineFetched, coursesList, teachersList, coordinatorsList])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const convertNamesToIds = (namesStr: string, list: { id: number, name: string }[]) => {
        return namesStr
            .split(',')
            .map(name => name.trim())
            .filter(name => name !== '')
            .map(name => {
                const found = list.find(item => item.name.toLowerCase() === name.toLowerCase())
                if (found) {
                    return { id: found.id }
                } else {
                    console.warn(`Item com nome "${name}" não encontrado.`)
                    return null
                }
            })
            .filter(item => item !== null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Dados antes de enviar:", formData); // 🛠️ Log para depuração

        // Verifique se o formData.code ainda é "ALG101"
        if (!formData.code) {
            console.error("Erro: O código da disciplina está vazio!");
            return;
        }

        const coursesArray = convertNamesToIds(formData.courses, coursesList)
        const teachersArray = convertNamesToIds(formData.teachers, teachersList)
        const coordinatorsArray = convertNamesToIds(formData.coordinators, coordinatorsList)

        const payload = {
            name: formData.name,
            code: formData.code,
            workload: formData.workload,
            courses: coursesArray,
            teachers: teachersArray,
            coordinators: coordinatorsArray,
        };

        console.log('Payload a ser enviado:', payload)

        try {
            if (id) {
                console.log('Atualizando disciplina com id:', id)
                const response = await api.put(`/v1/disciplines/${id}`, payload)
                console.log('Disciplina atualizada com sucesso:', response.data)
            } else {
                console.log('Cadastrando nova disciplina com os dados:', payload)
                const response = await api.post('/v1/disciplines', payload)
                console.log('Disciplina cadastrada com sucesso:', response.data)
            }
            clearCache();
            navigate('/registrations')
        } catch (error) {
            console.error('Erro ao criar/atualizar disciplina:', error)
        }
    }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <div className="register-discipline-container">
                    <h1 className="register-discipline-title">
                        {id ? 'Editar Disciplina' : 'Cadastro de Disciplina'}
                    </h1>
                    <form className="register-discipline-form" onSubmit={handleSubmit}>
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
                            <label className="form-label">Código:</label>
                            <input
                                className="form-input"
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Carga Horária:</label>
                            <input
                                className="form-input"
                                type="number"
                                name="workload"
                                value={formData.workload}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Cursos (Nomes separados por vírgula):</label>
                            <input
                                className="form-input"
                                type="text"
                                name="courses"
                                list="courses-list"
                                placeholder="Digite o nome do curso ou selecione na lista"
                                value={formData.courses}
                                onChange={handleChange}
                            />
                            <datalist id="courses-list">
                                {coursesList.map(course => (
                                    <option key={course.id} value={course.name}>
                                        {course.name}
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
                                placeholder="Digite o nome do professor ou selecione na lista"
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
                            <label className="form-label">Coordenadores (Nomes separados por vírgula):</label>
                            <input
                                className="form-input"
                                type="text"
                                name="coordinators"
                                list="coordinators-list"
                                placeholder="Digite o nome do coordenador ou selecione na lista"
                                value={formData.coordinators}
                                onChange={handleChange}
                            />
                            <datalist id="coordinators-list">
                                {coordinatorsList.map(item => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <button className="form-submit-button" type="submit">
                            {id ? 'Atualizar Disciplina' : 'Cadastrar Disciplina'}
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

export default RegisterDiscipline
