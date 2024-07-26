export default interface IUserInterface {
    id: number | null | undefined
    name: string | null | undefined
    birth: Date | null | undefined
    password: string | undefined
    email: string | null | undefined
    urlImage: string | null | undefined
    gender: string | null | undefined
    cpf: string | null | undefined
    street: string | null | undefined
    number: number | null | undefined
    zipCode: string | null | undefined
    location: Location | null | undefined
    userRole: UserRole  | null | undefined 
    phoneNumber: string | null | undefined
    instagram: string | null | undefined
    facebook: string | null | undefined
    whatsapp: string | null | undefined
    expirationLicence: string | null | undefined
    isCompleteProfile: boolean | null | undefined
    district: string | null | undefined
    idUserRole?: number
  }
  
  export interface Location {
    city: City
    state: State
  }
  
  export interface City {
    id: number
    name: string
  }
  
  export interface State {
    id: number
    name: string
    country: any
    uf: string
  }
  
  export interface UserRole {
    id: number
    name: string
  }
  