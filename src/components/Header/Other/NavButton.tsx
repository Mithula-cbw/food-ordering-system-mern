import React from "react"
import {Link} from "react-router-dom"

interface NavButtonProps {
  name: string
  icon: React.ReactNode
  link: string
}

const NavButton: React.FC<NavButtonProps> = ({ name, icon, link }) => {
  return (
    <Link to={link}>
      <a className="inline-flex justify-start items-center gap-2 pl-4 pr-6 py-2 text-lg font-bold text-gray-600 rounded-full hover:bg-blue-100/20 hover:text-accent-foreground transition">
        {icon}
        {name}
      </a>
    </Link>
  )
}

export default NavButton
