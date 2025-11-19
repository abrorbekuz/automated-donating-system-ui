import { ProductTagType, ProductType } from 'src/types/productType'

const getTag = (product: ProductType) => {
  return product.tag
}

function regroupProductsByTag(products: ProductType[], getTag: (product: ProductType) => string): ProductTagType[] {
  const grouped: Record<string, ProductType[]> = {}

  // Group products by tag
  products.forEach((product) => {
    const tag = getTag(product)

    if (!grouped[tag]) {
      grouped[tag] = []
    }

    grouped[tag].push(product)
  })

  // Convert the grouped object into an array of ProductTagType
  return Object.keys(grouped).map((tag) => ({
    tag,
    items: grouped[tag],
  }))
}

function stringifyUrlParam(data: Record<string, string>): string {
  return Object.entries(data)
    .map((e) => e.join('='))
    .join('&')
}

export default regroupProductsByTag
export { getTag, stringifyUrlParam }
