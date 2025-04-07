// src/components/registrations/Dashboard.tsx
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { getCourses, getDisciplines, getUsers } from '../../utils/debouncedUpdateTeachers'
import api from '../../utils/API'

interface User {
    id: number
    name: string
    email: string
    category: string
}

interface Discipline {
    id: number
    name: string
    code: string
    coordinator: User
    teachers: User[]
}

interface Course {
    id: number
    name: string
    teachers: User[]
    disciplines: Discipline[]
    coordinators: User[]
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([])
    const [disciplines, setDisciplines] = useState<Discipline[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [activeSection, setActiveSection] = useState<'users' | 'disciplines' | 'courses' | null>('users')

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await getUsers()
                console.log('Users response:', response)
                if (Array.isArray(response)) {
                    setUsers(response)
                } else if (response.users && Array.isArray(response.users)) {
                    setUsers(response.users)
                } else {
                    setUsers([])
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error)
            }
        }
        fetchUsersData()
    }, [])

    useEffect(() => {
        const fetchDisciplinesData = async () => {
            try {
                const response = await getDisciplines()
                console.log('Disciplines response:', response)
                if (Array.isArray(response)) {
                    setDisciplines(response)
                } else if (response.disciplines && Array.isArray(response.disciplines)) {
                    setDisciplines(response.disciplines)
                } else {
                    setDisciplines([])
                }
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error)
            }
        }
        fetchDisciplinesData()
    }, [])

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const response = await getCourses()
                console.log('Courses response:', response)
                if (Array.isArray(response)) {
                    setCourses(response)
                } else if (response.courses && Array.isArray(response.courses)) {
                    setCourses(response.courses)
                } else {
                    setCourses([])
                }
            } catch (error) {
                console.error('Erro ao buscar cursos:', error)
            }
        }
        fetchCoursesData()
    }, [])

    const handleDelete = async (id: number, type: string) => {
        try {
            await api.delete(`/v1/${type}/${id}`);
            if (type === 'users') setUsers(users.filter(user => user.id !== id));
            if (type === 'disciplines') setDisciplines(disciplines.filter(discipline => discipline.id !== id));
            if (type === 'courses') setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error(`Erro ao deletar ${type}:`, error);
        }
    };

    const handleEdit = (id: number, type: string) => {
        try {
            const editPath = `/edit-${type.slice(0, -1)}/${id}`;
            navigate(editPath);
        } catch (error) {
            console.error(`Erro ao redirecionar para edição de ${type}:`, error);
        }
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1 className="dashboard-title">Painel de Cadastro</h1>

                <div className="dashboard-links">
                    <Link to="/register-user" className="dashboard-link">Cadastro de Usuário</Link>
                    <Link to="/register-discipline" className="dashboard-link">Cadastro de Disciplina</Link>
                    <Link to="/register-course" className="dashboard-link">Cadastro de Curso</Link>
                </div>

                <div className="dashboard-buttons">
                    <button onClick={() => setActiveSection('users')}>Usuários</button>
                    <button onClick={() => setActiveSection('disciplines')}>Disciplinas</button>
                    <button onClick={() => setActiveSection('courses')}>Cursos</button>
                </div>
            </header>

            {activeSection === 'users' && (
                <div className="dashboard-section" id="users">
                    <h2>Lista de Usuários</h2>
                    <ul className="dashboard-list">
                        {/* {users.map(user => <li key={user.id}>{user.name} - {user.email} - {user.category}</li>)} */}
                        {users.map(user => (
                            <li key={user.id}>
                                {user.id} - {user.name} - {user.email} - {user.category}
                                <div className='dashboard-buttons'>
                                    <button className='dashboard-button btn-edit' onClick={() => handleEdit(user.id, 'users')}>Editar</button>
                                    <button className='dashboard-button btn-remove' onClick={() => handleDelete(user.id, 'users')}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeSection === 'disciplines' && (
                <div className="dashboard-section" id="disciplines">
                    <h2>Lista de Disciplinas</h2>
                    <ul className="dashboard-list">
                        {/* {disciplines.map(discipline => <li key={discipline.id}>{discipline.name} : ({discipline.code})</li>)} */}
                        {disciplines.map(discipline => (
                            <li key={discipline.id}>
                                {discipline.id} - {discipline.name} - Codigo: ( {discipline.code} ) - Professor: {discipline.teachers.map(teacher => teacher?.name).join(', ')}
                                <div className='dashboard-buttons'>
                                    <button className='dashboard-button btn-edit' onClick={() => handleEdit(discipline.id, 'disciplines')}>Editar</button>
                                    <button className='dashboard-button btn-remove' onClick={() => handleDelete(discipline.id, 'disciplines')}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeSection === 'courses' && (
                <div className="dashboard-section" id="courses">
                    <h2>Lista de Cursos</h2>
                    <ul className="dashboard-list">
                        {/* {courses.map(course => <li key={course.id}>{course.name}</li>)} */}
                        {courses.map(course => (
                            <li key={course.id}>
                                {course.id} - {course.name} - Coordenador: {course.coordinators.map(coordinato => coordinato?.name).join(', ')}
                                <div className='dashboard-buttons'>
                                    <button className='dashboard-button btn-edit' onClick={() => handleEdit(course.id, 'courses')}>Editar</button>
                                    <button className='dashboard-button btn-remove' onClick={() => handleDelete(course.id, 'courses')}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Dashboard
