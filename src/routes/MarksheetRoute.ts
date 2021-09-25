import { getStudentMarksheet, submitMarksheet } from './../controllers/MarksheetController';
import {Router} from 'express'

const router = Router()

router.route('/')   /// puth auth
    .get(getStudentMarksheet)
    .post(submitMarksheet)

export = router
