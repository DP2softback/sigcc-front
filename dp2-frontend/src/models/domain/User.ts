export interface RegisterUpdateUser {
  _id?: number // always include id
  dni?: string
  companyName?: string
  tradeName?: string
  address?: string
  postalCode?: string
  country?: string
  province?: string
  city?: string
  fullName?: string
  phone?: string
  email?: string
}

export interface ListUser {
  id?: number
  nif?: string
  companyName?: string
  tradeName?: string
  phone?: string
  email?: string
}