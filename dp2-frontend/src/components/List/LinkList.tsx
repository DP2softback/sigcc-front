import React from 'react'
import classNames from 'classnames'
function LinkList({className,size,shape, variant, hoverVariant,  ...props}: Partial<any>) {
    const compClass = classNames({
        'link-list': true,
        [`link-list-${size}`]: size,
        [`link-list-bg-${variant}`]: variant,
        [`link-list-hover-bg-${hoverVariant}`]: hoverVariant,
        [className]: className
    });
  return (
    <>
      <ul className={compClass}> {props.children} </ul>
    </>
  )
}

export default LinkList