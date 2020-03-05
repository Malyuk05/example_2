import {advertise} from './advertise'
import {auth} from './auth'
import {moder} from './moder'

export const localization = {
  ru: {
    ...advertise.ru,
    ...auth.ru,
    ...moder.ru,
  },
  en: {
    ...advertise.en,
    ...auth.en,
    ...moder.en,
  }
}