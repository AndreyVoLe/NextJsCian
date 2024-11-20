import { NextPage } from 'next'
import Image from 'next/image'

interface Props {
  image: string
}

const PropertyHeaderImage: NextPage<Props> = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            priority
            src={image}
            alt="Нет изображения"
            className="h-[400px] w-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImage
