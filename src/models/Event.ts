import mongoose from "mongoose"

interface IEvent {
   title: string
   artist?: string
   artistImage?: string
   artistInfo?: string
   dates: {
      start: Date,
      end: Date,
   }
   ageRestriction: number
   place: {
      floor: number
      zone: string // Выставочное крыло, музейное крыло или сцена 
   }
   description: string
   images: string[]
   theses?: string[]
   video?: string
}

const EventScheme = new mongoose.Schema<IEvent>(
   {
      title: {
         type: String,
         required: [true, 'Название события не указано.'],
         maxlength: [60, 'Название события не должно быть больше 60 символов.'],
      },
      artist: {
         type: String,
         maxlength: [60, 'Имя автора не должно быть больше 60 символов.'],
      },
      artistImage: String,
      artistInfo: String,
      dates: {
         start: { type: Date, required: [true, 'Дата начала события не указана.'] },
         end: { type: Date, required: [true, 'Дата конца события не указана.'] },
      },
      ageRestriction: {
         type: Number,
         required: [true, 'Возростоное ограничение не указано.'],
      },
      place: {
         floor: { type: Number, required: [true, 'Этаж не указано.'], },
         zone: {
            type: String,
            enum: {
               values: ['museum', 'exposition', 'stage'],
               message: 'Zone is either museum, exposition or stage.'
            },
            default: 'exposition',
         },
      },
      description: {
         type: String,
         required: [true, 'Описание события не указано.'],
      },
      images: [{
         type: String,
         required: [true, 'Добавьте хотя бы одно изображение.'],
      }],
      theses: [String],
      video: String,
   },
   { timestamps: true }
)

export default mongoose.models.Event || mongoose.model('Event', EventScheme)