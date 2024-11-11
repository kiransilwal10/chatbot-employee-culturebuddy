import { useToast } from "../../../hooks/use-toast"
import {
  Toast
} from "react-bootstrap"
import { ToastClose } from "@radix-ui/react-toast"
import { ToastDescription } from "@radix-ui/react-toast"
import { ToastProvider } from "@radix-ui/react-toast"
import { ToastTitle } from "@radix-ui/react-toast"
import { ToastViewport } from "@radix-ui/react-toast"
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
