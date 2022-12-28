import mongoose from "mongoose"

interface IEvent {
   title: string
   link: string
   type: string
   artist?: {
      name: string
      image?: string
      info?: string
   }
   dates: {
      start: Date
      end?: Date
   }
   ageRestriction: number
   place: {
      floor: number
      wing?: string
   }
   description: {
      main: string
      additional: {
         title?: string
         text: string
      }
   }
   images: {
      cover: string
      info: string
      thesis: {
         image: string
         text: string
      }
      gallery?: string[]
   }
}

const EventScheme = new mongoose.Schema<IEvent>(
   {
      title: {
         type: String,
         required: [true, 'Название события не указано.'],
         maxlength: [60, 'Название события не должно быть больше 60 символов.'],
      },
      link: {
         type: String,
         unique: true,
         required: [true, 'Название ссылки не указано.'],
         maxlength: [70, 'Название ссылки не должно быть больше 70 символов.'],
      },
      type: {
         type: String,
         enum: {
            values: ['painting', 'photo', 'sculpture', 'digital', 'performance'],
            message: 'Zone is either painting, photo, sculpture, digital or performance.'
         },
         default: 'exhibition',
      },
      artist: {
         name: {
            type: String,
            maxlength: [60, 'Имя автора не должно быть больше 60 символов.'],
         },
         image: String,
         info: {
            type: String,
            maxlength: [500, 'Информация об автора не должно быть больше 500 символов.'],
         },
      },
      dates: {
         start: { type: Date, required: [true, 'Дата начала события не указана.'] },
         end: Date,
      },
      ageRestriction: {
         type: Number,
         required: [true, 'Возростоное ограничение не указано.'],
      },
      place: {
         floor: { type: Number, required: [true, 'Этаж не указано.'], },
         wing: {
            type: String,
            enum: {
               values: ['museum', 'exhibition', 'stage'],
               message: 'Zone is either museum, exhibition or stage.'
            },
         },
      },
      description: {
         main: {
            type: String,
            required: [true, 'Оснонвое описание события не указано.'],
            maxlength: [500, 'Оснонвое описание события не должно быть больше 500 символов.'],
         },
         additional: {
            title: {
               type: String,
               maxlength: [100, 'Заголовок дополнителього описания события не должно быть больше 300 символов.'],
            },
            text: {
               type: String,
               required: [true, 'Дополнительое описание события не указано.'],
               maxlength: [300, 'Дополнительое описание события не должно быть больше 300 символов.'],
            },
         },
      },
      images: {
         cover: {
            type: String,
            required: [true, 'Обложка события не указана.'],
         },
         info: {
            type: String,
            required: [true, 'Изображение информации не указано.'],
         },
         thesis: {
            image: {
               type: String,
               required: [true, 'Изображение тезиса не указано.'],
            },
            text: {
               type: String,
               required: [true, 'Текст тезиса не указан.'],
               maxlength: [150, 'Текст тезиса не должнен быть больше 150 символов.'],
            },
         },
         gallery: [String]
      },
   },
   { timestamps: true }
)

export default mongoose.models.Event || mongoose.model('Event', EventScheme)