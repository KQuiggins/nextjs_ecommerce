'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { formUrlQuery } from "@/lib/utils"

type PaginationPageProps = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
}

const PaginationPage = ({ page, totalPages, urlParamName }: PaginationPageProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClick = (btnType: string) => {
        const pageValue = btnType === "prev" ? Number(page) - 1 : Number(page) + 1
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || "page",
            value: pageValue.toString(),
        })
        router.push(newUrl)
    }

  return (
    <div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Button
                disabled={Number(page) === 1}
                variant="outline"
                onClick={() => handleClick("prev")}
            >
                Previous
            </Button>
            <span className="text-sm font-medium">
                Page {page} of {totalPages}
            </span>
            <Button
                disabled={Number(page) >= totalPages}
                variant="outline"
                onClick={() => handleClick("next")}
            >
                Next
            </Button>
            </div>
        </div>
    </div>
  )
}

export default PaginationPage