import React from 'react'
import classNames from 'classnames'
function MediaAction({className,end, ...props}: Partial<any>) {
    const compClass = classNames({
        'media-action': true,
        'media-action-end': end,
        [className]: className
    });
  return (
    <>
      <div className={compClass}> {props.children} </div>
    </>
  )
}

export default MediaAction