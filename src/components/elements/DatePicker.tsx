import { FC, useRef, useState } from "react"
import useSubmitGuard from "@/hooks/useSubmitGuard"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"

export interface DatePickerProps {
  label: string
  name: string
  required?: boolean
  onChange?: (date?: Date) => void
}

export const DatePicker: FC<DatePickerProps> = ({
  label,
  name,
  required = false,
  onChange,
}) => {
  const [date, setDate] = useState<Date>()
  const [hasError, setHasError] = useState(false)
  const ref = useRef<HTMLDivElement>(null)


  useSubmitGuard(ref as React.RefObject<HTMLElement>, Boolean(date) || !required, () => setHasError(true))

  const handleSelect = (d: Date | undefined) => {
    setDate(d)
    setHasError(false)     
    onChange?.(d)
  }

  return (
    <div ref={ref} className="flex flex-col w-full">
      <Label htmlFor={name} className={hasError ? "text-red-600 mb-1" : "mb-1"}>
        {label} {required && <span>*</span>}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            aria-invalid={hasError}
            variant="outline"
            className={hasError ? "border-red-600" : ""}
          >
           <CalendarIcon className="mr-2 h-4 w-4" />
           {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>

      {/* Hidden payload for native submissions */}
      <input type="hidden" id={name} name={name} value={date?.toISOString() ?? ""} />
    </div>
  )
}
