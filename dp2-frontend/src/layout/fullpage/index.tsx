import React, {useLayoutEffect} from 'react'
import classNames from 'classnames'

function FullPage({title,mask,centered,className,...props}) {
  const compClass = classNames({
      'nk-wrap': true,
      'align-items-center justify-content-center': centered,
      'has-mask': mask,
      [className]: className
  });
  const maskClass = classNames({
    'mask' : true,
    [`mask-${mask}`] : mask
  })
    useLayoutEffect(() => {
        document.title = `${title} - NioBoard Dashboard Template`;
    });
  return (
    <div className={compClass}>
        {mask && <div className={maskClass}></div>}
        {props.children}
    </div>
  )
}

export default FullPage