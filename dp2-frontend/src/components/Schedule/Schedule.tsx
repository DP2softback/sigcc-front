import classNames from "classnames";

function Schedule ({className, ...props}: Partial<any>) {
    const compClass = classNames({
        'nk-schedule': true,
        [className]: className
    });

  return (
    <ul className={compClass}>
        {props.children}
    </ul>
  )
}

function ScheduleItem ({symbol, flush, grow, contentClass, type, ...props}: Partial<any>) {
    const symbolClass = classNames({
        'nk-schedule-symbol': true,
        [symbol]: symbol
    });

    const contentClasss = classNames({
        'nk-schedule-content': true,
        [contentClass]: contentClass
    });

  return (
    <li className="nk-schedule-item">
        <div className="nk-schedule-item-inner">
            <div className={symbolClass}></div>
            <div className={contentClasss}>
                {props.children}
            </div>
        </div>
    </li>
  )
}

Schedule.Item = ScheduleItem;

export default Schedule;