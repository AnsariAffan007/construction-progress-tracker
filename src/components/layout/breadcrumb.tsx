import { BreadcrumbList, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb"


const AppBreadcrumb = () => {

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          {'›'}
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Y by Sayba</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          {'›'}
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">WORK-ORDER-Y-0016</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          {'›'}
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Updates</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default AppBreadcrumb