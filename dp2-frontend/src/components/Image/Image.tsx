import classNames from 'classnames';

type Props = {
  src?: string
  alt?: string
  staticImage?: any
  fluid?: any
  thumbnail?: any
  className?: string
}

function Image({src, alt, staticImage, className, fluid, thumbnail}: Props) {
  const compClass = classNames({
    [className]: className,
    [`img-fluid`]: fluid,
    [`img-thumbnail`]: thumbnail
  });

  return (
    <>
      {!staticImage && <img src={src} alt={alt || ''} className={compClass} />}
      {staticImage && <img src={src} alt={alt || ''} className={compClass} />}
    </>
  )
}

export default Image