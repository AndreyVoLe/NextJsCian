import properties from '@/properties.json'
import { NextRequest } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Логируем входные параметры

  try {
    const paramsId = (await params).id
    // Логируем параметры для отладки

    // Ищем свойство по идентификатору
    const property = properties.find(prop => prop._id === paramsId)

    if (!property) {
      return new Response('Property Not Found', { status: 404 })
    } else {
      return new Response(JSON.stringify(property), {
        status: 200,
      })
    }
  } catch (error) {
    // Логируем ошибку
    return new Response('Something went wrong', {
      status: 500,
    })
  }
}
