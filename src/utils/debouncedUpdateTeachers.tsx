import api from './API';
import debounce from 'lodash.debounce';

// Cria um cache global para armazenar os resultados das requisições
const cache = new Map<string, any>();

// Função genérica para buscar dados com cache
async function fetchWithCache(url: string): Promise<any> {
    if (cache.has(url)) {
        return cache.get(url);
    }
    const response = await api.get(url);
    cache.set(url, response.data);
    return response.data;
}

export function clearCache() {
    cache.clear();
}

// Funções específicas para os endpoints desejados
export async function getUser(userId: number) {
    const url = `/v1/users/${userId}`;
    return await fetchWithCache(url);
}

export async function getDiscipline(disciplineId: number) {
    const url = `/v1/disciplines/${disciplineId}`
    return await fetchWithCache(url);
}

export async function getCourse(courseId: number) {
    const url = `/v1/courses/${courseId}`
    return await fetchWithCache(url);
}

export async function getTeachers() {
    const url = `/v1/users/teachers`;
    return await fetchWithCache(url);
}

export async function getTeacher(teacherId: number) {
    const url = `/v1/users/teachers/${teacherId}`
    return await fetchWithCache(url);
}

export async function getCoordinator() {
    const url = `/v1/users/coordinator`;
    return await fetchWithCache(url);
}

export async function getUsers() {
    const url = `/v1/users`
    return await fetchWithCache(url);
}

export async function getDisciplines() {
    const url = `/v1/disciplines`;
    return await fetchWithCache(url);
}

export async function getCourses() {
    const url = `/v1/courses`
    return await fetchWithCache(url);
}

export async function getRequest(requestId: number) {
    const url = `/v1/requests/${requestId}`
    const response = await fetchWithCache(url);
    // Verificar se a resposta contém a propriedade 'request'
    if (response && response.request) {
        return response.request;
    }
    return response;
}

// Função debounced para evitar requisições excessivas
export const debouncedUpdateTeachers = debounce(
    async (updateTeacherList: (data: any[]) => void) => {
        try {
            const data = await getTeachers();
            // Atualiza a lista de professores (supondo que a resposta contenha a propriedade "teachers")
            updateTeacherList(data.teachers);
        } catch (error) {
            console.error('Erro ao atualizar a lista de professores:', error);
        }
    },
    500 // 500ms de debounce
);

