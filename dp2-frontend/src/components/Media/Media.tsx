import classNames from 'classnames'
import { Link } from 'react-router-dom';

type Props = {
  className?: string
  size?: string
  shape
  border 
  sharp,
  to
  variant
}

function Media({className, size, shape, border, sharp, to, variant, ...props}: Partial<any>) {
    const compClass = classNames({
        'media media-middle': true,
        [`media-${size}`]: size,
        [`media-${shape}`]: shape,
        [`media-border`]: border,
        [`media-sharp`]: sharp,
        [`text-bg-${variant}`]: variant,
        [className]: className
    });
  return (
    <>
      { to ? 
        <Link className={compClass} to={to}>{props.children}</Link> : 
        <div className={compClass}> {props.children} </div>
      }
    </>
  )
}

export default Media