import {
  AllHTMLAttributes,
  useRef,
  useState,
  useEffect,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react"
import classNames from "classnames"

interface InputProps {
  label: ReactNode
  labelProps?: AllHTMLAttributes<HTMLDivElement>
  inputProps?: AllHTMLAttributes<HTMLInputElement>
  validationMessage?: {
    invalid: string
    valid: string
  }
  icon?: ReactElement
  layout?: "icon-left" | "icon-right"
}
export const Input: FunctionComponent<InputProps> = ({
  inputProps = {},
  validationMessage,
  icon,
  layout,
  label,
  labelProps = {},
}) => {
  const { className: inputClassName, ...restInputProps } = inputProps
  const { className: labelClassName, ...restLabelProps } = labelProps
  const inputRef = useRef<HTMLInputElement>(null)
  const initialValue = useRef(
    restInputProps.value || restInputProps.defaultValue
  )
  const [isInvalid, setIsInvalid] = useState(false)
  const [shouldShowValidationMessage, setShouldShowValidationMessage] =
    useState(false)

  useEffect(() => {
    if (validationMessage?.valid) {
      const isValid = inputRef.current?.validity.valid || false

      setShouldShowValidationMessage(isValid)
      setIsInvalid(!isValid)
    }
  }, [])
  return (
    <>
      <label className="w-full">
        <div
          className={classNames(
            "typography-descriptions text-brand-dark-gray mb-2",
            labelClassName
          )}
          {...restLabelProps}
        >
          {label}
        </div>

        <div className="relative">
          {icon && (
            <span
              className={classNames(
                "absolute top-0 bottom-0 flex items-center justify-center pointer-events-none max-w-7",
                {
                  "left-3": layout !== "icon-right",
                  "right-3": layout === "icon-right",
                }
              )}
              aria-hidden
            >
              {icon}
            </span>
          )}

          <input
            ref={inputRef}
            className={classNames(
              "p-3 h-12 border border-light-gray-hover w-full rounded-sm bg-light-gray transition-colors duration-150 hover:border-gray focus:border-dark-gray placeholder-brand-gray text-off-black read-only:text-gray",
              inputClassName,
              shouldShowValidationMessage &&
                "invalid:border-brand-red invalid:hover:border-red-hover invalid:focus:border-brand-red",
              {
                "pl-8": icon && layout !== "icon-right",
                "pr-8": icon && layout === "icon-right",
              }
            )}
            {...restInputProps}
            onBlur={(event) => {
              setShouldShowValidationMessage(true)
              setIsInvalid(!event.currentTarget.validity.valid)

              inputProps.onBlur && inputProps.onBlur(event)
            }}
            onChange={(event) => {
              if (inputProps.readOnly) return

              const { valid: isValid } = event.currentTarget.validity

              if (!shouldShowValidationMessage) {
                setShouldShowValidationMessage(
                  (validationMessage?.valid && isValid) ||
                    (initialValue.current !== undefined &&
                      initialValue.current !== "")
                )
              }

              setIsInvalid(!isValid)

              inputProps.onChange && inputProps.onChange(event)
            }}
            onInvalid={(event) => {
              event.preventDefault()

              setShouldShowValidationMessage(true)
              setIsInvalid(true)

              inputProps.onInvalid && inputProps.onInvalid(event)
            }}
          />
        </div>
      </label>
    </>
  )
}
