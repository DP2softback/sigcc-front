export interface IRegisterUpdateUserDto { // Backend Dto or Bean
  _id?: number // always include id
  dni?: string
  company_name?: string
  tradeName?: string
  address?: string
  postalCode?: string
  country?: string
  province?: string
  city?: string
  names?: string
  lastNames?: string
  phone?: string
  email?: string
}

interface Pet {
  id?: number
  alias?: string
  color?: string
}

export interface IGetUserDto { // Backend Dto or Bean
  _id?: number // always include id
  dni?: string
  company_name?: string
  tradeName?: string
  address?: string
  postalCode?: string
  country?: string
  province?: string
  city?: string
  names?: string
  lastNames?: string
  phone?: string
  email?: string
  pets?: Pet[]
}