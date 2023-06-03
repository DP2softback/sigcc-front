import React from 'react'

const Menu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }: Partial<any>, ref: any) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {children}
        </div>
      );
    },
);

export default Menu