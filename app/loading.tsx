import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative animate-pulse">
          <Image
            src="/images/tc-car-sales-removebg-preview.png"
            alt="TC Car Sales"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
