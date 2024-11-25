import { NextPage } from 'next'
import Infobox from './Infobox'

const InfoBoxes: NextPage = ({}) => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Infobox
            heading="Для арендаторов"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: 'Просмотр недвижимости',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
            textColor=""
          >
            Найдите недвижимость своей мечты. Добавьте в закладки и свяжитесь с
            владельцем.
          </Infobox>
          <Infobox
            heading="Для владельцов недвижимости"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: 'Добавить недвижимость',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
            textColor=""
          >
            Разместите свою недвижимость и обратитесь к потенциальным
            арендаторам.
          </Infobox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes
