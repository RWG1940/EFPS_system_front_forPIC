import apiClient from '../index'
import { createCRUDService } from '../utils/createCRUDService'

export const foundMeApi = createCRUDService('/foundMe');