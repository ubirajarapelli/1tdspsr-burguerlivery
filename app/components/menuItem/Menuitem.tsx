import Link from "next/link"

interface MenuItemProps {
  link: string
  children: React.ReactNode
}

export const MenuItem = ({ link, children }: MenuItemProps) => {
  return (
    <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
      <Link href={link}>{children}</Link>
    </li>
  )
}
