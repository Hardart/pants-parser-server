import { Response, NextFunction, Request } from 'express'
import { SortOrder } from 'mongoose'
import type { QueryParams, Filter, Sort } from '../types/custom-request'

const BASE_QUERY = {
  limit: 10,
  sort: { createdAt: 'desc' },
  filter: () => [{}],
}

const toNumberKeys = ['page', 'limit'] as const
export const filterKeys = ['tags', 'isPublished', 'categoryId'] as const

export function decodeQuery(req: Request, _: Response, next: NextFunction) {
  const query = req.query
  const entries = Object.entries(query) as [string, string][]

  const queryBundle = entries.reduce((acc, [key, value]) => {
    if (!acc.filter && !Array.isArray(acc.filter)) acc.filter = BASE_QUERY.filter()
    toNumberKeys.forEach(setNumberedKeys)
    filterKeys.forEach(setFilterQuery)
    setSortQuery()

    function setNumberedKeys(item: (typeof toNumberKeys)[number]) {
      if (item === key) acc[key] = Math.abs(parseInt(value))
    }

    function setFilterQuery(item: Filter) {
      if (item !== key) return
      acc.filter.push({ [key]: value })
    }

    function setSortQuery() {
      if (key === 'sort') {
        const [sortKey, sortValue] = value.split('_') as [Sort, SortOrder]
        acc.sort = { [sortKey]: isSortOrder(sortValue) ? sortValue : 'desc' }
      }
    }

    return acc
  }, {} as QueryParams)

  queryBundle.page = !queryBundle.page || isNaN(queryBundle.page) ? 0 : queryBundle.page - 1
  if (!queryBundle.filter) queryBundle.filter = BASE_QUERY.filter()
  if (!queryBundle.limit || isNaN(queryBundle.limit)) queryBundle.limit = BASE_QUERY.limit
  if (!queryBundle.sort) queryBundle.sort = BASE_QUERY.sort
  req.body.queryParams = queryBundle
  next()
}

function isSortOrder(value: any): value is SortOrder {
  return value == 'desc' || value == 'asc'
}
