import { SetMetadata } from '@nestjs/common'
import { PUBLIC_KEY } from 'src/constants/keyDecorator'

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true)
