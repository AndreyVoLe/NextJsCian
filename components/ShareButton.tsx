import { Property } from '@/utils/types/PropertyType'
import {
  EmailShareButton,
  MailruShareButton,
  TelegramShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  MailruIcon,
  TelegramIcon,
  VKIcon,
  WhatsappIcon,
} from 'react-share'

interface IShareButton {
  propertyId: string
  propertyName: string
}

export default function ShareButton({
  propertyId,
  propertyName,
}: IShareButton) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${propertyId}`
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Поделиться</h3>
      <div className="flex gap-3 justify-center pb-5">
        <EmailShareButton
          url={shareUrl}
          title={propertyName}
          body={`Посмотри-ка на это: ${shareUrl}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>

        <MailruShareButton url={shareUrl} title={propertyName}>
          <MailruIcon size={40} round />
        </MailruShareButton>

        <TelegramShareButton url={shareUrl} title={propertyName}>
          <TelegramIcon size={40} round />
        </TelegramShareButton>

        <VKShareButton url={shareUrl} title={propertyName}>
          <VKIcon size={40} round />
        </VKShareButton>

        <WhatsappShareButton url={shareUrl} title={propertyName}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
    </>
  )
}
