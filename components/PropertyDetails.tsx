import { Property } from '@/utils/types/PropertyType'
import { NextPage } from 'next'
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa'

interface Props {
  property: Property
}

const PropertyDetails: NextPage<Props> = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {property.location?.street}, {property.location?.city},{' '}
            {property.location?.state}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Цена за проживание
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">За ночь</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates?.nightly ? (
                `₽${property.rates?.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">За неделю</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates?.weekly ? (
                `₽${property.rates?.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">В месяц</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates?.monthly ? (
                `₽${property.rates?.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Описание & Детали</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <div>
            <FaBed className="inline-block mr-2" />
            {property.beds}{' '}
            <span className="hidden sm:inline">
              {property.beds === 1 && 'кровать'}
              {property.beds > 1 && property.beds <= 5 && 'кровати'}
              {property.beds > 5 && 'кроватей'}
            </span>
          </div>
          <div>
            <FaBath className="inline-block mr-2" /> {property.baths}{' '}
            <span className="hidden sm:inline">
              {property.baths === 1 && 'ванная'}{' '}
              {property.baths > 1 && 'ванных'}
            </span>
          </div>
          <div>
            <FaRulerCombined className="inline-block mr-2" />
            {property.squareFeet} <span className="hidden sm:inline">м²</span>
          </div>
        </div>
        <p className="text-gray-500 mb-4 text-center">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Удобства</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property?.amenities?.map((amen, index) => (
            <li key={index}>
              <FaCheck className="text-green-600 mr-2 mt-3 inline-block mb-3" />{' '}
              {amen}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6 text-center">
          Контактные данные о владельце
        </h3>
        <div className="flex flex-col md:items-center md:justify-evenly md:flex-row">
          <div>
            <strong>Имя:</strong> {property.sellerInfo?.name}
          </div>

          <div>
            <strong>Почта:</strong> {property.sellerInfo?.email}
          </div>
          <div>
            <strong>Телефон:</strong> {property.sellerInfo?.phone}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PropertyDetails
