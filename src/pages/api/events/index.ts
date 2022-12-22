import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { method } = req

   await dbConnect()

   switch (method) {
      case 'GET':
         try {
            const events = await Event.find() /* find all the data in our database */

            const sortedEvents = events
               .filter(event => event.dates.end ?
                  new Date(event.dates.end) > new Date() :
                  new Date(event.dates.start) > new Date())
               .sort((a: any, b: any) =>
                  new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime())

            res.status(200).json({ success: true, data: sortedEvents })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break
      case 'POST':
         try {
            const event = await Event.create(req.body) /* create a new model in the database */
            res.status(201).json({ success: true, data: event })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break
      default:
         res.status(400).json({ success: false, message: 'Wrong method' })
         break
   }
}