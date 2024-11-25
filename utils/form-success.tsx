import { FaExclamationTriangle } from 'react-icons/fa'
import { toast } from 'react-toastify'

export const FormSuccess = ({ success }: { success: string | undefined }) => {
  if (!success) return null

  return toast.success(success)
}
