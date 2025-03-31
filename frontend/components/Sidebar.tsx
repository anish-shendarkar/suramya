"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Search } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Sample data for clothing categories and counts
const categories = [
  {
    name: "Tuxedo",
    count: 42,
    subcategories: [
      { name: "Classic", count: 18 },
      { name: "Modern", count: 14 },
      { name: "Slim Fit", count: 10 },
    ],
  },
  {
    name: "Sherwani",
    count: 36,
    subcategories: [
      { name: "Traditional", count: 15 },
      { name: "Contemporary", count: 12 },
      { name: "Wedding", count: 9 },
    ],
  },
  {
    name: "Suits",
    count: 58,
    subcategories: [
      { name: "Business", count: 22 },
      { name: "Casual", count: 18 },
      { name: "Three-Piece", count: 12 },
      { name: "Double-Breasted", count: 6 },
    ],
  },
  {
    name: "Blazers",
    count: 29,
    subcategories: [
      { name: "Sport", count: 14 },
      { name: "Formal", count: 15 },
    ],
  },
  {
    name: "Accessories",
    count: 64,
    subcategories: [
      { name: "Ties", count: 24 },
      { name: "Bow Ties", count: 16 },
      { name: "Cufflinks", count: 14 },
      { name: "Pocket Squares", count: 10 },
    ],
  },
]

export function CategorySidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search categories..." className="pl-8" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <CategoryItem key={category.name} category={category} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          Total Products: {categories.reduce((sum, cat) => sum + cat.count, 0)}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

interface CategoryItemProps {
  category: {
    name: string
    count: number
    subcategories?: { name: string; count: number }[]
  }
}

function CategoryItem({ category }: CategoryItemProps) {
  const [open, setOpen] = React.useState(false)
  const hasSubcategories = category.subcategories && category.subcategories.length > 0

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <SidebarMenuItem>
        {hasSubcategories ? (
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="justify-between">
              <div className="flex items-center">
                <span>{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <SidebarMenuBadge>{category.count}</SidebarMenuBadge>
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        ) : (
          <SidebarMenuButton className="justify-between">
            <span>{category.name}</span>
            <SidebarMenuBadge>{category.count}</SidebarMenuBadge>
          </SidebarMenuButton>
        )}

        {hasSubcategories && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {category.subcategories?.map((subcategory) => (
                <SidebarMenuSubItem key={subcategory.name}>
                  <SidebarMenuSubButton className="justify-between">
                    <span>{subcategory.name}</span>
                    <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-xs">{subcategory.count}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  )
}

