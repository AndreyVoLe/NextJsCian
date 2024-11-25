import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

export default function PropertyImages({ images }: { images: string[] }) {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              thumbnail={images[0]}
              width="1000"
              height="600"
              original={images[0]}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  priority
                  alt=""
                  className="object-cover mx-auto h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  sizes="100vw"
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    image.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  }`}
                >
                  <Item
                    thumbnail={image}
                    width="1000"
                    height="600"
                    original={image}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        priority
                        alt=""
                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer "
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  )
}
