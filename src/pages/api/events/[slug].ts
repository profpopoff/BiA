import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const {
      query: { slug },
      method,
   } = req
   await dbConnect()

   switch (method) {
      case 'GET' /* Get a model by its ID */:
         try {
            const event = await Event.findOne({ link: slug })
            res.status(200).json({ success: true, data: event })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break

      case 'PUT' /* Edit a model by its ID */:
         try {
            const event = await Event.findByIdAndUpdate(slug, req.body, {
               new: true,
               runValidators: true,
            })
            res.status(200).json({ success: true, data: event })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break

      case 'DELETE' /* Delete a model by its ID */:
         try {
            const deletedEvent = await Event.findByIdAndDelete(slug)
            res.status(200).json({ success: true, data: deletedEvent })
         } catch (error) {
            res.status(400).json({ success: false, message: error })
         }
         break

      default:
         res.status(400).json({ success: false, message: 'Wrong method' })
         break
   }
}