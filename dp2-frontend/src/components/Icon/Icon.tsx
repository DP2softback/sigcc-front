import React from 'react'
import classNames from "classnames";

type Props = {
  name?: string
  size?: string
  className?: string
  variant?: string
}

function Icon({name, size, className, variant, ...props}: Props) {
  const compClass = classNames({
    [`${className}`]: className,
    [`icon ni ni-${name}`]: true,
    [`icon-${size}`]: size,
    [`text-${variant}`]: variant,
  });
  
  return (
    <em className={compClass}></em>
  )
}

export default Icon