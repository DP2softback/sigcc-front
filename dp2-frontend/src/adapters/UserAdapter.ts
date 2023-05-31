import { RegisterUpdateUser } from "@models/domain/User";
import { IGetUserDto, IRegisterUpdateUserDto } from "@models/interfaces/IUser";
//testing
export const IRegisterUpdateDtoAdapter = 
(user: RegisterUpdateUser) : IRegisterUpdateUserDto => ({
  address: user.address,
  company_name: user.companyName,
  tradeName: user.tradeName,
  postalCode: user.postalCode,
  names: user.fullName.split(' ')[0],
  lastNames: user.fullName.split(' ')[1],
  phone: user.phone,
  email: user.email,
  country: user.country,
  city: user.city,
  province: user.province
});


export const RegisterUpdateAdapter = 
(user: IGetUserDto) : RegisterUpdateUser => ({
  address: user.address,
  companyName: user.company_name,
  tradeName: user.tradeName,
  postalCode: user.postalCode,
  fullName: user.names + user.lastNames,
  phone: user.phone,
  email: user.email,
  country: user.country,
  city: user.city,
  province: user.province
});