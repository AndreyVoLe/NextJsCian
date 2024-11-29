import { NextResponse } from 'next/server'
import cloudinary from '@/config/cloudinary'
import { prisma } from '@/prisma'

export async function POST(req: Request) {
  const { image, userId } = await req.json()

  try {
    const result = await cloudinary.uploader.upload(image, { folder: 'cian' })

    await prisma.user.update({
      where: { id: userId },
      data: { image: result.secure_url },
    })

    return NextResponse.json({ message: 'Фото успешно загружено' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Ошибка при загрузке изображения.' },
      { status: 500 }
    )
  }
}
