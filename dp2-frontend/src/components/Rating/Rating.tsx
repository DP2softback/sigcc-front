import classNames from 'classnames';
import React from 'react';

type RatingProps = {
  className?: string;
  rating: number;
}

const Rating: React.FC<RatingProps> = ({className, rating, ...props}: RatingProps) => {
  const elemClass = classNames(
    'rating',
    className
  );
  
  let ratingValue = Math.floor(rating);
  let baseRatingValue = 5;

  return (
    <ul className={elemClass}>
      <RatingItem icon="star-fill" className="checked" count={ratingValue} />
      {(baseRatingValue - ratingValue > 0) && <RatingItem icon="star" count={baseRatingValue - ratingValue} />}
    </ul>
  );
};

type Props = {
  className?: string;
  icon?: any;
  count?: any;
}

const RatingItem: React.FC<Props> = ({className,...props}: Props) => {
    const elemClass = classNames(
        'rating-label',
        className
    );

  let items: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>[] = [];
  for (let i = 0; i < props.count; i++) {
    let key = (Math.random() + 1).toString(36).substring(7);
    items.push(<li key={key} className={elemClass}><em className={`icon ni ni-${props.icon}`}></em></li>);
  }
  return <>{items}</>;
}


export default Rating;