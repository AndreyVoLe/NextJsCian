import { FaExclamationTriangle } from 'react-icons/fa'
import { toast } from 'react-toastify'

export const FormError = ({ error }: { error: string | undefined }) => {
  if (!error) return null

  return toast.error(error)
}
