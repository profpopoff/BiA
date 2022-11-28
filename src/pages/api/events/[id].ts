import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const {
      query: { id },
      method,
   } = req

   await dbConnect()

   switch (method) {
      case 'GET' /* Get a model by its ID */:
         try {
            const event = await Event.findById(id)
            if (!event) {
               return res.status(400).json({ success: false, message: 'Wrong id.' })
            }
            res.status(200).json({ success: true, data: event })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break

      case 'PUT' /* Edit a model by its ID */:
         try {
            const event = await Event.findByIdAndUpdate(id, req.body, {
               new: true,
               runValidators: true,
            })
            if (!event) {
               return res.status(400).json({ success: false, message: 'Wrong id.' })
            }
            res.status(200).json({ success: true, data: event })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break

      case 'DELETE' /* Delete a model by its ID */:
         try {
            const deletedEvent = await Event.findByIdAndDelete(id)
            if (!deletedEvent) {
               return res.status(400).json({ success: false, message: 'Wrong id.' })
            }
            res.status(200).json({ success: true, message: 'Event deleted successfully.' })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break

      default:
         res.status(400).json({ success: false, message: 'Wrong method' })
         break
   }
}