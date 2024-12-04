'use client'

import React, { useState, useMemo } from 'react'
import { Input } from "@/ui/Inputs"
import { Button } from "@/ui/Button"
import { RiArrowUpDownLine } from "react-icons/ri"

// Utility function to combine class names
function cn(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export { cn };

// Table Component and Subcomponents

// Table Component
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("table-container", className)} ref={ref} {...props} />
))
Table.displayName = "Table"

// Table Header Component
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("table-header", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

// Table Body Component
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("table-body", className)} {...props} />
))
TableBody.displayName = "TableBody"

// Table Footer Component
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("table-footer", className)} {...props} />
))
TableFooter.displayName = "TableFooter"

// Table Row Component
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("table-row", className)} {...props} />
))
TableRow.displayName = "TableRow"

// Table Head Component (for each header cell)
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("table-head", className)} {...props} />
))
TableHead.displayName = "TableHead"

// Table Cell Component
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("table-cell", className)} {...props} />
))
TableCell.displayName = "TableCell"

// Table Caption Component
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("table-caption", className)} {...props} />
))
TableCaption.displayName = "TableCaption"

// Tables Component (Handles data, sorting, filtering, and pagination)
const Tables = ({ data, columns, itemsPerPage = 5 }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = useMemo(() => {
    let sortableItems = [...data]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig])

  const filteredData = useMemo(() => {
    return sortedData.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [sortedData, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage, itemsPerPage])

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div>
      {/* Search input */}
      <div className="search-input-container">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Table component */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>
                <Button
                  variant="ghost"
                  onClick={() => requestSort(column.key)}
                  className="sort-button"
                >
                  {column.label}
                  <RiArrowUpDownLine />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{item[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="pagination d-flex">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <div className="page-info">
          {currentPage}/{totalPages}
        </div>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Tables
}
