import React from 'react'
import classNames from 'classnames'
function Media({className, ...props}: Partial<any>) {
    const compClass = classNames({
        'media-text': true,
        [className]: className
    });
  return (
    <>
      <div className={compClass}> {props.children} </div>
    </>
  )
}

export default Media