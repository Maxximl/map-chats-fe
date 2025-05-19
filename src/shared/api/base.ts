import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const API_URL = 'https://83.217.221.163'

class ApiInstance {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Добавляем перехватчик ошибок
    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Обработка HTTP ошибок
          console.error(
            `API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
            error.response.status,
            error.response.data
          )
        } else if (error.request) {
          // Запрос был сделан, но ответ не получен
          console.error('API Error: No response received', error.request)
        } else {
          // Ошибка при настройке запроса
          console.error('API Error:', error.message)
        }
        return Promise.reject(error)
      }
    )
  }

  // GET запрос
  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(endpoint, options)
    return response.data
  }

  // POST запрос
  async post<T>(endpoint: string, data?: any, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(endpoint, data, options)
    return response.data
  }

  // PUT запрос
  async put<T>(endpoint: string, data?: any, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.put(endpoint, data, options)
    return response.data
  }

  // PATCH запрос
  async patch<T>(endpoint: string, data?: any, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.patch(endpoint, data, options)
    return response.data
  }

  // DELETE запрос
  async delete<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.delete(endpoint, options)
    return response.data
  }

  // Метод для установки заголовков авторизации
  setAuthToken(token: string): void {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Метод для сброса токена авторизации
  clearAuthToken(): void {
    delete this.axios.defaults.headers.common['Authorization']
  }
}

export const apiInstance = new ApiInstance()
