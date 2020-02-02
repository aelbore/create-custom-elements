import * as express from 'express'
import { getProfiles } from './profiles'

export function profileRoute() {
  const router = express.Router()
  router.get('/', (req: express.Request, res: express.Response) => {
    return res.status(200).json(getProfiles());
  })
  return router
}