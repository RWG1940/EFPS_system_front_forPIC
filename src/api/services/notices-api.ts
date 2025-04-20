import apiClient from '../index'
import { createCRUDService } from '../utils/createCRUDService'

export const noticesApi = createCRUDService('/notices');
