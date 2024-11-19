import properties from '@/properties.json'

export const GET = async () => {
  try {
    return new Response(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    return new Response('Something went wrong', {
      status: 500,
    })
  }
}

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData()

    const amenities = formData.getAll('amenities')
    const images = formData
      .getAll('images')
      .filter((image: any) => image.name !== '')

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      images,
    }
    console.log(propertyData)
    return new Response(JSON.stringify({ message: 'Succsee' }), { status: 200 })
  } catch (error) {
    return new Response('Failed to add property', { status: 500 })
  }
}