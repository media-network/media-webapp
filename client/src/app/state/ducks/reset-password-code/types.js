import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('resetPasswordCode')

export const FETCH_EMAIL = prefix('FETCH_EMAIL')
export const FETCH_EMAIL_COMPLETED = prefix('FETCH_EMAIL_COMPLETED')
export const FETCH_EMAIL_FAILED = prefix('FETCH_EMAIL_FAILED')

export const FETCH_PASSWORD_RESET = prefix('FETCH_PASSWORD_RESET')
export const FETCH_PASSWORD_RESET_COMPLETED = prefix('FETCH_PASSWORD_RESET_COMPLETED')
export const FETCH_PASSWORD_RESET_FAILED = prefix('FETCH_PASSWORD_RESET_FAILED')

export const GET_RESET_CODE = prefix('GET_RESET_CODE')
export const GET_RESET_CODE_COMPLETED = prefix('GET_RESET_CODE_COMPLETED')
export const GET_RESET_CODE_FAILED = prefix('GET_RESET_CODE_FAILED')
