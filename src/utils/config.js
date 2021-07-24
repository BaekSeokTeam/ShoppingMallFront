import {token} from '../controller/user'

export const header={
    headers: {
        Authorization: `Bearer ${token()}`
      }
}

