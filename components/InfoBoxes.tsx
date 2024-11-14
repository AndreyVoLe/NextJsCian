import { NextPage } from 'next'
import Link from 'next/link'
import Infobox from './Infobox'

interface Props {}

const InfoBoxes: NextPage<Props> = ({}) => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Infobox
            heading="For Renters"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
            textColor=""
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </Infobox>
          <Infobox
            heading="For Property owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
            textColor=""
          >
            List your properties and reach potential tenants. Rent as an Airbnb
            or long term.
          </Infobox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes
