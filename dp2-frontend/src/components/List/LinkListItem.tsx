import React from 'react'
import { Link } from 'react-router-dom'
function LinkListItem({className,linkClassName, to, href, ...props}: Partial<any>) {
  return (
    <li className={className}>
      {to && <Link className={linkClassName} to={to}>{props.children}</Link>}
      {href && <a className={linkClassName} href={href}>{props.children}</a>}
    </li>
  )
}

export default LinkListItem