// src/components/registrations/RegisterUser.tsx
import React, { useEffect, useState } from 'react'
import './RegisterUser.css'

import api from '../../utils/API'
import Sidebar from '../home/sidebar/Siderbar'
import Header from '../home/header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { clearCache, getUser } from '../../utils/debouncedUpdateTeachers'

interface User {
    name: string
    email: string
    password: string
    registration: string
    category: string
    photoUrl: string
    academicBackground: string
}

const RegisterUser: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: '',
        registration: '',
        category: '',
        photoUrl: '',
        academicBackground: ''
    })

    // Se houver um id, estamos em modo de edição. Buscar dados do usuário e pré-preencher o formulário.
    useEffect(() => {
        console.log('Componente RegisterUser montado.')
        if (id) {
            console.log(`Modo edição ativado para o usuário com id: ${id}`)
            const fetchUserData = async () => {
                try {
                    console.log(`Chamando getUser(${id})...`)
                    const data = await getUser(Number(id))
                    console.log('Dados recebidos do usuário:', data)
                    // Se os dados estiverem encapsulados em "user", extraímos o objeto correto:
                    const userData = data.user ? data.user : data
                    setFormData({
                        name: userData.name ?? '',
                        email: userData.email ?? '',
                        password: userData.password ?? '', // Por segurança, não pré-preenche a senha
                        registration: userData.registration ?? '',
                        category: userData.category ?? '',
                        photoUrl: userData.photoUrl ?? '',
                        academicBackground: userData.academicBackground ?? '' // Garantir que seja string
                    })
                    console.log('Formulário pré-preenchido:', {
                        name: userData.name,
                        email: userData.email,
                        registration: userData.registration,
                        category: userData.category,
                        photoUrl: userData.photoUrl,
                        academicBackground: userData.academicBackground
                    })
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error)
                }
            }
            fetchUserData()
        } else {
            console.log('Modo cadastro ativado.')
        }
    }, [id])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log('Dados do formulário antes do submit:', formData)

        try {
            if (id) {
                console.log('Atualizando usuário com id:', id)
                const response = await api.put(`/v1/users/${id}`, formData)
                console.log('Usuário atualizado com sucesso:', response.data)
            } else {
                console.log('Cadastrando novo usuário com os dados:', formData)
                const response = await api.post('/v1/auths/register', formData)
                console.log('Usuário cadastrado com sucesso:', response.data)
            }
            clearCache();
            navigate('/registrations')
        } catch (error) {
            console.error('Erro ao enviar os dados do usuário:', error)
        }
    }

    return (
        <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
            <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="container-main">
                <Header />
                <div className="register-user-container">
                    <h1 className="register-user-title">
                        {id ? 'Editar Usuário' : 'Cadastro de Usuário'}
                    </h1>
                    <form className="register-user-form" onSubmit={handleSubmit}>
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
                            <label className="form-label">E-mail:</label>
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Senha:</label>
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Matrícula:</label>
                            <input
                                className="form-input"
                                type="text"
                                name="registration"
                                value={formData.registration}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Categoria:</label>
                            <select
                                className="form-select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Teacher">Professor</option>
                                <option value="Coordinator">Coordenador</option>
                                <option value="Director">Diretor</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">URL da Foto:</label>
                            <input
                                className="form-input"
                                type="text"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleChange}
                            />
                        </div>
                        {formData.category === 'Teacher' && (
                            <div className="form-group">
                                <label className="form-label">Formação Acadêmica:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="academicBackground"
                                    value={formData.academicBackground}
                                    onChange={handleChange}
                                    required={formData.category === 'Teacher'}
                                />
                            </div>
                        )}

                        <button className="form-submit-button" type="submit">
                            {id ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
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

export default RegisterUser
