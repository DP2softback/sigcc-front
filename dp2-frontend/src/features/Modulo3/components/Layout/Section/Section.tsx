import './Section.css'

type SectionProps = {
  title?: string,
  content: any,
  filters?: any,
  sectionStyle?: any,
  titleStyle?: any,
  contentStyle?: any,
  filtersStyle?: any,
}

const Section = ({ title, content, filters, sectionStyle, titleStyle, contentStyle, filtersStyle }: SectionProps) => {
  const titleComponent = (
    <div className='row' style={titleStyle}>
      {title && <div className="col-auto title">{title}</div>}
      {filters && <div className='col text-end' style={filtersStyle}>{filters}</div>}
    </div>
  );

  const contentComponet = (
    <div className='row' style={contentStyle}>
      <div className="col">
        {content}
      </div>
    </div>
  );

  return (
    <div className='section row' style={sectionStyle}>
      {title && titleComponent}
      {contentComponet}
    </div>
  );
};

export default Section;