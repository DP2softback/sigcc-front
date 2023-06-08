import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom';
function MediaGroup({className,column,overlap,to,href, ...props}: Partial<any>) {
    const compClass = classNames({
        'media-group': true,
        [`media-group-column`]: column,
        [`media-group-overlap`]: overlap,
        [className]: className
    });
  return (
    <>
      {(!to && !href) && <div className={compClass}> {props.children} </div>}
      {to && <Link className={compClass} to={to}>{props.children}</Link>}
      {href && <a className={compClass} href={href}>{props.children}</a>}
    </>
  )
}

export default MediaGroup