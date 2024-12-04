"use clinet"
import { Button } from "@/ui/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export function Pagination({
    hasNextPage,
    hasPrevNext,
    pageUrl
}){
    const Router = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname()

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '4'

    return(
        <div>
            <Button onClick={()=>{
                Router.push(`${path}/?page=${Number(page) - 1}&per_page=${per_page}`)
            }}
            disabled={!hasPrevNext}><FaArrowLeft/></Button>
            <span className="btn">{page}</span>
            <Button onClick={()=>{
                Router.push(`${path}/?page=${Number(page) + 1}&per_page=${per_page}`)
            }}
            disabled={!hasNextPage}><FaArrowRight/></Button>
        </div>
    )
}